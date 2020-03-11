import cx from 'classnames';
import { compose, path } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { OMA_SIVU, TSV_PYYNNOT } from '../../routes';
import { userSelectors } from '../../state/ducks/user';
import myPageStyles from '../MyPage/MyPage.module.css';
import commonStyles from '../../styles/common.module.css';
import { formatDate, formatTime } from '../../utils/date-utils';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import { tsvStateTranslated } from './tsv-utils';

const resultRow = (t, result) => {
  const rfoTitle = path(['rfo', 'title'], result);
  const tsvId = result.id;
  const rfoCompany = path(['rfo', 'company', 'name'], result);
  const rfoCompanyCity = path(['rfo', 'company', 'address', 'city'], result);
  const rfoCompanyBusinessId = path(['rfo', 'company', 'businessId'], result);
  const requestedDateObj = new Date(path(['request', 'requested'], result));
  const rowId = path(['tsvFacility', 'businessId'], result) + tsvId;
  return (
    <tr key={rowId}>
      <td>
        <Link to={`${TSV_PYYNNOT}/${tsvId}`}>{rfoTitle}</Link>
      </td>
      <td>{`${rfoCompany} | ${rfoCompanyCity}`}</td>
      <td>{rfoCompanyBusinessId}</td>
      <td>{tsvStateTranslated(t, result)}</td>
      <td>{`${formatDate(requestedDateObj)} ${formatTime(requestedDateObj)}`}</td>
    </tr>
  );
};

class TsvRequestsPage extends Component {
  renderNoResults = (t, loading, results, user) => {
    const searchIsShown =
      userSelectors.isMunicipalWasteManagement(user) || userSelectors.isPublicOfficer(user);
    const noResultsText = searchIsShown ? t('Ei hakutuloksia.') : t('Ei pyyntöjä.');

    return !loading && results.length === 0 ? (
      <Row className={myPageStyles.container}>
        <Col span={12}>
          <div>{noResultsText}</div>
        </Col>
      </Row>
    ) : null;
  };

  render() {
    const {
      t,
      loading,
      results,
      continuationToken,
      renderSearch,
      getMoreResults,
      user
    } = this.props;

    return (
      <>
        <Header />
        <Navigation />
        <Container className={'flex-grow-1'}>
          <Row>
            <Col span={12}>
              <h1 className={'textCenter'}>
                {t('Pyynnöt kunnan toissijaisesta jätehuoltopalvelusta')}
              </h1>
              <div className={'divider'} />
              <Link className={'backButton'} to={OMA_SIVU}>
                {t('Omat sivut -etusivu')}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <h2>{t('TSV-pyynnöt')}</h2>
            </Col>
          </Row>

          {(userSelectors.isMunicipalWasteManagement(user) ||
            userSelectors.isPublicOfficer(user)) &&
            renderSearch(t)}
          <Row>
            <Col span={12}>
              <Loader loading={loading}>
                <div>
                  <table className={cx(commonStyles.listTable, commonStyles.listTableCellPadding)}>
                    <thead>
                      <tr>
                        <th>{t('Ilmoitus')}</th>
                        <th>{t('Ilmoittaja')}</th>
                        <th>{t('Y-tunnus')}</th>
                        <th>{t('Tila')}</th>
                        <th>{t('Saapunut')}</th>
                      </tr>
                    </thead>
                    <tbody>{results.map(result => resultRow(t, result))}</tbody>
                  </table>
                </div>
                {continuationToken && (
                  <div className={cx('textCenter', commonStyles.mediumVerticalMargin)}>
                    <button
                      className={'buttonStyle'}
                      onClick={() => getMoreResults({ continuationToken })}
                      disabled={loading}
                    >
                      {t('Lisää pyyntöjä')}
                    </button>
                  </div>
                )}
              </Loader>
            </Col>
          </Row>
          {this.renderNoResults(t, loading, results, user)}
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
)(TsvRequestsPage);
