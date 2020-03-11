import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Row, Container, Col } from '../Layout/Layout';
import { Link } from 'react-router-dom';
import User from '../User/User';
import styles from './Header.module.css';
import cx from 'classnames';
import Icon from '../Icon/Icon';
import LanguageChange from '../Language/LanguageChange';

const Header = React.memo(({ t }) => (
  <header className={styles.container}>
    <Container>
      <Row>
        <Col span={4} xs={12}>
          <div className={styles.justifyCenter}>
            <Link
              className={cx(styles.headingLink, styles['headingLink--hover'])}
              id="materiaalitori-logo"
              to="/"
            >
              <Icon name="Materiaalitori" size={57} color="#fff" title="Materiaalitori" />
            </Link>
          </div>
        </Col>
        <Col span={4} xs={12}>
          <div className={styles.justifyCenter}>
            <h2 className={cx(styles.secondaryHeading)}>
              {t('Jätteiden ja sivuvirtojen tietoalusta')}
            </h2>
          </div>
        </Col>
        <Col span={3} xs={12}>
          <div className={styles.justifyCenter}>
            <User />
          </div>
        </Col>
        <Col span={1} options={{ hiddenXs: true }}>
          <LanguageChange />
        </Col>
      </Row>
    </Container>
  </header>
));

export default withNamespaces()(Header);
