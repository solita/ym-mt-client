import React, { Component } from 'react';
import styles from './Registrations.module.css';
import { getJsonData } from '../../services/ApiService';
import { formatDate } from '../../utils/date-utils';
import { withNamespaces } from 'react-i18next';
import Loader from './../Loader/Loader';
import { compose } from 'ramda';
import withCancelToken from '../CancelToken/withCancelToken';

class Registrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      registrations: []
    };
  }

  getRegistrations = businessId => {
    const url = `/api/company/${businessId}/registrations`;
    this.setState({ loading: true });
    const config = {
      cancelToken: this.props.cancelTokenSource.token
    };
    getJsonData(url, config)
      .then(res => {
        this.setState({ registrations: res, loading: false });
      })
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loading: false });
        }
      });
  };

  componentDidMount() {
    this.getRegistrations(this.props.businessId);
  }

  render() {
    const { t, title } = this.props;
    return (
      this.state.registrations.length > 0 && (
        <div>
          <strong className={styles.header}>{title}</strong>
          <Loader loading={this.state.loading}>
            <table className={styles.permitTable}>
              <thead>
                <tr>
                  <th>{t('Lupa tai rekisterimerkintä')}</th>
                  <th>{t('Myöntäjä')}</th>
                  <th>{t('Tunniste')}</th>
                  <th>{t('Voimaantulopäivä')}</th>
                  <th>{t('Vanhenemispäivä')}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.registrations.map(doc => (
                  <tr key={doc.id}>
                    {Array.isArray(doc.attachments) &&
                      doc.attachments.length > 0 &&
                      doc.attachments.map(attachment => (
                        <td key={attachment.id}>
                          <a
                            href={attachment.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t('company-registration-type-' + doc.type)}
                          </a>
                        </td>
                      ))}
                    {(!Array.isArray(doc.attachments) || doc.attachments.length === 0) && (
                      <td>{t('company-registration-type-' + doc.type)} </td>
                    )}
                    <td>{doc.authority}</td>

                    <td>{doc.identification}</td>

                    <td>{doc.registrationDate && formatDate(new Date(doc.registrationDate))}</td>

                    <td>{doc.validUntil && formatDate(new Date(doc.validUntil))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Loader>
        </div>
      )
    );
  }
}

export default compose(
  withCancelToken,
  withNamespaces()
)(Registrations);
