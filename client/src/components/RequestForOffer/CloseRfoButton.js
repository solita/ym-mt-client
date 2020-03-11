import React, { Component } from 'react';
import { postJson } from '../../services/ApiService';
import styles from './RequestForOffer.module.css';
import { Redirect } from 'react-router-dom';
import PrivateComponent from '../Auth/PrivateComponent';
import Icon from '../Icon/Icon';
import cx from 'classnames';

class CloseRfoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: undefined
    };
  }

  handleCloseRfo(t, rfoId, closingRfoFn, closedRfoFn) {
    if (
      window.confirm(
        t(
          'Ilmoituksen sulkemisen jälkeen ilmoitusta ei voi enää muokata tai avata uudelleen, eikä sille voi pyytää kunnan toissijaista jätehuoltopalvelua. Haluatko varmasti sulkea ilmoituksen pysyvästi?'
        )
      )
    ) {
      const closeUrl = '/api/rfo/' + rfoId + '/close';
      if (closingRfoFn) {
        closingRfoFn();
      }
      postJson(closeUrl)
        .then(data => {
          if (closedRfoFn) {
            closedRfoFn();
          }
          this.setState({ redirect: '/ilmoitukset' });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { t, rfoId, rfoBusinessId, closingRfoFn, closedRfoFn } = this.props;
    return this.state.redirect ? (
      <Redirect to={this.state.redirect} />
    ) : (
      <PrivateComponent isAdminOrBelongsToBusiness={rfoBusinessId}>
        <button
          type="button"
          className={cx(styles.closeRfoButton, 'qa-rfoCloseButton')}
          onClick={() => {
            this.handleCloseRfo(t, rfoId, closingRfoFn, closedRfoFn);
          }}
        >
          <Icon aria-hidden="true" className={styles.redX} color="#fff" name="Cross" />
          {t('Sulje ilmoitus')}
        </button>
      </PrivateComponent>
    );
  }
}
export default CloseRfoButton;
