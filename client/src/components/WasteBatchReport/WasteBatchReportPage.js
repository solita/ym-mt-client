import React, { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Container, Row, Col } from '../Layout/Layout';
import { withNamespaces } from 'react-i18next';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import styles from './WasteBatchReport.module.css';
import commonStyles from '../../styles/common.module.css';
import formStyles from '../Layout/Form.module.css';
import { getYearRange } from '../../utils/date-utils';
import { uuid } from '../../utils/common-utils';
import { assoc, find, findIndex, propEq, prop, compose, assocPath, remove } from 'ramda';
import MaterialOptionList from '../Material/MaterialOptionList';
import { flattenServices } from '../../utils/service-utils';
import { connect } from 'react-redux';
import { getRaw, postJson, doDelete } from '../../services/ApiService';
import qs from 'qs';
import { WASTE_BATCH } from '../../services/endpoints';
import { userSelectors } from '../../state/ducks/user';
import { Link } from 'react-router-dom';
import InfoBox from '../InfoBox/InfoBox';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { OMA_SIVU } from '../../routes';
import withCancelToken from '../CancelToken/withCancelToken';
import { regExpForNumberWithUnlimitedDecimals } from '../../utils/text-utils';
import { parseNumber } from '../../utils/common-utils';

const batchModel = {
  classification: '',
  service: '',
  amountInTonne: 0.0,
  userAdded: true
};

const initialState = {
  initialLoadingDone: false,
  loading: false,
  year: 2019,
  customerCount: 0,
  totalValue: 0,
  batches: [],
  continuationToken: '',
  error: false,
  success: false
};

const isBatchValid = b => b.classification && b.service && parseNumber(b.amountInTonne) > 0;

class WasteBatchReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    if (name === 'year' && value !== this.state.year) {
      this.setState({
        initialState,
        [name]: value
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  areBatchesValid = () => {
    return (
      this.state.batches.every(isBatchValid) &&
      this.state.customerCount > 0 &&
      parseNumber(this.state.totalValue) > 0
    );
  };

  getBatchIndex = (id, batches) => {
    return findIndex(propEq('id', id))(batches);
  };

  getValue = (id, name) => {
    return compose(prop(name), find(propEq('id', id)))(this.state.batches);
  };

  batchRowView = batch => (
    <tr key={batch.id}>
      <td>
        <select
          name="classification"
          onChange={this.handleRowValueChange(batch.id)}
          disabled={!batch.userAdded}
          value={this.getValue(batch.id, 'classification')}
        >
          <option value="" disabled hidden>
            {this.props.t('Valitse jäte')}
          </option>
          <MaterialOptionList includeWaste={true} />
        </select>
      </td>
      <td>
        <select
          onChange={this.handleRowValueChange(batch.id)}
          name="service"
          disabled={!batch.userAdded}
          value={this.getValue(batch.id, 'service')}
        >
          <option value="" disabled hidden>
            {this.props.t('Valitse palvelu')}
          </option>

          {flattenServices(this.props.services.filter(s => s.id !== "kiinteiston_kokonaispalvelu")).map((serviceGroup, i) => {
            return (
              <optgroup key={`serviceGroup-${i}`} label="---">
                {serviceGroup.map((service, idx) => {
                  return (
                    <option key={service.id} value={service.id}>
                      {this.props.t(service.id)}
                    </option>
                  );
                })}
              </optgroup>
            );
          })}
        </select>
      </td>
      <td>
        <input
          type="text"
          pattern={regExpForNumberWithUnlimitedDecimals}
          name="amountInTonne"
          value={this.getValue(batch.id, 'amountInTonne')}
          onChange={this.handleRowValueChange(batch.id)}
        />
      </td>
      <td>
        <button type="button" onClick={this.removeBatch(batch.id, batch.userAdded)}>
          {this.props.t('Poista rivi')}
        </button>
      </td>
    </tr>
  );

  handleCustomerCountChange = event => {
    const value = Number(event.target.value);
    this.setState({ customerCount: value });
  };

  handleTotalValueChange = event => {
    const value = event.target.value;
    this.setState({ totalValue: value });
  };

  handleRowValueChange = id => event => {
    const { target } = event;
    const { name, value } = target;
    const batchIndex = this.getBatchIndex(id, this.state.batches);
    const updatedResults = assocPath(['batches', batchIndex, name], value)(this.state);
    this.setState({
      batches: updatedResults.batches
    });
  };

  removeBatchFromView = id => {
    const batchIndex = this.getBatchIndex(id, this.state.batches);
    this.setState({
      batches: remove(batchIndex, 1, this.state.batches)
    });
  };

  removeBatch = (id, isUserAdded) => event => {
    if (window.confirm(this.props.t('Haluatko varmasti poistaa rivin?'))) {
      if (!isUserAdded) {
        this.setState({
          loading: true
        });
        doDelete(`${WASTE_BATCH}/${this.state.year}/${id}`)
          .then(result => {
            if (result.status === 200) {
              this.removeBatchFromView(id);
            }
          })
          .finally(() =>
            this.setState({
              loading: false
            })
          );
      } else {
        this.removeBatchFromView(id);
      }
    }
  };

  addBatch = event => {
    event.preventDefault();
    const newBatchWithId = assoc('id', uuid(), batchModel);
    this.setState({
      batches: this.state.batches.concat([newBatchWithId])
    });
  };

  fetchWasteBatches = ({ continuationToken = '', pagesize = 25, year = 2019, error = false }) => {
    this.setState({ loading: true, initialLoadingDone: true, success: false, error: error });
    let queryParams = {
      pagesize,
      continuationToken,
      year: this.state.year,
      facilityId: userSelectors.getOwnBusinessId(this.props.user)
    };

    const config = {
      params: queryParams,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      cancelToken: this.props.cancelTokenSource.token
    };

    getRaw(WASTE_BATCH, config)
      .then(response => {
        const { headers, data } = response;

        const results = !continuationToken ? data : this.state.results.concat(data);

        this.setState({
          continuationToken: headers['tietoalusta-continuation-token'],
          batches: results,
          loading: false,
          customerCount: results.length ? results[0].customerCount : 0,
          totalValue: results.length ? results[0].totalValue : 0
        });
      })
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loading: false });
        }
      });
  };

  saveWasteBatches = () => {
    this.setState({ loading: true });

    this.state.batches.forEach(batch => {
      batch.amountInTonne = parseNumber(batch.amountInTonne);
    });

    const payload = {
      facilityId: userSelectors.getOwnBusinessId(this.props.user),
      year: this.state.year,
      customerCount: this.state.customerCount,
      totalValue: parseNumber(this.state.totalValue),
      batches: this.state.batches
    };

    postJson(WASTE_BATCH, payload)
      .then(response => {
        if (response.status === 200) {
          const year = this.state.year;
          this.setState({
            ...initialState,
            year: year,
            success: true
          });
          this.fetchWasteBatches({ year: year });
          addToastNotification(this.props.t('Tallennus onnistui.'), ToastTypes.SUCCESS);
        }
      })
      .catch(err => {
        const year = this.state.year;
        this.setState({
          ...initialState,
          error: true
        });
        this.fetchWasteBatches({ year: year, error: true });
        addToastNotification(
          this.props.t(
            'Tallennuksessa tapahtui virhe. Tarkista joka riviltä, että tiedot on täytetty oikein.'
          ),
          ToastTypes.WARNING
        );
      });
  };

  render() {
    const { t } = this.props;
    const { loading, year, batches, error, success } = this.state;
    const yearRange = getYearRange(2019, new Date());

    return (
      <>
        <Header />
        <Navigation />
        <Container className={'flex-grow-1'}>
          <Row>
            <Col span={12}>
              <h1 className={'textCenter'}>
                {t('Tiedot muusta kunnan toissijaisesta jätehuoltopalvelusta')}
                <InfoBox
                  className={'textLeft'}
                  infoText={t(
                    'Kunnan on toimitettava vuosittain maaliskuun loppuun mennessä Materiaalitoriin olennaiset tiedot muun kuin jätelain 33 §:n 2 momentissa tarkoitetun kunnan toissijaisen jätehuoltopalvelun kokonaisarvosta ja palvelua käyttävien jätteen haltijoiden kokonaismäärästä sekä olennaiset tiedot annetusta palvelusta jätelajeittain ja käsittelymenetelmittäin eriteltyinä. \n\n Tällä tarkoitetaan tietoja Materiaalitorin käyttövelvoitteen ulkopuolelle jäävästä kunnan toissijaisesta jätehuoltopalvelusta eli 2000 euron kynnysarvon alle jäävästä kunnan toissijaisesta jätehuoltopalvelusta sekä ennakoimattomasta kiireestä johtuvasta ja siirtymäaikoina Materiaalitorin käyttövelvoitteen ulkopuolelle rajatusta kunnan toissijaisesta jätehuoltopalvelusta.'
                  )}
                />
              </h1>
              <p className={'textCenter'}>
                {t(
                  'Ilmoita ja katsele tietoja Materiaalitorin käyttövelvoitteen ulkopuolelle jäävästä kunnan toissijaisesta jätehuoltopalvelusta.'
                )}
              </p>
              <div className={'divider'} />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Link className={'backButton ' + styles.backButtonMargin} to={OMA_SIVU}>
                {' '}
                {t('Omat sivut -etusivu')}{' '}
              </Link>
            </Col>
          </Row>

          {error && (
            <Row>
              <Col span={12}>
                <div className={commonStyles.errorContainer}>
                  <p>
                    {t('Virhe')}:{' '}
                    {t(
                      'Tallennuksessa tapahtui virhe, tarkista joka riviltä että tiedot on täytetty oikein.'
                    )}
                  </p>
                  <ul>
                    <li>
                      <strong>{t('Asiakkaiden määrä')}</strong>{' '}
                      {t('tulee olla nollaa suurempi kokonaisluku')}
                    </li>
                    <li>
                      <strong>{t('Kokonaisarvo')}</strong> {t('tulee olla nollaa suurempi luku')}
                    </li>
                    <li>
                      <strong>{t('Jäte')}</strong> {t('tulee olla valittu')}
                    </li>
                    <li>
                      <strong>{t('Palvelu')}</strong> {t('tulee olla valittu')}
                    </li>
                    <li>
                      <strong>{t('Määrä tonneissa')}</strong> {t('tulee olla nollaa suurempi luku')}
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          )}
          {success && (
            <Row>
              <Col span={12}>
                <div className={commonStyles.successContainer}>
                  <p>{t('Tallennus onnistui.')}</p>
                </div>
              </Col>
            </Row>
          )}
          <Row>
            <Col span={12}>
              <Loader loading={loading}>
                <form className={styles.searchContainer}>
                  <Row options={{ spaceBetween: true }}>
                    <Col span={6} sm={6} xs={12}>
                      <label>
                        <span className={formStyles.defaultLabelSpan}>
                          {t('Valitse vuosi, jota koskevia tietoja haluat ilmoittaa tai katsella')}
                        </span>
                        <select name="year" onChange={this.handleChange} value={year}>
                          {yearRange.map(year => {
                            return (
                              <option key={year.toString()} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </Col>
                    <Col span={2} sm={4} xs={12} className={commonStyles.alignEnd}>
                      <button
                        type="button"
                        onClick={() => this.fetchWasteBatches({ continuationToken: '' })}
                      >
                        {t('Lataa tiedot')}
                      </button>
                    </Col>
                  </Row>
                </form>
              </Loader>
            </Col>
          </Row>
          {this.state.initialLoadingDone && (
            <>
              <Row className={commonStyles.thickBorderBottom}>
                <Col span={12}>
                  <h2>
                    {t('Tiedot muusta kunnan toissijaisesta jätehuoltopalvelusta')}
                    <InfoBox
                      infoText={t(
                        'Lisää tiedot muusta kunnan toissijaisesta jätehuoltopalvelusta jätelajeittain ja käsittelymenetelmittäin eriteltynä sekä tiedot kyseisen palvelun kokonaisarvosta ja asiakasmäärästä vuosittain. Tallenna tiedot lopuksi, jolloin ne tallentuvat samaan näkymään kyseisille paikoilleen. Rivien poistaminen poistaa tallennetut tiedot kokonaan.'
                      )}
                    />
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Loader loading={loading} hideWhileLoading={true}>
                    <div className={styles.customerCountWrap}>
                      <label className={styles.customerCountLabel}>
                        {t('Asiakkaiden kokonaismäärä:')}{' '}
                      </label>
                      <input
                        className={styles.customerCountInput}
                        type="number"
                        onChange={this.handleCustomerCountChange}
                        value={this.state.customerCount}
                      />
                    </div>
                    <div className={styles.customerCountWrap}>
                      <label className={styles.customerCountLabel}>{t('Kokonaisarvo:')} </label>
                      <input
                        className={styles.customerCountInput}
                        type="text"
                        pattern={regExpForNumberWithUnlimitedDecimals}
                        onChange={this.handleTotalValueChange}
                        value={this.state.totalValue}
                      />
                    </div>
                    <table className={styles.resultTable}>
                      <thead>
                        <tr>
                          <th>{t('Jäte')}</th>
                          <th>{t('Annettu palvelu')}</th>
                          <th>{t('Määrä tonneissa')}</th>
                          <th>{t('')}</th>
                        </tr>
                      </thead>
                      <tbody>{batches.map(batch => this.batchRowView(batch))}</tbody>
                    </table>
                  </Loader>
                </Col>
              </Row>
              <Row>
                <Col span={12} className={commonStyles.mediumVerticalMargin}>
                  <button
                    type="button"
                    onClick={this.addBatch}
                    className={commonStyles.mediumRightMargin}
                  >
                    {t('Lisää rivi')}
                  </button>

                  <button
                    type="button"
                    onClick={this.saveWasteBatches}
                    disabled={!this.areBatchesValid()}
                  >
                    {t('Tallenna tiedot')}
                  </button>
                </Col>
              </Row>
            </>
          )}
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  services: state.generalState.configurations.services
});

export default compose(
  withCancelToken,
  connect(mapStateToProps),
  withNamespaces()
)(WasteBatchReportPage);
