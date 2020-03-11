import React, { Component } from 'react';
import styles from './Accordion.module.css';
import chevronStyles from '../User/User.module.css';
import Icon from '../Icon/Icon';
import cx from 'classnames';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: !this.props.hideByDefault
    };
  }
  accordionInner = React.createRef();

  getHeight = () => {
    if (this.accordionInner.current) {
      this.setState({
        accordionHeight: this.accordionInner.current.scrollHeight
      });
    }
    return 0;
  };

  toggleAccordion = () => {
    this.setState({
      open: !this.state.open
    });
  };

  componentDidMount() {
    this.getHeight();
  }

  render() {
    const { children, showText, hideText, viewOnly } = this.props;

    if (viewOnly) {
      return (
        <div>
          <div
            className={(this.state.open && styles.accordion) || styles.accordionShort}
            style={{
              maxHeight: (this.state.open && this.state.accordionHeight + 'px') || '0px'
            }}
          >
            <div ref={this.accordionInner}>{children}</div>
          </div>
          <button className={styles.accordionButton} onClick={this.toggleAccordion}>
            <Icon
              className={cx(
                chevronStyles.userInfoContainer__icon,
                chevronStyles.userInfoContainer__icon__animated,
                styles.accordionButtonIcon,
                { [styles.accordionButtonIconOpen]: this.state.open }
              )}
              color="#fff"
              name="Chevron"
              size={18}
            />
            {!this.state.open && showText}
            {this.state.open && hideText}
          </button>
        </div>
      );
    } else {
      return children;
    }
  }
}

export default Accordion;
