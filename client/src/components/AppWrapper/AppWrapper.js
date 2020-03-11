import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generalOperations } from '../../state/ducks/general';

class AppWrapper extends Component {
  componentDidMount() {
    const { detectTouch } = this.props;

    window.addEventListener(
      'touchstart',
      function onFirstTouch() {
        detectTouch(true);

        window.removeEventListener('touchstart', onFirstTouch, false);
      },
      false
    );

    this.props.fetchConfigurations();
  }

  render() {
    const { children, className } = this.props;

    return <div className={className}>{children}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  detectTouch: value => dispatch(generalOperations.detectTouch(value)),
  fetchConfigurations: () => dispatch(generalOperations.fetchConfigurations())
});

export default connect(
  null,
  mapDispatchToProps
)(AppWrapper);
