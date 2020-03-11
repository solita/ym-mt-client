import React, { Component } from 'react';
import Loader from '../Loader/Loader';

class ViewCompany extends Component {
  render() {
    const { company, user, loading } = this.props;

    return (
      <>
        <Loader loading={loading}>{this.props.render(user, company)}</Loader>
      </>
    );
  }
}

export default ViewCompany;
