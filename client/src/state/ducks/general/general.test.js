import { pickRegionsAndAssocType, pickMunicipalities } from './reducers';
const municipalityConfigurations = [
  {
    regionId: 'R_5',
    regionNameFi: 'Pirkanmaa',
    regionNameSv: 'Birkaland',
    coordinatesPoint: {
      type: 'Point',
      coordinates: [23.70185, 61.71671]
    },
    coordinates: [
      {
        type: 'WGS84',
        lon: 23.70185,
        lat: 61.71671
      },
      {
        type: 'EUREF_FIN',
        lon: 325703.0624726041,
        lat: 6847041.461558179
      }
    ],
    municipalities: [
      {
        id: 'M_7',
        nameFi: 'Akaa',
        nameSv: 'Akaa',
        type: 'Kaupunki',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.86734, 61.16774]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.86734,
            lat: 61.16774
          },
          {
            type: 'EUREF_FIN',
            lon: 331506.5678911173,
            lat: 6785507.9034336843
          }
        ],
        regionId: 'R_5',
        regionNameFi: 'Pirkanmaa',
        regionNameSv: 'Birkaland',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.70185,
            lat: 61.71671
          },
          {
            type: 'EUREF_FIN',
            lon: 325703.0624726041,
            lat: 6847041.461558179
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.70185, 61.71671]
        },
        configurationType: 'Municipality'
      },
      {
        id: 'M_42',
        nameFi: 'Hämeenkyrö',
        nameSv: 'Tavastkyro',
        type: 'Kunta',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.19672, 61.63852]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.19672,
            lat: 61.63852
          },
          {
            type: 'EUREF_FIN',
            lon: 298519.62185031903,
            lat: 6839799.5675690342
          }
        ],
        regionId: 'R_5',
        regionNameFi: 'Pirkanmaa',
        regionNameSv: 'Birkaland',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.70185,
            lat: 61.71671
          },
          {
            type: 'EUREF_FIN',
            lon: 325703.0624726041,
            lat: 6847041.461558179
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.70185, 61.71671]
        },
        configurationType: 'Municipality'
      }
    ]
  },
  {
    regionId: 'R_13',
    regionNameFi: 'Etelä-Pohjanmaa',
    regionNameSv: 'Södra Österbotten',
    coordinatesPoint: {
      type: 'Point',
      coordinates: [23.04816, 62.73915]
    },
    coordinates: [
      {
        type: 'WGS84',
        lon: 23.04816,
        lat: 62.73915
      },
      {
        type: 'EUREF_FIN',
        lon: 298138.21093624481,
        lat: 6962718.3630645955
      }
    ],
    municipalities: [
      {
        id: 'M_1',
        nameFi: 'Alajärvi',
        nameSv: 'Alajärvi',
        type: 'Kaupunki',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.8159, 63.0]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.8159,
            lat: 63.0
          },
          {
            type: 'EUREF_FIN',
            lon: 338765.9992598127,
            lat: 6989582.4942577044
          }
        ],
        regionId: 'R_13',
        regionNameFi: 'Etelä-Pohjanmaa',
        regionNameSv: 'Södra Österbotten',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.04816,
            lat: 62.73915
          },
          {
            type: 'EUREF_FIN',
            lon: 298138.21093624481,
            lat: 6962718.3630645955
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.04816, 62.73915]
        },
        configurationType: 'Municipality'
      },
      {
        id: 'M_3',
        nameFi: 'Alavus',
        nameSv: 'Alavus',
        type: 'Kaupunki',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.6186, 62.5864]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.6186,
            lat: 62.5864
          },
          {
            type: 'EUREF_FIN',
            lon: 326362.90143384825,
            lat: 6944058.7283488922
          }
        ],
        regionId: 'R_13',
        regionNameFi: 'Etelä-Pohjanmaa',
        regionNameSv: 'Södra Österbotten',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.04816,
            lat: 62.73915
          },
          {
            type: 'EUREF_FIN',
            lon: 298138.21093624481,
            lat: 6962718.3630645955
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.04816, 62.73915]
        },
        configurationType: 'Municipality'
      }
    ]
  }
];

describe('Utils: region', () => {
  it('should pick only regions from configurations', () => {
    const result = pickRegionsAndAssocType(municipalityConfigurations);
    const expected = [
      {
        regionId: 'R_5',
        regionNameFi: 'Pirkanmaa',
        regionNameSv: 'Birkaland',
        configurationType: 'Region',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.70185, 61.71671]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.70185,
            lat: 61.71671
          },
          {
            type: 'EUREF_FIN',
            lon: 325703.0624726041,
            lat: 6847041.461558179
          }
        ]
      },
      {
        regionId: 'R_13',
        regionNameFi: 'Etelä-Pohjanmaa',
        regionNameSv: 'Södra Österbotten',
        configurationType: 'Region',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.04816, 62.73915]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.04816,
            lat: 62.73915
          },
          {
            type: 'EUREF_FIN',
            lon: 298138.21093624481,
            lat: 6962718.3630645955
          }
        ]
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should pick only municipalities from configurations', () => {
    const result = pickMunicipalities(municipalityConfigurations);
    const expected = [
      {
        id: 'M_7',
        nameFi: 'Akaa',
        nameSv: 'Akaa',
        type: 'Kaupunki',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.86734, 61.16774]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.86734,
            lat: 61.16774
          },
          {
            type: 'EUREF_FIN',
            lon: 331506.5678911173,
            lat: 6785507.9034336843
          }
        ],
        regionId: 'R_5',
        regionNameFi: 'Pirkanmaa',
        regionNameSv: 'Birkaland',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.70185,
            lat: 61.71671
          },
          {
            type: 'EUREF_FIN',
            lon: 325703.0624726041,
            lat: 6847041.461558179
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.70185, 61.71671]
        },
        configurationType: 'Municipality'
      },
      {
        id: 'M_42',
        nameFi: 'Hämeenkyrö',
        nameSv: 'Tavastkyro',
        type: 'Kunta',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.19672, 61.63852]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.19672,
            lat: 61.63852
          },
          {
            type: 'EUREF_FIN',
            lon: 298519.62185031903,
            lat: 6839799.5675690342
          }
        ],
        regionId: 'R_5',
        regionNameFi: 'Pirkanmaa',
        regionNameSv: 'Birkaland',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.70185,
            lat: 61.71671
          },
          {
            type: 'EUREF_FIN',
            lon: 325703.0624726041,
            lat: 6847041.461558179
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.70185, 61.71671]
        },
        configurationType: 'Municipality'
      },
      {
        id: 'M_1',
        nameFi: 'Alajärvi',
        nameSv: 'Alajärvi',
        type: 'Kaupunki',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.8159, 63.0]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.8159,
            lat: 63.0
          },
          {
            type: 'EUREF_FIN',
            lon: 338765.9992598127,
            lat: 6989582.4942577044
          }
        ],
        regionId: 'R_13',
        regionNameFi: 'Etelä-Pohjanmaa',
        regionNameSv: 'Södra Österbotten',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.04816,
            lat: 62.73915
          },
          {
            type: 'EUREF_FIN',
            lon: 298138.21093624481,
            lat: 6962718.3630645955
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.04816, 62.73915]
        },
        configurationType: 'Municipality'
      },
      {
        id: 'M_3',
        nameFi: 'Alavus',
        nameSv: 'Alavus',
        type: 'Kaupunki',
        coordinatesPoint: {
          type: 'Point',
          coordinates: [23.6186, 62.5864]
        },
        coordinates: [
          {
            type: 'WGS84',
            lon: 23.6186,
            lat: 62.5864
          },
          {
            type: 'EUREF_FIN',
            lon: 326362.90143384825,
            lat: 6944058.7283488922
          }
        ],
        regionId: 'R_13',
        regionNameFi: 'Etelä-Pohjanmaa',
        regionNameSv: 'Södra Österbotten',
        regionCoordinates: [
          {
            type: 'WGS84',
            lon: 23.04816,
            lat: 62.73915
          },
          {
            type: 'EUREF_FIN',
            lon: 298138.21093624481,
            lat: 6962718.3630645955
          }
        ],
        regionCoordinatesPoint: {
          type: 'Point',
          coordinates: [23.04816, 62.73915]
        },
        configurationType: 'Municipality'
      }
    ];

    expect(result).toEqual(expected);
  });
});
