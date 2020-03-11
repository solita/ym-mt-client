import cx from 'classnames';
import { clone, compose } from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postJson } from '../../services/ApiService';
import { SAVE_SEARCH } from '../../services/endpoints';
import { addToastNotification, ToastTypes } from '../../services/ToastService';
import { searchOperations } from '../../state/ducks/search';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import styles from './AddSavedSearch.module.css';

class AddSavedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      interval: '',
      search: props.search
    };
  }

  handleChange = event => {
    const target = event.target;
    let draft = {};
    draft[target.name] = target.value;
    this.setState(draft);
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    const postUrl = SAVE_SEARCH;
    let payload = {
      name: this.state.name,
      interval: this.state.interval,
      search: clone(this.state.search)
    };
    if (Array.isArray(this.state.search.location)) {
      payload.search.location = payload.search.location.map(loc => {
        return loc.id || loc.regionId;
      });
    }
    postJson(postUrl, payload)
      .then(res => {
        this.props.addSavedSearch(res.data);
        this.props.done(res.data);

        addToastNotification(this.props.t('Hakuvahti tallennettu.'), ToastTypes.SUCCESS);
      })
      .catch(err => {
        addToastNotification(this.props.t('Hakuvahdin tallennus epäonnistui.'), ToastTypes.WARNING);
      });
  };

  isFilled = () => {
    return (
      this.state.name && this.state.name.length && this.state.interval && this.state.interval.length
    );
  };

  renderSearchTerms = (label, terms, termKey, termValue) =>
    Array.isArray(terms) &&
    terms.length > 0 && (
      <Row className={cx(styles.formRow)}>
        <Col span={12}>
          <h4>{label}</h4>
        </Col>
        <Col span={12}>
          {terms.map(term => (
            <button
              type="button"
              className={'searchTerms__Button'}
              onClick={() => {}}
              key={termKey(term)}
            >
              {termValue(term)}
            </button>
          ))}
        </Col>
      </Row>
    );

  handleScroll = e => {
    this.setState({ top: window.scrollY * -1 });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    //  required ? 'requiredIndicator' : null
    const { t, search } = this.props;
    return (
      <>
        <div className={styles.modalOverlay} />
        <form className={styles.form} style={{ top: this.state.top }}>
          <Container className={cx('flex-grow-1', styles.formContainer)}>
            <Row className={cx(styles.formRow, styles.formRowHeader)}>
              <Col span={12} className={'textCenter'}>
                {t('Tallenna hakuvahti')}
              </Col>
            </Row>
            <Row className={cx(styles.formRow)}>
              <Col span={12}>
                <label>{t('Nimeä haku')}</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name || ''}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className={cx(styles.formRow)}>
              <Col span={12}>
                <h2>{t('Hakukriteerit')}</h2>
              </Col>
            </Row>
            {search.text && (
              <Row className={cx(styles.formRow)}>
                <Col span={12}>
                  <h4>{t('Hakusana')}</h4>
                  <div>{search.text}</div>
                </Col>
              </Row>
            )}
            {this.renderSearchTerms(
              t('Ilmoituksen tyyppi'),
              search.rfoType,
              rfoType => {
                return rfoType;
              },
              rfoType => {
                return t(rfoType + '-title');
              }
            )}
            {this.renderSearchTerms(
              t('Materiaali tyyppi'),
              search.classification,
              classification => {
                return classification;
              },
              classification => {
                return t(classification);
              }
            )}
            {this.renderSearchTerms(
              t('Palvelut'),
              search.service,
              service => {
                return service;
              },
              service => {
                return t(service);
              }
            )}
            {this.renderSearchTerms(
              t('Sijainnit'),
              search.location,
              location => {
                return location.id || location.regionId;
              },
              location => {
                return t(location.nameFi || location.regionNameFi);
              }
            )}
            <Row className={cx(styles.formRow)}>
              <Col span={12}>
                <h4>{t('Haluan viestin uusista hakuosumista sähköpostiini')}</h4>
                <div onChange={this.handleChange.bind(this)}>
                  <input
                    type="radio"
                    name="interval"
                    value="0"
                    id="freq-0"
                    className={'radioButton'}
                  />
                  <label htmlFor="freq-0" className={'radioButtonLabel'}>
                    {t('Ei koskaan (tallennettu haku)')}
                  </label>

                  <input
                    type="radio"
                    name="interval"
                    value="100"
                    id="freq-100"
                    className={'radioButton'}
                  />
                  <label htmlFor="freq-100" className={'radioButtonLabel'}>
                    {t('Heti')}
                  </label>

                  <input
                    type="radio"
                    name="interval"
                    value="200"
                    id="freq-200"
                    className={'radioButton'}
                  />
                  <label htmlFor="freq-200" className={'radioButtonLabel'}>
                    {t('Kerran päivässä')}
                  </label>

                  <input
                    type="radio"
                    name="interval"
                    value="300"
                    id="freq-300"
                    className={'radioButton'}
                  />
                  <label htmlFor="freq-300" className={'radioButtonLabel'}>
                    {t('Kerran viikossa')}
                  </label>
                </div>
              </Col>
            </Row>

            <Row className={cx(styles.formRow)}>
              <Col span={12} className={'textCenter'}>
                <button
                  type="button"
                  onClick={this.props.done}
                  className={cx('cancel', styles.marginRight1rem)}
                >
                  {t('Peruuta')}
                </button>
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  disabled={this.state.loading || !this.isFilled()}
                >
                  {t('Tallenna')}
                </button>
                <Loader loading={this.state.loading} />
              </Col>
            </Row>
          </Container>
        </form>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    isTouchDevice: state.generalState.isTouchDevice
  };
};

const mapDispatchToProps = dispatch => ({
  addSavedSearch: savedSearch => dispatch(searchOperations.addSavedSearch(savedSearch))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddSavedSearch);
