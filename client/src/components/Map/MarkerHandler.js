import { equals } from 'ramda';
import * as styles from '../../styles/colors.module.css';

export default class MarkerHandler {
  constructor(onMarkerDraw, onMarkerClick) {
    this.onMarkerDraw = onMarkerDraw || (() => void 0);
    this.onMarkerClick = onMarkerClick || undefined;
    this.markersOnMap = [];
    this.initialPositionSet = false;
  }

  init(channel) {
    channel.handleEvent('AfterAddMarkerEvent', event => {
      this.onMarkerDraw(event);
    });

    if (this.onMarkerClick) {
      channel.handleEvent('MarkerClickEvent', event => {
        this.onMarkerClick(event);
      });
    }
  }

  synchronize(channel, state) {
    const { markers } = state;
    if (!markers || markers.length === 0) {
      channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
      this.markersOnMap = [];
      return;
    }

    if (!markers || equals(this.markersOnMap, markers)) {
      return;
    }
    channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
    const markersToMap = markers.map(marker => {
      return {
        data: {
          y: marker.lat,
          x: marker.lon,
          shape: `<svg width="32" height="32">
          <style type="text/css">
              .st0{fill:#FFFFFF;}
              .st1{fill: ${styles.mtDeepGreen};stroke:#FFFFFF;stroke-width:1;stroke-miterlimit:10;}
            </style>
            <circle class="st0" cx="15.9" cy="10.1" r="5.6" opacity="0.01"/>
            <g>
              <path class="st1" d="M15.9,0.2c-5.5,0-9.8,4.4-9.8,9.8c0,9.4,9.8,21.6,9.8,21.6s9.9-12.2,9.9-21.6C25.8,4.7,21.4,0.2,15.9,0.2z    M15.9,15.5c-3,0-5.4-2.4-5.4-5.4s2.4-5.4,5.4-5.4s5.4,2.4,5.4,5.4S18.9,15.5,15.9,15.5z"/>
            </g>
          </svg>`,
          size: 8,
          color: styles.mtDeepGreen
        },
        id: marker.id
      };
    });

    if (markersToMap[0] && markersToMap[0].data && markersToMap[0].data.x) {
      markersToMap.forEach(marker =>
        channel.postRequest('MapModulePlugin.AddMarkerRequest', [marker.data, marker.id])
      );
    }

    if (markersToMap[0] && markersToMap[0].data && markersToMap[0].data.x) {
      if (markersToMap.length === 1) {
        channel.postRequest('MapMoveRequest', [markersToMap[0].data.x, markersToMap[0].data.y, 7]);
      } else if (!this.initialPositionSet) {
        this.initialPositionSet = true;
        channel.postRequest('MapMoveRequest', [markersToMap[0].data.x, markersToMap[0].data.y, 1]);
      }
    }

    this.markersOnMap = markers;
  }
}
