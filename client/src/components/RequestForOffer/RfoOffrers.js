import { compose, path } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TARJOUKSET } from '../../routes';
import { getJsonData } from '../../services/ApiService';
import { isPublicOfficer } from '../../state/ducks/user/selectors';
import { formatDate } from '../../utils/date-utils';
import PrivateComponent from '../Auth/PrivateComponent';
import withCancelToken from '../CancelToken/withCancelToken';
import Loader from '../Loader/Loader';
import { getState } from '../Offer/offer-utils';
import { isWaste } from './rfo-utils';
import styles from './RfoOffers.module.css';

class RfoOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      offers: []
    };
  }

  getRfoOffers = rfoId => {
    this.setState({ loading: true });

    const url = `/api/rfo/${rfoId}/offer`;
    const config = {
      cancelToken: this.props.cancelTokenSource.token
    };
    getJsonData(url, config)
      .then(res => this.setState({ offers: res, loading: false }))
      .catch(thrown => {
        if (!this.props.isCancel(thrown)) {
          this.setState({ loading: false });
          console.log(thrown);
        }
      });
  };

  componentDidMount() {
    this.getRfoOffers(this.props.rfo.id);
  }

  mainTitle = (t, isWasteRfo, rfo, user) => {
    const rfoBusinessId = path(['businessId'])(rfo);

    const renderOffererHeader = () => {
      return (
        <h1>
          {isWasteRfo
            ? isPublicOfficer(user)
              ? t('Tähän ilmoitukseen tehdyt tarjoukset')
              : t('Tähän ilmoitukseen tekemäsi tarjoukset')
            : t('Tähän ilmoitukseen jättämäsi vastaukset')}
        </h1>
      );
    };

    return (
      <>
        <PrivateComponent belongsToBusiness={rfoBusinessId} renderInstead={renderOffererHeader}>
          <h1>
            {isWasteRfo
              ? t('Ilmoitukseesi saadut tarjoukset')
              : t('Ilmoitukseesi saadut vastaukset')}
          </h1>
        </PrivateComponent>
      </>
    );
  };

  render() {
    const { t, rfo, user } = this.props;
    const { loading, offers } = this.state;
    const isWasteRfo = isWaste(rfo);

    if (isPublicOfficer(user) && offers.length === 0) {
      return null;
    }

    return (
      <PrivateComponent>
        {this.mainTitle(t, isWasteRfo, rfo, user)}
        <div className={'divider'} />
        <Loader loading={loading}>
          {!loading && offers.length === 0 && isWasteRfo && t('Ei tarjouksia')}
          {!loading && offers.length === 0 && !isWasteRfo && t('Ei vastauksia')}
          {offers.length > 0 && (
            <div className={styles.rfoOffersWrapper}>
              <table className={styles.offerTable}>
                <thead>
                  <tr>
                    <th>{t('Lähettäjä')}</th>
                    <th>{t('Päivämäärä')}</th>
                    <th>{t('Tila')}</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map(offer => (
                    <tr key={offer.id}>
                      <td>
                        <Link to={`${TARJOUKSET}/${offer.id}`}>
                          {offer.offerer ? offer.offerer.name : offer.businessId}
                        </Link>
                      </td>
                      <td>{formatDate(new Date(offer.created))}</td>
                      <td>{t(getState(offer))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Loader>
      </PrivateComponent>
    );
  }
}

const mapStateToProps = state => ({ user: state.userState.user });

export default compose(
  withCancelToken,
  connect(mapStateToProps),
  withNamespaces()
)(RfoOffers);
