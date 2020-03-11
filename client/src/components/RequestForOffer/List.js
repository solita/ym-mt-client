import { compose } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { rfoOperations } from '../../state/ducks/rfo';
import Loader from '../Loader/Loader';

class ListRequestForOffer extends Component {
  render() {
    const { rfos, rfosLoading, t } = this.props;

    return (
      <>
        <Loader loading={rfosLoading}>{this.props.render(rfos)}</Loader>
        {!rfosLoading && rfos.length === 0 && (
          <div>
            <h2>{t('Hakutulokset:')} </h2>
            <p>{t('Ei hakutuloksia.')}</p>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    rfos: state.rfoState.view.list,
    rfosLoading: state.rfoState.status.loadingRfos
  };
};

const mapDispatchToProps = dispatch => ({
  clearRfoList: () => dispatch(rfoOperations.updateRfoList([])),
  clearRfoMapList: () => dispatch(rfoOperations.updateMapRfoList([]))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(ListRequestForOffer);
