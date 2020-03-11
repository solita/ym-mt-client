import React, { Component } from 'react';
import i18n from '../../i18n';
import { withNamespaces } from 'react-i18next';
import cx from 'classnames';
import styles from './LanguageChange.module.css';
import { setCookie } from '../../utils/cookie-utils';
import { getDomainFromHostname } from '../../utils/common-utils';

class LanguageChange extends Component {
  render() {
    const { t } = this.props;
    const changeLanguage = (key = 'fi-FI') => event => {
      event.preventDefault();
      i18n.changeLanguage(key);
      setCookie('language', key, {
        path: '/',
        domain: getDomainFromHostname(window.location.hostname),
        'max-age': 60 * 60 * 24 * 365
      });
      event.target.blur();
    };

    return (
      <div className={cx(styles.languageChangeContainer)}>
        <button
          className={cx(
            styles.languageButton,
            { [styles.active]: i18n.language === 'fi-FI' },
            'buttonDefault'
          )}
          type="button"
          onClick={changeLanguage('fi-FI')}
        >
          {t('FI')}
        </button>{' '}
        /{' '}
        <button
          className={cx(
            styles.languageButton,
            { [styles.active]: i18n.language === 'sv-FI' },
            'buttonDefault'
          )}
          type="button"
          onClick={changeLanguage('sv-FI')}
        >
          {t('SV')}
        </button>
      </div>
    );
  }
}

export default withNamespaces()(LanguageChange);
