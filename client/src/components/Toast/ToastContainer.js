import React, { Component } from 'react';
import styles from './Toast.module.css';
import { withNamespaces } from 'react-i18next';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import cx from 'classnames';
import * as ToastTypes from '../../services/ToastTypes';
import Icon from '../Icon/Icon';

const Notification = notification => {
  if (notification) {
    const levelClass = `notification_${notification.level}`;
    let icon = 'Cross';
    if (notification.level === ToastTypes.SUCCESS) {
      icon = 'Tick';
    }

    return (
      <div key={notification.id} className={cx(styles.notification, styles[levelClass])}>
        <span className={styles.notificationIcon}>
          <Icon color="#fff" name={icon} size={24} />
        </span>
        <span>{notification.content}</span>
      </div>
    );
  } else {
    return null;
  }
};

class ToastContainer extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <div className={styles.toastContainer}>
        {notifications.map(notification => Notification(notification))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.generalState.notifications
});

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(ToastContainer);
