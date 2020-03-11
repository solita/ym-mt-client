import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import styles from './Home.module.css';
import cx from 'classnames';
import Loader from '../Loader/Loader';
import { Row, Container, Col } from '../Layout/Layout';
import { getRaw } from '../../services/ApiService';
import * as API_ENDPOINTS from '../../services/endpoints';
import { compose } from 'ramda';
import withCancelToken from '../CancelToken/withCancelToken';

class BasicStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: undefined
    };
  }

  componentDidMount() {
    this.fetchStats();
  }

  fetchStats = () => {
    const config = {
      cancelToken: this.props.cancelTokenSource.token
    };
    getRaw(API_ENDPOINTS.FETCH_BASIC_STATS, config)
      .then(result => this.setState({ stats: result.data }))
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          console.log(thrown);
        }
      });
  };

  render() {
    const { t } = this.props;
    return (
      <Container className={cx('flex-grow-1', 'textCenter')}>
        <Row>
          <Col span={12}>
            <h1>{t('Materiaalitorissa nyt')}</h1>
          </Col>
        </Row>
        <Row>
          <Col span={4} xs={12}>
            <div className={styles.highlightContainer}>
              <div className={styles.highlight__value}>
                <Loader loading={this.state.stats === undefined}>
                  {this.state.stats && this.state.stats.userCount}
                </Loader>
              </div>
              <div className={styles.highlight__key}>{t('Rekisteröitynyttä käyttäjää')}</div>
            </div>
          </Col>
          <Col span={4} xs={12}>
            <div className={styles.highlightContainer}>
              <div className={styles.highlight__value}>
                <Loader loading={this.state.stats === undefined}>
                  {this.state.stats && this.state.stats.rfoCount}
                </Loader>
              </div>
              <div className={styles.highlight__key}>{t('Ilmoitusta')}</div>
            </div>
          </Col>
          <Col span={4} xs={12}>
            <div className={styles.highlightContainer}>
              <div className={styles.highlight__value}>
                <Loader loading={this.state.stats === undefined}>
                  {this.state.stats && this.state.stats.companyCount}
                </Loader>
              </div>
              <div className={styles.highlight__key}>{t('Yritystä / organisaatiota')}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default compose(
  withCancelToken,
  withNamespaces()
)(BasicStatistics);
