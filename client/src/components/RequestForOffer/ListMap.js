import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, find, propEq, clone } from 'ramda';
import Loader from '../Loader/Loader';
import Map from '../Map/Map';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import * as rfoTypes from '../RequestForOffer/types';
import { mapRegion, mapMunicipality, getEurefCoordinates } from '../RegionSelect/region-utils';
import { debounce } from '../../utils/common-utils';
import * as styles from '../../styles/colors.module.css';

const mapRfosToMarkers = mapRfos => {
  return mapRfos.reduce((acc, cur) => {
    return acc.concat(
      cur.coords.map((coord, i) => {
        return {
          id: cur.id + '_' + i,
          rfoId: cur.id,
          lon: coord.lon,
          lat: coord.lat,
          cityId: coord.cityId,
          regionId: coord.regionId,
          coordType: coord.type,
          rfoType: cur.rfoType,
          title: cur.title
        };
      })
    );
  }, []);
};

const groupMarkersBy = (markers, groupSelector, getCoords) => {
  let groupings = {};
  markers.forEach(mark => {
    const group = groupSelector(mark);
    if (groupings[group]) {
      groupings[group].subMarkers.push(mark);
    } else {
      const m = clone(mark);
      if (getCoords) {
        const coords = getCoords(group);
        m.lon = coords.lon;
        m.lat = coords.lat;
      }
      groupings[group] = m;
      groupings[group].subMarkers = [m];
    }
  });
  return Object.values(groupings);
};

const getCoords = (mapper, list) => id => {
  const location = mapper([id], list);
  return Array.isArray(location) && location.length && location[0].coordinates
    ? getEurefCoordinates(location[0].coordinates)
    : null;
};

const getCurrentMarkers = (mapRfos, zoom, municipalities, regions) => {
  if (Number.isNaN(zoom)) {
    return mapRfos;
  } else {
    if (zoom < 2) {
      return groupMarkersBy(
        mapRfos,
        m => {
          return m.regionId;
        },
        getCoords(mapRegion, regions)
      );
    } else if (zoom < 6) {
      return groupMarkersBy(
        mapRfos,
        m => {
          return m.cityId;
        },
        getCoords(mapMunicipality, municipalities)
      );
    } else {
      return mapRfos;
    }
  }
};

const infoBoxOptions = {
  colourScheme: {
    bgColour: styles.mtDeepGreen,
    titleColour: '#FFFFFF',
    linkColour: styles.mtDeepBlue
  },
  hidePrevious: true
};

const getListInfobox = (markers, marker, t) => {
  const title = t('Useita ilmoituksia');
  return {
    infoBox: [
      'markerInfoBox',
      title,
      [
        {
          html:
            '<div><style>.actionTemplateWrapper { margin-top: 0.5rem; } .infoboxActionLinks a{text-decoration: none;} .infoboxActionLinks:hover a{text-decoration: underline;} </style></div>' // :)
        },
        {
          actions: markers.map(f => {
            return {
              name: f.title,
              type: 'link',
              action: {
                rfoId: f.rfoId
              }
            };
          })
        }
      ],
      { marker: marker.id },
      infoBoxOptions
    ]
  };
};

const getGroupedByRfoTypInfobox = (markers, marker, t) => {
  const groups = groupMarkersBy(markers, m => m.rfoType);
  const typeCountHtml = groups
    .map(
      f =>
        '<div>' +
        t(f.rfoType + '-title') +
        ' (' +
        groupMarkersBy(f.subMarkers, m => m.rfoId).length +
        ')</div>'
    )
    .join('');
  const style = '<div><style>.contentWrapper-infobox div { margin-top: 0.5rem; }</style></div>';
  const typeCountHtmlWithStyle = style + typeCountHtml;
  const title = t('Useita ilmoituksia');
  return {
    infoBox: [
      'markerInfoBox',
      title,
      [
        {
          html: typeCountHtmlWithStyle
        }
      ],
      { marker: marker.id },
      infoBoxOptions
    ]
  };
};

const getSingleItemInfobox = (markerData, marker, t) => {
  let title =
    markerData.rfoType !== rfoTypes.RFO_OFFERING_SERVICES ? t('Materiaali') : t('Palvelu');
  return {
    infoBox: [
      'markerInfoBox',
      title,
      [
        {
          html: `<div>${markerData.title}</div>`
        },
        {
          actions: [
            {
              name: t('Katso ilmoitus'),
              type: 'link',
              action: {
                rfoId: markerData.rfoId
              }
            }
          ]
        }
      ],
      { marker: marker.id },
      infoBoxOptions
    ]
  };
};

class ListRequestForOfferOnMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: undefined,
      redirectTo: undefined,
      mapState: undefined
    };
  }

  mapStateHandler = e => {
    this.setState({ mapState: e });
  };

  currentMapMarkers = [];

  debouncedMarkerClick = debounce((markerData, marker, t, queue) => {
    if (queue.length === 1) {
      this.setState(getSingleItemInfobox(markerData, marker, t));
    } else {
      let clickedMarkers = queue.map(f => f.args[0]);
      if (clickedMarkers.length > 8) {
        this.setState(getGroupedByRfoTypInfobox(clickedMarkers, marker, t));
      } else {
        this.setState(getListInfobox(clickedMarkers, marker, t));
      }
    }
  }, 50);

  onMarkerClick = (t, marker) => {
    const markerData = find(propEq('id', marker.id))(this.currentMapMarkers);
    if (markerData.subMarkers) {
      // we can assume that when markes are grouped those wont collide and we can set state
      const subMarkers = groupMarkersBy(markerData.subMarkers, m => m.rfoId);
      if (subMarkers.length > 8) {
        this.setState(getGroupedByRfoTypInfobox(subMarkers, marker, t));
      } else if (subMarkers.length > 1) {
        this.setState(getListInfobox(subMarkers, marker, t));
      } else {
        this.debouncedMarkerClick(markerData, marker, t);
      }
      return;
    } else {
      // we might get clicks on multiple markers so we debounce clicks and show correct version of popup
      this.debouncedMarkerClick(markerData, marker, t);
    }
  };

  render() {
    const { loading, t, mapRfos } = this.props;
    const onInfoBoxAction = event => {
      if (event.actionParams.rfoId) {
        this.setState({ redirectTo: `/ilmoitukset/${event.actionParams.rfoId}` });
      }
    };

    const onInfoBoxClose = () => {
      this.setState({ infoBox: undefined });
    };

    const currentMarkers =
      mapRfos.length > 1
        ? getCurrentMarkers(
            mapRfos,
            this.state.mapState ? this.state.mapState.zoom : undefined,
            this.props.municipalities,
            this.props.regions
          )
        : mapRfos;
    this.currentMapMarkers = currentMarkers;

    return (
      <>
        <Loader loading={loading}>
          {Array.isArray(currentMarkers) && currentMarkers.length > 0 && (
            <div style={{ height: '65vh' }}>
              <Map
                onInfoBoxAction={onInfoBoxAction}
                onMarkerClick={marker => this.onMarkerClick(t, marker)}
                onInfoBoxClose={onInfoBoxClose}
                mapState={{ markers: currentMarkers, infoBox: this.state.infoBox }}
                mapEventHandlers={[
                  { eventName: 'AfterMapMoveEvent', eventHandler: this.mapStateHandler },
                  { initialMapPositionCallback: this.mapStateHandler }
                ]}
              />
            </div>
          )}
        </Loader>
        {this.state.redirectTo && <Redirect to={this.state.redirectTo} push />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    mapRfos: mapRfosToMarkers(state.rfoState.view.mapList),
    loading: state.rfoState.status.loadingMapRfos,
    regions: state.generalState.location.regions,
    municipalities: state.generalState.location.municipalities
  };
};

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(ListRequestForOfferOnMap);
