import React, { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Container, Row, Col } from '../Layout/Layout';
import styles from './../MyPage/MyPage.module.css';
import cx from 'classnames';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { companyOperations } from '../../state/ducks/company';
import CompanyView from './../Company/View';
import FullCompanyView from './../Company/FullView';

class AdminCompany extends Component {
  fetchCompany(businessId) {
    if (businessId) {
      const companyParams = {
        BusinessIds: [businessId]
      };
      this.props.fetchCompaniesWithParams(companyParams);
    }
  }

  componentDidMount() {
    this.fetchCompany(this.props.match.params.id);
  }

  render() {
    const { user, company, loadingCompany } = this.props;
    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row className={styles.container}>
            <Col span={12}>
              <CompanyView
                loading={loadingCompany}
                user={user}
                company={company}
                render={(user, company) => (
                  <FullCompanyView user={user} company={company} adminMode={true} />
                )}
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
)(AdminCompany);
