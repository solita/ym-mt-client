import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, clone } from 'ramda';
import styles from './SavedSearchList.module.css';
import myPageStyles from '../MyPage/MyPage.module.css';
import cx from 'classnames';
import { searchOperations } from '../../state/ducks/search';
import Loader from '../Loader/Loader';
import { mapRegionData } from '../RegionSelect/region-utils';
import { Redirect } from 'react-router-dom';
import { rfoOperations } from '../../state/ducks/rfo';

class SavedSearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: undefined
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

  setSearch = search => {
    let savedSearch = clone(search.search);
    savedSearch.location = Array.isArray(savedSearch.location)
      ? mapRegionData(savedSearch.location, this.props.regions)
      : [];
    this.props.setSearch(savedSearch);
    const params = {
      text: savedSearch.text || '',
      location: savedSearch.location || [],
      rfoType: savedSearch.rfoType || [],
      service: savedSearch.service || [],
      classification: savedSearch.classification || []
    };
    this.props.fetchRfosWithParamas(params);

    this.setState({ redirectTo: '/ilmoitukset' });
  };

  renderSearchTerms = (label, terms, termValue) =>
    Array.isArray(terms) &&
    terms.length > 0 &&
    terms[0] && (
      <p>
        <span className={styles.savedSearchLink__label}>{label}: </span>

        {terms.map((term, index) => (
          <span key={index}>
            {termValue(term)}
            {terms.length !== index + 1 && ', '}
          </span>
        ))}
      </p>
    );

  render() {
    const { t } = this.props;
    const intervals = {
      0: 'Ei koskaan',
      100: 'Heti',
      200: 'Kerran päivässä',
      300: 'Kerran viikossa'
    };
    return (
      <Loader loading={this.props.loadingSavedSearches}>
        {this.props.savedSearches.length > 0 ? (
          <div>
            <ul className={myPageStyles.myPageList}>
              {this.props.savedSearches.map(ss => (
                <li key={ss.id} className={myPageStyles.myPageListItem}>
                  <button
                    type="button"
                    className={cx('buttonLink', styles.savedSearchLink)}
                    onClick={() => this.setSearch(ss)}
                  >
                    {ss.name}
                  </button>
                  {ss.search.text && (
                    <p>
                      <span className={styles.savedSearchLink__label}>Hakusana: </span>
                      {ss.search.text}
                    </p>
                  )}
                  {ss.search.classification && (
                    <>
                      {this.renderSearchTerms(
                        t('Materiaali'),
                        ss.search.classification,
                        classification => {
                          return t(classification);
                        }
                      )}
                    </>
                  )}
                  {ss.search.service && (
                    <>
                      {this.renderSearchTerms(t('Palvelu'), ss.search.service, service => {
                        return t(service);
                      })}
                    </>
                  )}
                  {ss.search.rfoType && (
                    <>
                      {this.renderSearchTerms(
                        t('Ilmoituksen tyyppi'),
                        ss.search.rfoType,
                        rfoType => {
                          return t(rfoType + '-title');
                        }
                      )}
                    </>
                  )}

                  {ss.interval !== undefined && (
                    <>
                      {this.renderSearchTerms(
                        t('Sähköposti ilmoitusten aikaväli'),
                        [intervals[ss.interval]],
                        interval => {
                          return t(interval);
                        }
                      )}
                    </>
                  )}
                  {ss.search.location && mapRegionData(ss.search.location, this.props.regions) && (
                    <>
                      {this.renderSearchTerms(
                        t('Sijainnit'),
                        mapRegionData(ss.search.location, this.props.regions),
                        location => {
                          return t(location.nameFi || location.regionNameFi || location);
                        }
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>{t('Ei tallennettuja hakuvahteja')}</div>
        )}
        {this.state.redirectTo && <Redirect to={this.state.redirectTo} />}
      </Loader>
    );
  }

  removeSavedSearch = ssId => {
    this.props.removeSavedSearch(this.state.deleteConfirming.id);
    this.setState({ deleteConfirming: undefined });
  };
}
const mapStateToProps = state => {
  return {
    isTouchDevice: state.generalState.isTouchDevice,
    savedSearches: state.searchState.savedSearches,
    loadingSavedSearches: state.searchState.loadingSavedSearches,
    savedSearchesFetched: state.searchState.savedSearchesFetched,
    userLoggedIn: state.userState.user.loggedIn,
    regions: state.generalState.configurations.municipalities
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSavedSearches: () => dispatch(searchOperations.fetchSavedSearches()),
  removeSavedSearch: savedSearchId => dispatch(searchOperations.removeSavedSearch(savedSearchId)),
  setSearch: searchState => dispatch(searchOperations.setSearch(searchState)),
  fetchRfosWithParamas: params => dispatch(rfoOperations.fetchRfos(params))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SavedSearches);
