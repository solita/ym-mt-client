import React, { Component } from 'react';
import OskariRPC from 'oskari-rpc';
import styles from './Map.module.css';
import cx from 'classnames';
import SearchHandler from './SearchHandler';
import MarkerHandler from './MarkerHandler';
import InfoBoxHandler from './InfoBoxHandler';
import { getMapUrl } from '../../utils/config-utils';
import { regionBorders } from './regions';
class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.connection = undefined;
  }

  handleRegionFeatures(regionFeatures) {
    if (Array.isArray(regionFeatures)) {
      const regionFeats = regionFeatures.map(f => {
        return {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [[regionBorders.find(r => r.id === f.id).coordinates]]
          }
        };
      });
      const geojsonObject = {
        type: 'FeatureCollection',
        crs: {
          type: 'name',
          properties: {
            name: 'EPSG:3067'
          }
        },
        features: regionFeats
      };

      const features = [
        geojsonObject,
        {
          clearPrevious: true,
          centerTo: false,
          cursor: 'zoom-in',
          prio: 4,
          minScale: 1451336,
          showLayer: true,
          opacity: 70,
          featureStyle: {
            fill: {
              color: '#297564'
            },
            stroke: {
              color: '#297564',
              width: 5
            }
          }
        }
      ];
      const conn = this.connection;
      conn.onReady(() => {
        conn.postRequest('MapModulePlugin.AddFeaturesToMapRequest', features);
        conn.postRequest('MapMoveRequest', [483328, 7157760, 0]);
      });
    }
  }

  iFrameLoaded() {
    this.connection = OskariRPC.connect(this.mapRef.current, 'https://hkp.maanmittauslaitos.fi/');
    const conn = this.connection;
    this.handleRegionFeatures(this.props.regionFeatures);
    if (Array.isArray(this.props.mapEventHandlers)) {
      this.props.mapEventHandlers.forEach(handler => {
        if (handler.eventName && typeof handler.eventHandler === 'function') {
          this.connection.handleEvent(handler.eventName, handler.eventHandler);
        }
        if (typeof handler.initialMapPositionCallback === 'function') {
          conn.onReady(() => {
            conn.getMapPosition(
              null,
              e => {
                handler.initialMapPositionCallback(e);
              },
              null
            );
          });
        }
      });
    }

    this.synchronizer = OskariRPC.synchronizerFactory(this.connection, [
      new SearchHandler(this.props.onSearchResult),
      new MarkerHandler(this.props.onMarkerDraw, this.props.onMarkerClick),
      new InfoBoxHandler(this.props.onInfoBoxClose, this.props.onInfoBoxAction)
    ]);

    this.synchronizer.synchronize(this.props.mapState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.synchronizer) {
      this.synchronizer.synchronize(nextProps.mapState);
    }
    // return false; // no need to update DOM ever
    return false;
  }

  componentWillUnmount() {
    if (this.synchronizer) {
      this.synchronizer.destroy();
    }
  }

  render() {
    const mapUrl = getMapUrl();

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className={cx(styles.mapIframeWrapper, this.props.className)}>
          <iframe
            id="map"
            ref={this.mapRef}
            title="MateriaalitoriMap"
            src={mapUrl}
            allow="geolocation"
            className={styles.mapIframe}
            onLoad={() => this.iFrameLoaded()}
          />
        </div>
      </div>
    );
  }
}

export default Map;
