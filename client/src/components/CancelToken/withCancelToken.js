import React, { Component } from 'react';
import axios from 'axios';

const withCancelToken = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      const CancelToken = axios.CancelToken;
      this.cancelTokenSource = CancelToken.source();
      this.isCancel = axios.isCancel;
    }

    componentWillUnmount() {
      this.cancelTokenSource.cancel('unmounted');
    }

    render() {
      return (
        <WrappedComponent
          cancelTokenSource={this.cancelTokenSource}
          isCancel={this.isCancel}
          {...this.props}
        />
      );
    }
  };
};

export default withCancelToken;
