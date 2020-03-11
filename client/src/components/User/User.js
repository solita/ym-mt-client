import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import * as AuthService from '../../services/AuthService';
import { userSelectors } from '../../state/ducks/user';
import Loader from '../Loader/Loader';
import styles from './User.module.css';
import { withNamespaces } from 'react-i18next';
import { withRouter, NavLink } from 'react-router-dom';
import cx from 'classnames';
import Icon from '../Icon/Icon';
import { getAdminServerUrl } from '../../utils/config-utils';

const USER_NAVIGATION_ITEMS = [
  { to: '/omasivu', title: 'Oma sivu', icon: 'Document' },
  { to: '/ilmoitukset/lisaa', title: 'Lisää ilmoitus' }
];

const ADMIN_NAVIGATION_ITEMS = [
  { to: getAdminServerUrl(), title: 'Admin toiminnot', isExternal: true }
];

class User extends Component {
  constructor(props) {
    super(props);
    this.menuContainerRef = React.createRef();
    this.state = {
      loading: false
    };
  }

  login = () => {
    this.setState({ loading: true });
    return AuthService.login(AuthService.userManager, {
      redirectTo: this.props.location.pathname
    }).catch(err => {
      this.setState({ loading: false });
      console.error(err);
    });
  };

  logout = event => {
    event.preventDefault();
    this.setState({ loading: true });
    return AuthService.logout(AuthService.userManager).catch(err => {
      this.setState({ loading: false });
      console.error(err);
    });
  };

  toggleMenu = event => {
    event.preventDefault();

    const menuElement = this.menuContainerRef.current;
    if (menuElement.toggleAttribute) {
      menuElement.toggleAttribute('aria-expanded');
    }
  };

  render() {
    const { user, t } = this.props;
    const userFullName = userSelectors.fullName(user);
    const isUserLoggedIn = userSelectors.isLoggedIn(user);

    const userMenu = (
      <div className={styles.userMenuContainer}>
        <ul className={cx(styles.navList)}>
          {USER_NAVIGATION_ITEMS.map(item => (
            <li key={item.title} className={styles.navList__item}>
              <NavLink
                activeClassName={styles['navList__item__link--active']}
                className={cx(styles.navList__item__link)}
                exact
                to={item.to}
              >
                <span className={styles.navList__item__icon}>
                  {item.icon && <Icon color="#000" name={item.icon} size={24} />}
                </span>
                <span className={styles.navList__item__title}>{t(item.title)}</span>
              </NavLink>
            </li>
          ))}

          {userSelectors.isAdmin(user) &&
            ADMIN_NAVIGATION_ITEMS.map(item => (
              <li key={item.title} className={styles.navList__item}>
                {item.isExternal ? (
                  <a className={cx(styles.navList__item__link)} href={item.to}>
                    <span className={styles.navList__item__icon}>
                      {item.icon && <Icon color="#000" name={item.icon} size={24} />}
                    </span>
                    <span className={styles.navList__item__title}>{t(item.title)}</span>
                  </a>
                ) : (
                  <NavLink
                    activeClassName={styles['navList__item__link--active']}
                    className={cx(styles.navList__item__link)}
                    exact
                    to={item.to}
                  >
                    <span className={styles.navList__item__icon}>
                      {item.icon && <Icon color="#000" name={item.icon} size={24} />}
                    </span>
                    <span className={styles.navList__item__title}>{t(item.title)}</span>
                  </NavLink>
                )}
              </li>
            ))}

          <li className={styles.navList__item}>
            <button
              className={cx(styles.actionButton, styles.navList__item__link, 'qa-logout')}
              onClick={this.logout}
              type="button"
            >
              <span className={styles.navList__item__icon} />
              <span className={styles.actionButton__link}>{`${t('Kirjaudu ulos')}`} &rarr;</span>
            </button>
          </li>
        </ul>
      </div>
    );

    const anonymous = (
      <>
        <button className={cx(styles.actionButton, 'qa-login')} type="button" onClick={this.login}>
          <Icon className={styles.actionButton__icon} color="#fff" name="Key" size={24} />
          <span className={styles.actionButton__link}>
            {`${t('Kirjaudu')} / ${t('Rekisteröidy')}`}
          </span>
        </button>
      </>
    );

    const signedIn = (
      <>
        <button className={styles.userControls} onClick={this.toggleMenu}>
          {user && (
            <div className={styles.userInfoContainer}>
              <Icon
                className={styles.userInfoContainer__icon}
                color="#fff"
                name="UserOutline"
                size={42}
              />
              <span className={styles.userInfoContainer__username}>{userFullName}</span>
              <Icon
                className={cx(
                  styles.userInfoContainer__icon,
                  styles.userInfoContainer__icon__animated
                )}
                color="#fff"
                name="Chevron"
                size={24}
              />
            </div>
          )}
        </button>
        <div className={styles.userMenuWrapper} ref={this.menuContainerRef}>
          {userMenu}
        </div>
      </>
    );

    return (
      <div className={styles.container}>
        <Loader loading={this.state.loading}>{!isUserLoggedIn ? anonymous : signedIn}</Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userState.user });

export default withRouter(
  compose(
    withNamespaces(),
    connect(mapStateToProps)
  )(User)
);
