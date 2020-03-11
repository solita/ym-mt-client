import cx from 'classnames';
import { compose } from 'ramda';
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { eventOperations } from '../../state/ducks/event';
import Loader from '../Loader/Loader';
import { toViewEvent } from './event-utils';
import styles from './MyPage.module.css';
import { OMAT_VIESTIT } from '../../routes';

const Event = ({ event, t }) => {
  const viewEvent = toViewEvent(event);
  return (
    <tr>
      <td>
        {viewEvent.link ? (
          <Link to={viewEvent.link}>{t(viewEvent.linkTextKey)}</Link>
        ) : (
          <div>{t(viewEvent.linkTextKey)}</div>
        )}
        <div>{t(viewEvent.descriptionKey)}</div>
      </td>
      <td>{viewEvent.company}</td>
      <td>{viewEvent.user}</td>
      <td>{viewEvent.datetime}</td>
    </tr>
  );
};

class Events extends Component {
  componentWillUnmount() {
    this.props.clearEvents();
  }

  render() {
    const { showOnlyNew, events, eventsLoading, t } = this.props;

    return (
      <Loader loading={eventsLoading}>
        <div>
          <h2>{t('Tapahtumat')}</h2>
          {events.length > 0 && (
            <div className={cx(styles.borderTop, 'overflowAuto')}>
              <div className={styles.paddingBottom2rem}>
                <strong>
                  {t('Alla näet viimeisimmät sinua tai organisaatiotasi koskevat tapahtumat')}
                </strong>
              </div>
              <table className={cx(styles.listTable, styles.mediumVerticalCellPaddings)}>
                <thead>
                  <tr>
                    <th>{t('Tapahtuma')}</th>
                    <th>{t('Vastuullisen organisaatio')}</th>
                    <th>{t('Vastuullinen')}</th>
                    <th>{t('Aika')}</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <Event event={event} t={t} key={event.id} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!eventsLoading && events.length === 0 && <div>{t('Ei tapahtumia.')}</div>}
          {showOnlyNew && (
            <div className={styles.buttonWrap}>
              <Link className={'buttonStyle'} to={OMAT_VIESTIT}>
                {t('Lisää tapahtumia')}
              </Link>
            </div>
          )}
          {!showOnlyNew && this.props.continuationToken && (
            <div className={styles.buttonWrap}>
              <button
                className={'buttonStyle'}
                onClick={this.props.moreEvents}
                disabled={eventsLoading}
              >
                {t('Lisää tapahtumia')}
              </button>
            </div>
          )}
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = state => ({
  continuationToken: state.eventState.view.continuationToken,
  events: state.eventState.view.list,
  eventsLoading: state.eventState.status.loadingEvents
});

const mapDispatchToProps = dispatch => ({
  clearEvents: () => dispatch(eventOperations.updateEventList([])),
  moreEvents: () => dispatch(eventOperations.fetchMoreEvents())
});

const EventsWithProps = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNamespaces()
)(Events);

const NewEvents = () => <EventsWithProps showOnlyNew={true} />;
const AllEvents = () => <EventsWithProps showOnlyNew={false} />;

export { NewEvents, AllEvents };
