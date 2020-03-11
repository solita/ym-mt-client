import cx from 'classnames';
import { compose } from 'ramda';
import { Component, default as React } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSelectors } from '../../state/ducks/user';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Navigation from '../Navigation/Navigation';
import FetchRfos from '../RequestForOffer/FetchRfos';
import styles from './MyPage.module.css';
import RfoListTableView from './RfoListTableView';
import { OMA_SIVU } from '../../routes';

const getParametersForActiveSearch = user => {
  const businessId = userSelectors.getOwnBusinessId(user);

  return {
    CreatedByBusinessId: businessId,
    PageSize: 10000
  };
};

const getParametersForClosedSearch = user => {
  const businessId = userSelectors.getOwnBusinessId(user);

  return {
    CreatedByBusinessId: businessId,
    OnlyExpiredAndClosed: true,
    PageSize: 25
  };
};

const selections = (t, state, handleChangeEvent) => {
  return (
    <div>
      <div>
        <strong>{t('Näytä') + ':'}</strong>
      </div>
      <span className={styles.horizontalMargin1em}>
        <input
          className="checkboxInput"
          name="showActive"
          id="showActive"
          type="checkbox"
          checked={state.showActive || ''}
          onChange={handleChangeEvent}
        />

        <label className="checkboxLabel" htmlFor="showActive">
          {t('aktiiviset')}
        </label>
      </span>
      <span className={styles.horizontalMargin1em}>
        <input
          className="checkboxInput"
          name="showClosed"
          id="showClosed"
          type="checkbox"
          checked={state.showClosed || ''}
          onChange={handleChangeEvent}
        />
        <label className="checkboxLabel" htmlFor="showClosed">
          {t('sulkeutuneet')}
        </label>
      </span>
    </div>
  );
};

class MyRfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActive: true,
      showClosed: true
    };
  }

  // Handles input field changes:
  handleChangeEvent = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    const { t, user } = this.props;
    const { showActive, showClosed } = this.state;

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row className={styles.container}>
            <Col span={12}>
              <h1 className={'textCenter'}>{t('Ilmoitukset')}</h1>
              <p className={'textCenter'}>{t('Organisaationne kaikki ilmoitukset')}</p>
              <div className={'divider'} />
              <Link className={'backButton'} to={OMA_SIVU}>
                {t('Omat sivut -etusivu')}
              </Link>
            </Col>
          </Row>
          <Row className={styles.container}>
            <Col span={12}>{selections(t, this.state, this.handleChangeEvent)}</Col>
          </Row>
          {user.loggedIn && showActive && (
            <Row className={styles.container}>
              <Col span={12}>
                <>
                  <h2>{t('Aktiiviset')}</h2>
                  <FetchRfos
                    rfosParams={getParametersForActiveSearch(user)}
                    renderRfos={rfos => <RfoListTableView rfos={rfos} />}
                  />
                </>
              </Col>
            </Row>
          )}
          {user.loggedIn && showClosed && (
            <Row className={styles.container}>
              <Col span={12}>
                <>
                  <h2>{t('Sulkeutuneet')}</h2>
                  <FetchRfos
                    rfosParams={getParametersForClosedSearch(user)}
                    renderRfos={rfos => <RfoListTableView rfos={rfos} />}
                    useContinuationButton={true}
                  />
                </>
              </Col>
            </Row>
          )}
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withNamespaces()
)(MyRfos);
