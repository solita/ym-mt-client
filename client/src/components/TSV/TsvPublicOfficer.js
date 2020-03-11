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
import { formatDate } from '../../utils/date-utils';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import { tsvStateTranslated } from './tsv-utils';

const resultRow = (t, result) => {
  const tsvId = result.id;
  const rfoCompany = path(['rfo', 'company', 'name'], result);
  const facility = path(['tsvFacility', 'name'], result);
  const requestText = result.contract
    ? path(['contract', 'contractName'], result) || t('TSV-sopimus')
    : path(['request', 'requestText'], result) || t('TSV-pyyntö');
  const rowId = path(['tsvFacility', 'businessId'], result) + tsvId;
  const contractEndDateStr = path(['contract', 'contractEndDate'], result);
  const contractEndDate = contractEndDateStr ? formatDate(new Date(contractEndDateStr)) : ' - ';
  return (
    <tr key={rowId}>
      <td>
        <Link to={`${TSV_PYYNNOT}/${tsvId}`}>{requestText}</Link>
      </td>
      <td>{rfoCompany}</td>
      <td>{facility}</td>
      <td>{tsvStateTranslated(t, result)}</td>
      <td>{contractEndDate}</td>
    </tr>
  );
};

class TsvPublicOfficer extends Component {
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
                {t('Tiedot kunnan toissijaisesta jätehuoltopalvelusta')}
              </h1>
              <div className={'divider'} />
              <Link className={'backButton'} to={`${OMA_SIVU}`}>
                {t('Omat sivut -etusivu')}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <h2>{t('Tiedot jätelaitosten sopimuksista ja hylätyistä pyynnöistä')}</h2>
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
                        <th>{t('Sopimukset/TSV-pyynnöt')}</th>
                        <th>{t('Yritys')}</th>
                        <th>{t('Jätelaitos')}</th>
                        <th>{t('Tila')}</th>
                        <th>{t('Päättymisaika')}</th>
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
          {!loading && results.length === 0 && (
            <Row className={myPageStyles.container}>
              <Col span={12}>
                <div>{t('Ei hakutuloksia.')}</div>
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
  connect(mapStateToProps),
  withNamespaces()
)(TsvPublicOfficer);
