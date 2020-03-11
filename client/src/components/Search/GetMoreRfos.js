import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { rfoOperations } from '../../state/ducks/rfo';
import Loader from '../Loader/Loader';

let searchParams = {};

class GetMoreRfos extends Component {
  render() {
    const { t, rfosLoading } = this.props;
    const moreRfos = this.props.moreRfos;
    const {
      continuationToken,
      classification,
      service,
      rfoType,
      location,
      text
    } = this.props.searchState;
    searchParams = {
      text: text,
      location: location.map(f => f.id || f.regionId),
      rfoType: rfoType,
      service: service,
      classification: classification,
      continuationToken: continuationToken
    };
    return (
      <>
        <Loader loading={rfosLoading}>
          {continuationToken && (
            <div className={'textCenter'}>
              <button className={'buttonStyle'} onClick={moreRfos} disabled={rfosLoading}>
                {t('Lisää hakutuloksia')}
              </button>
            </div>
          )}
        </Loader>
      </>
    );
  }
}

const mapStateToProps = state => ({
  continuationToken: state.rfoState.form.continuationToken,
  searchState: state.searchState,
  rfosLoading: state.rfoState.status.loadingRfos
});

const mapDispatchToProps = dispatch => ({
  moreRfos: () => dispatch(rfoOperations.fetchRfos(searchParams, true))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(GetMoreRfos);
