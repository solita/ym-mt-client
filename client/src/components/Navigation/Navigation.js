import React from 'react';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from '../Layout/Layout';
import styles from './Navigation.module.css';
import Icon from '../Icon/Icon';
import cx from 'classnames';
import LanguageChange from '../Language/LanguageChange';

const NAVIGATION_ITEMS = [
  { to: '/ilmoitukset', title: 'Ilmoitukset' },
  { to: '/tietoa-palvelusta', title: 'Tietoa palvelusta' },
  { to: '/ohjeet', title: 'Ohjeet' },
  { to: '/yhteystiedot', title: 'Yhteystiedot' },
  { to: '/kokoomatiedot', title: 'Tilastot' }
];

const Navigation = ({ t }) => {
  const navigationElement = React.createRef();

  const toggleMenu = () => {
    const menuElement = navigationElement.current;
    if (menuElement.toggleAttribute) {
      menuElement.toggleAttribute('aria-expanded');
    }
  };

  const handleKeyDown = event => {
    const key = event.key;
    const keyCode = event.keyCode;

    if (key === 'Escape' || key === 'Esc' || keyCode === 27) {
      toggleMenu();
    }
  };

  return (
    <>
      <button
        aria-label={t('Avaa valikko')}
        className={cx(styles.menuToggle, styles.menuToggle__open)}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
      >
        <Icon aria-hidden="true" color="#000" name="Menu" />
        <span className={styles.menuToggle__title}>{t('Avaa valikko')}</span>
      </button>

      <nav
        aria-label="Main menu"
        className={cx(styles.mainMenu, styles.container)}
        ref={navigationElement}
        tabIndex="-1"
      >
        <Container>
          <Row>
            <Col span={12}>
              <button
                aria-label={t('Sulje valikko')}
                className={cx(styles.menuToggle, styles.menuToggle__close)}
                onClick={toggleMenu}
                onKeyDown={handleKeyDown}
              >
                <span className={styles.menuToggle__title}>{t('Sulje valikko')}</span>
                <Icon aria-hidden="true" color="#000" name="Cross" />
              </button>
            </Col>

            <Col span={12}>
              <ul className={cx(styles.navList)}>
                {NAVIGATION_ITEMS.map(item => (
                  <li key={item.title} className={styles.navList__item}>
                    <NavLink
                      activeClassName={styles['navList__item__link--active']}
                      className={cx(styles.navList__item__link)}
                      exact
                      to={item.to}
                      onKeyDown={handleKeyDown}
                      onClick={toggleMenu}
                    >
                      {t(item.title)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Col>

            <Col options={{ hiddenSm: true, hidden: true }} xs={12}>
              <LanguageChange />
            </Col>
          </Row>
        </Container>
      </nav>

      <div
        aria-hidden="true"
        className={styles.backdrop}
        hidden
        onClick={toggleMenu}
        tabIndex="-1"
      />
    </>
  );
};

export default withNamespaces()(Navigation);
