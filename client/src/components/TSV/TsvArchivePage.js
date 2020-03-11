import cx from 'classnames';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Col, Container, Row } from '../Layout/Layout';
import myPageStyles from '../MyPage/MyPage.module.css';
import commonStyles from '../../styles/common.module.css';
import Navigation from '../Navigation/Navigation';
import TsvArchiveList from './TsvArchiveList';
import Loader from '../Loader/Loader';
import { OMA_SIVU } from '../../routes';

class TsvArchivePage extends Component {
  render() {
    const { t, loading, results, continuationToken, renderSearch, getMoreResults } = this.props;

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row className={myPageStyles.container}>
            <Col span={12}>
              <h1 className={'textCenter'}>
                {t('Sopimukset kunnan toissijaisesta jätehuoltopalvelusta')}
              </h1>
              <div className={'divider'} />
              <Link className={'backButton'} to={`${OMA_SIVU}`}>
                {t('Omat sivut -etusivu')}
              </Link>
            </Col>
          </Row>
          {renderSearch(t)}
          <Row className={myPageStyles.container}>
            <Col span={12}>
              <TsvArchiveList contractList={results} t={t} />
              <Loader loading={loading} />
              {continuationToken && (
                <div className={cx('textCenter', commonStyles.mediumVerticalMargin)}>
                  <button
                    className={'buttonStyle'}
                    onClick={() => getMoreResults({ continuationToken })}
                    disabled={loading}
                  >
                    {t('Lisää sopimuksia')}
                  </button>
                </div>
              )}
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

export default withNamespaces()(TsvArchivePage);
