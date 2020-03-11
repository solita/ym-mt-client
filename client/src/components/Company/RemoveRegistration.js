import React, { Component } from 'react';
import styles from './CompanyRemoveRegistration.module.css';
import { doDelete } from '../../services/ApiService';
import Loader from './../Loader/Loader';
import cx from 'classnames';
import { clone, compose } from 'ramda';
import { connect } from 'react-redux';
import { companyOperations } from '../../state/ducks/company';

class RemoveRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isConfirming: false,
      company: clone(props.company),
      registration: clone(props.registration)
    };
  }

  updateConfirming = state => {
    this.setState({ isConfirming: state });
  };

  handleDelete = () => {
    this.setState({ loading: true });
    const url = `/api/company/${this.state.company.businessId}/registrations/${this.state.registration.id}`;
    doDelete(url)
      .then(res => {
        this.props.updateCompany(res.data);
        // No need to update the component state after successfull deletion, since we know that after successfull deletion this component will no more exist.
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { t, registration } = this.props;
    return this.state.isConfirming ? (
      <div className={styles.removeWrap}>
        <div>
          {t('Haluatko varmasti poistaa luvan / rekisterimerkinnän tunnisteella')}:{' '}
          <span className={'textBold'}>{this.state.registration.identification}</span>?
        </div>
        <div className={styles.buttonWrap}>
          <button
            type="button"
            onClick={() => this.updateConfirming(false)}
            className={cx('cancel', styles.marginRight1rem)}
          >
            {t('Peruuta')}
          </button>
          <button
            type="button"
            onClick={this.handleDelete}
            disabled={this.state.loading}
            className={cx('qa-confirmRemoveCompanyRegistration')}
          >
            {t('Poista')}
          </button>
          <Loader loading={this.state.loading} />
        </div>
      </div>
    ) : (
      <div className={styles.removeWrap}>
        <button
          className={cx(
            styles.removeButton,
            'customButton',
            'qa-removeCompanyRegistration-' + registration.id
          )}
          onClick={() => this.updateConfirming(true)}
        >
          {t('Poista')}&nbsp;{t('company-registration-type-' + this.state.registration.type)}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCompany: company => dispatch(companyOperations.updateCompany(company))
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(RemoveRegistration);
