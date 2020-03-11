import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import styles from './InfoBox.module.css';
import cx from 'classnames';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleInfo(event) {
    event.preventDefault();
    this.setState({ show: !this.state.show });
  }

  render() {
    const { t } = this.props;
    return (
      <span className={this.props.className}>
        {!this.state.show ? (
          <span className={this.state.show ? styles.infoWrapper : ''}>
            <button
              type="button"
              className={styles.infoBox}
              onClick={e => {
                this.toggleInfo(e);
              }}
            >
              {t('Lisätietoja')}
            </button>
          </span>
        ) : (
          <span className={this.state.show ? styles.infoWrapper : ''}>
            <span className={styles.infoBallOpen}>i</span>
            <span
              className={cx(
                { [styles.infoContentShow]: this.state.show },
                { [styles.infoContent]: !this.state.show }
              )}
            >
              {this.props.infoText}
              {this.props.infoText && this.props.infoLink && (<div><br/></div>)}
              {this.props.infoLink && (<a href={this.props.infoLink} target="_blank" rel="noopener noreferrer">{this.props.infoLink}</a>)}
            </span>
            <button
              type="button"
              className={styles.closeVisible}
              onClick={e => {
                this.toggleInfo(e);
              }}
            >
              &times;
            </button>
          </span>
        )}
      </span>
    );
  }
}

export default withNamespaces()(InfoBox);
