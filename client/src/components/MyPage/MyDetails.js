import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { userSelectors } from '../../state/ducks/user';
import { withNamespaces } from 'react-i18next';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Container, Row, Col } from '../Layout/Layout';
import styles from './MyPage.module.css';
import cx from 'classnames';
import CompanyView from './../Company/View';
import FullCompanyView from './../Company/FullView';
import { companyOperations } from '../../state/ducks/company';
import { Link } from 'react-router-dom';
import { OMA_SIVU } from '../../routes';

class MyDetails extends Component {
  fetchCompany(user) {
    const businessId = userSelectors.getOwnBusinessId(user);
    if (businessId) {
      const companyParams = {
        BusinessIds: [businessId]
      };
      this.props.fetchCompaniesWithParams(companyParams);
    }
  }

  componentDidMount() {
    this.fetchCompany(this.props.user);
  }

  render() {
    const { t, company, user, loadingCompany } = this.props;
    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row className={styles.container}>
            <Col span={12}>
              <h1 className={'textCenter'}>{t('Omat / organisaation tiedot')}</h1>
              <div className={'divider'} />
              <Link className={'backButton'} to={OMA_SIVU}>
                {t('Omat sivut -etusivu')}
              </Link>
            </Col>
          </Row>
          <Row className={styles.container}>
            <Col span={12}>
              <CompanyView
                loading={loadingCompany}
                user={user}
                company={company}
                render={(user, company) => <FullCompanyView user={user} company={company} t={t} />}
              />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  company: state.companyState.view.list.length ? state.companyState.view.list[0] : null,
  loadingCompany: state.companyState.status.loadingCompanies
});

const mapDispatchToProps = dispatch => ({
  fetchCompaniesWithParams: params => dispatch(companyOperations.fetchCompanies(params))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(MyDetails);
