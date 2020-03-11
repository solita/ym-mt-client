import React from 'react';
import View from './View';
import { withNamespaces } from 'react-i18next';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { rfoOperations } from '../../state/ducks/rfo';
import Loader from '../Loader/Loader';
import suspendUntilAuthorized from '../Auth/suspendUntilAuthorized';
import { idEquals } from '../RequestForOffer/rfo-utils';

// Example usage:
// <ViewContainer id='cc8fa904-035e-4a7e-a2a7-e16cd2ee1aac' /> if this is the main interactive page (the rfo page)
// <ViewContainer id='cc8fa904-035e-4a7e-a2a7-e16cd2ee1aac' viewOnly={true} /> if this is used as a view seen (in the offer pages)
// <ViewContainer rfoToShow={rfoAndOffers.rfo} id={rfoAndOffers.rfo.id} viewOnly={true} /> if this is used as a view seen and the rfo to show is given as a parameter (in the tsv pages)
class ViewContainer extends Component {
  fetchRfoData = id => {
    this.props.fetchRfoToView(id);
  };

  fetchRfoDataIfNeeded = rfo => {
    if (
      !idEquals(rfo, this.props.id) &&
      !idEquals(path(['rfoToShow'], this.props), this.props.id)
    ) {
      this.fetchRfoData(this.props.id);
    }
  };

  componentDidMount() {
    this.fetchRfoDataIfNeeded(path(['rfo', 'payload'], this.props));
  }

  componentWillUnmount() {
    this.props.setRfoNotFound(false);
    // Leave the rfo in the Redux state as offer/EditContainer uses it in /teetarjous form
  }

  render() {
    const rfoData = path(['rfoToShow'], this.props) || path(['rfo', 'payload'], this.props);
    const viewOnly = this.props.viewOnly || false;
    const { t, loadingRfo, rfoNotFound, regionsAndMunicipalities, ewcs } = this.props;
    return (
      <>
        {(loadingRfo || !rfoData) && (
          <>
            {loadingRfo && (
              <Loader loading={loadingRfo}>
                <h1>{t('Ladataan ilmoitusta')}</h1>
              </Loader>
            )}
            {rfoNotFound && <h1>{t('Ilmoitusta ei ole olemassa')}</h1>}
          </>
        )}
        {!loadingRfo && rfoData && (
          <View
            rfo={rfoData}
            viewOnly={viewOnly}
            regionsAndMunicipalities={regionsAndMunicipalities}
            ewcs={ewcs}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  rfo: state.rfoState.view.single,
  loadingRfo: state.rfoState.status.loadingRfo,
  rfoNotFound: state.rfoState.status.rfoNotFound,
  regionsAndMunicipalities: state.generalState.location.regionsAndMunicipalities,
  ewcs: state.generalState.configurations.ewcs
});

const mapDispatchToProps = dispatch => ({
  fetchRfoToView: id => dispatch(rfoOperations.fetchRfoToView(id)),
  setRfoNotFound: value => dispatch(rfoOperations.setRfoNotFound(value)),
  clearRfoFromView: () => dispatch(rfoOperations.clearRfoView())
});

export default compose(
  suspendUntilAuthorized,
  withNamespaces(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ViewContainer);
