import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, clone } from 'ramda';
import styles from './SavedSearches.module.css';
import cx from 'classnames';
import { searchOperations } from '../../state/ducks/search';
import { mapRegionData } from '../RegionSelect/region-utils';

class SavedSearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectionOpen: false,
      deleteConfirming: undefined
    };
  }

  ensureFetched = () => {
    if (!this.props.savedSearchesFetched && this.props.userLoggedIn) {
      this.props.fetchSavedSearches();
    }
  };

  componentDidMount() {
    this.ensureFetched();
  }

  closeSelectionList = () => {
    this.setState({ isSelectionOpen: false });
  };

  openSelectionList = () => {
    this.setState({ isSelectionOpen: true });
    setTimeout(() => {
      const listener = event => {
        this.closeSelectionList();
        window.removeEventListener('click', listener);
      };
      window.addEventListener('click', listener);
    }, 10);
  };

  setSearch = search => {
    let ss = clone(search.search);
    ss.location = Array.isArray(ss.location)
      ? mapRegionData(ss.location, this.props.municipalitiesAndRegions)
      : [];
    this.props.setSearch(ss);
    this.closeSelectionList();
  };

  removeSavedSearch = t => {
    this.props.removeSavedSearch(
      this.state.deleteConfirming.id,
      t('Hakuvahti poistettu.'),
      t('Hakuvahdin poisto epäonnistui.')
    );
    this.setState({ deleteConfirming: undefined });
  };

  render() {
    const { t } = this.props;
    return this.props.savedSearches.length > 0 ? (
      <div className={styles.savedSearchWrap}>
        <h3>{t('Hakuvahdit')}</h3>
        {this.state.deleteConfirming === undefined && (
          <ul className={styles.searchDropdown}>
            {!this.state.isSelectionOpen && (
              <li
                className={cx(styles.selectItem, styles.selectOpener)}
                onClick={this.openSelectionList}
              >
                <span className={cx(styles.selectText)}>
                  {t('Valitse tallentamasi hakuvahti...')}
                </span>
              </li>
            )}
            {this.state.isSelectionOpen &&
              this.props.savedSearches.map(f => (
                <li key={f.id} className={cx(styles.selectItem)}>
                  <span
                    className={cx(styles.selectText)}
                    onClick={() => {
                      this.setSearch(f);
                    }}
                  >
                    {f.name} [{t('saved-search-freq-' + f.interval)}]
                  </span>
                  <span
                    className={cx(styles.selectRemove)}
                    onClick={() => {
                      this.setState({ deleteConfirming: f });
                    }}
                  >
                    {t('poista')}
                  </span>
                </li>
              ))}
          </ul>
        )}

        {this.state.deleteConfirming !== undefined && (
          <div className={cx(styles.deleteConfirmSelect, styles.selectItem)}>
            <span className={styles.deleteConfirmQuestion}>
              {t('Poistetaanko hakuvahti: ')}
              {this.state.deleteConfirming.name}?
            </span>

            <span
              className={styles.deleteConfirmCancel}
              onClick={() => {
                this.setState({ deleteConfirming: undefined });
              }}
            >
              {t('Peruuta')}
            </span>
            <span className={styles.deleteConfirmDo} onClick={() => this.removeSavedSearch(t)}>
              {t('Poista')}
            </span>
          </div>
        )}
      </div>
    ) : (
      <></>
    );
  }
}
const mapStateToProps = state => {
  return {
    isTouchDevice: state.generalState.isTouchDevice,
    savedSearches: state.searchState.savedSearches,
    loadingSavedSearches: state.searchState.loadingSavedSearches,
    savedSearchesFetched: state.searchState.savedSearchesFetched,
    userLoggedIn: state.userState.user.loggedIn,
    municipalitiesAndRegions: state.generalState.location.regionsAndMunicipalities
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSavedSearches: () => dispatch(searchOperations.fetchSavedSearches()),
  removeSavedSearch: (savedSearchId, successNotification, failureNotification) =>
    dispatch(
      searchOperations.removeSavedSearch(savedSearchId, successNotification, failureNotification)
    ),
  setSearch: searchState => dispatch(searchOperations.setSearch(searchState))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SavedSearches);
