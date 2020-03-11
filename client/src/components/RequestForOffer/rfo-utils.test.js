import * as rfoUtils from './rfo-utils';

describe('Utils: rfo', () => {
  describe('Request payload transform functions', () => {
    it('should transform rfo state to waste request payload', () => {
      const rfoState = {
        materials: [
          {
            useTsv: true,
            classification: 'lasi',
            industry: 'tukku_vahittaiskauppa',
            ewcCode: '012',
            type: 'nondangerous',
            permanent: true,
            description: 'Waste desc',
            continuity: 'continuous',
            quantityAmount: '1000',
            quantityUnit: 'kg',
            amountDescription: 'amount desc'
          }
        ],
        attachments: [],
        type: 'offeringWaste',
        title: 'Title',
        serviceName: 'kasittely',
        serviceRequirements: 'needs this',
        serviceDuration: 'timeframe',
        locationIsPrivate: false,
        locationName: 'public place',
        locationStreetAddress: 'public steet',
        locationPostalCode: '01234',
        locationCity: {
          id: 'M_270',
          nameFi: 'Tampere',
          nameSv: 'Tammerfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [23.75725, 61.49748]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 23.75725,
              lat: 61.49748
            },
            {
              type: 'EUREF_FIN',
              lon: 327412.9218793077,
              lat: 6822494.628287048
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
        mapLocation: {
          zoomScale: 56650,
          name: 'Helsinki',
          rank: 10,
          lon: '385884.969',
          id: 0,
          type: 'Kunta, kaupunki',
          region: 'Helsinki',
          village: 'Helsinki',
          lat: '6671746.625',
          channelId: 'REGISTER_OF_NOMENCLATURE_CHANNEL'
        },
        expires: '2020-01-01',
        contactIsPrivate: false,
        contact_name: 'name',
        contact_title: 'title',
        contact_phone: '123',
        contact_email: 'a@a.a'
      };

      const result = rfoUtils.rfoStateToRequestPayload(rfoState);

      const expected = {
        type: 'offeringWaste',
        data: {
          title: 'Title',
          expires: '2020-01-01',
          contactIsPublic: true,
          contact: {
            name: 'name',
            title: 'title',
            phone: '123',
            email: 'a@a.a'
          },
          materials: [
            {
              classification: 'lasi',
              industry: 'tukku_vahittaiskauppa',
              ewcCode: '012',
              isWaste: true,
              useTsv: true,
              type: 'nondangerous',
              permanent: true,
              description: 'Waste desc',
              quantity: {
                amount: 1000,
                unitOfMeasure: 'kg'
              },
              continuity: 'continuous',
              amountDescription: 'amount desc',
              locationIsPublic: true,
              location: {
                name: 'public place',
                address: 'public steet',
                postalCode: '01234',
                city: 'Tampere',
                cityId: 'M_270',
                region: 'Pirkanmaa',
                regionId: 'R_5',
                countryCode: 'fi',
                coordinates: [
                  {
                    type: 'EUREF_FIN',
                    lat: '6671746.625',
                    lon: '385884.969'
                  }
                ]
              },
              service: {
                serviceIds: ['kasittely'],
                requirements: 'needs this',
                duration: 'timeframe'
              }
            }
          ],
          attachments: []
        }
      };

      expect(result).toEqual(expected);
    });

    it('should transform rfo state to material request payload', () => {
      const rfoState = {
        materials: [
          {
            classification: 'lasi',
            industry: 'tukku_vahittaiskauppa',
            description: 'Waste desc',
            continuity: 'continuous',
            quantityAmount: '1000',
            quantityUnit: 'kg',
            amountDescription: 'amount desc'
          }
        ],
        attachments: [],
        type: 'offeringMaterial',
        title: 'Title',
        serviceName: 'kasittely',
        serviceRequirements: 'needs this',
        serviceDuration: 'timeframe',
        locationIsPrivate: false,
        locationName: 'public place',
        locationStreetAddress: 'public steet',
        locationPostalCode: '01234',
        locationCity: {
          id: 'M_270',
          nameFi: 'Tampere',
          nameSv: 'Tammerfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [23.75725, 61.49748]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 23.75725,
              lat: 61.49748
            },
            {
              type: 'EUREF_FIN',
              lon: 327412.9218793077,
              lat: 6822494.628287048
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
        expires: '2020-01-01',
        contactIsPrivate: false,
        contact_name: 'name',
        contact_title: 'title',
        contact_phone: '123',
        contact_email: 'a@a.a'
      };

      const result = rfoUtils.rfoStateToRequestPayload(rfoState);

      const expected = {
        type: 'offeringMaterial',
        data: {
          title: 'Title',
          expires: '2020-01-01',
          contactIsPublic: true,
          contact: {
            name: 'name',
            title: 'title',
            phone: '123',
            email: 'a@a.a'
          },
          materials: [
            {
              classification: 'lasi',
              industry: 'tukku_vahittaiskauppa',
              description: 'Waste desc',
              isWaste: false,
              quantity: {
                amount: 1000,
                unitOfMeasure: 'kg'
              },
              continuity: 'continuous',
              amountDescription: 'amount desc',
              locationIsPublic: true,
              location: {
                name: 'public place',
                address: 'public steet',
                postalCode: '01234',
                city: 'Tampere',
                cityId: 'M_270',
                region: 'Pirkanmaa',
                regionId: 'R_5',
                countryCode: 'fi'
              }
            }
          ],
          attachments: []
        }
      };

      expect(result).toEqual(expected);
    });

    it('should transform rfo state to receiving material request payload', () => {
      const rfoState = {
        materials: [
          {
            classification: 'lasi',
            description: 'Desc'
          }
        ],
        regions: [
          {
            id: 'M_33',
            nameFi: 'Helsinki',
            nameSv: 'Helsingfors',
            type: 'Kaupunki',
            coordinatesPoint: {
              type: 'Point',
              coordinates: [24.93813, 60.16981]
            },
            coordinates: [
              {
                type: 'WGS84',
                lon: 24.93813,
                lat: 60.16981
              },
              {
                type: 'EUREF_FIN',
                lon: 385596.02595120465,
                lat: 6672108.828002105
              }
            ],
            regionId: 'R_1',
            regionNameFi: 'Uusimaa',
            regionNameSv: 'Nyland',
            regionCoordinates: [
              {
                type: 'WGS84',
                lon: 24.74495,
                lat: 60.28761
              },
              {
                type: 'EUREF_FIN',
                lon: 375328.2692726671,
                lat: 6685573.626630756
              }
            ],
            regionCoordinatesPoint: {
              type: 'Point',
              coordinates: [24.74495, 60.28761]
            },
            configurationType: 'Municipality'
          },
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
            configurationType: 'Region'
          }
        ],
        attachments: [],
        type: 'receivingMaterial',
        title: 'Title',
        expires: '2020-01-01',
        contactIsPrivate: false,
        contact_name: 'name',
        contact_title: 'title',
        contact_phone: '123',
        contact_email: 'a@a.a'
      };

      const result = rfoUtils.rfoStateToRequestPayload(rfoState);

      const expected = {
        type: 'receivingMaterial',
        data: {
          title: 'Title',
          expires: '2020-01-01',
          contactIsPublic: true,
          contact: {
            name: 'name',
            title: 'title',
            phone: '123',
            email: 'a@a.a'
          },
          regions: [
            {
              id: 'M_33',
              nameFi: 'Helsinki',
              nameSv: 'Helsingfors'
            },
            {
              id: 'R_5',
              nameFi: 'Pirkanmaa',
              nameSv: 'Birkaland'
            }
          ],
          materials: [
            {
              classification: 'lasi',
              description: 'Desc'
            }
          ],
          attachments: []
        }
      };

      expect(result).toEqual(expected);
    });

    it('should transform rfo state to offering services request payload', () => {
      const rfoState = {
        type: 'offeringServices',
        attachments: [],
        title: 'Title',
        serviceName: 'kasittely',
        serviceDescription: 'Service Desc',
        locationIsPrivate: false,
        locationName: 'public place',
        locationStreetAddress: 'public steet',
        locationPostalCode: '01234',
        locationCity: {
          id: 'M_270',
          nameFi: 'Tampere',
          nameSv: 'Tammerfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [23.75725, 61.49748]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 23.75725,
              lat: 61.49748
            },
            {
              type: 'EUREF_FIN',
              lon: 327412.9218793077,
              lat: 6822494.628287048
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
        materials: [],
        expires: '2020-01-01',
        regions: [
          {
            id: 'M_33',
            nameFi: 'Helsinki',
            nameSv: 'Helsingfors',
            type: 'Kaupunki',
            coordinatesPoint: {
              type: 'Point',
              coordinates: [24.93813, 60.16981]
            },
            coordinates: [
              {
                type: 'WGS84',
                lon: 24.93813,
                lat: 60.16981
              },
              {
                type: 'EUREF_FIN',
                lon: 385596.02595120465,
                lat: 6672108.828002105
              }
            ],
            regionId: 'R_1',
            regionNameFi: 'Uusimaa',
            regionNameSv: 'Nyland',
            regionCoordinates: [
              {
                type: 'WGS84',
                lon: 24.74495,
                lat: 60.28761
              },
              {
                type: 'EUREF_FIN',
                lon: 375328.2692726671,
                lat: 6685573.626630756
              }
            ],
            regionCoordinatesPoint: {
              type: 'Point',
              coordinates: [24.74495, 60.28761]
            },
            configurationType: 'Municipality'
          },
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
            configurationType: 'Region'
          }
        ],
        contactIsPrivate: false,
        contact_name: 'name',
        contact_title: 'title',
        contact_phone: '123',
        contact_email: 'a@a.a'
      };

      const result = rfoUtils.rfoStateToRequestPayload(rfoState);

      const expected = {
        type: 'offeringServices',
        data: {
          title: 'Title',
          expires: '2020-01-01',
          materials: [
            {
              locationIsPublic: true,
              location: {
                name: 'public place',
                address: 'public steet',
                postalCode: '01234',
                city: 'Tampere',
                cityId: 'M_270',
                region: 'Pirkanmaa',
                regionId: 'R_5',
                countryCode: 'fi'
              }
            }
          ],
          service: {
            serviceIds: ['kasittely'],
            serviceDescription: 'Service Desc'
          },
          regions: [
            {
              id: 'M_33',
              nameFi: 'Helsinki',
              nameSv: 'Helsingfors'
            },
            {
              id: 'R_5',
              nameFi: 'Pirkanmaa',
              nameSv: 'Birkaland'
            }
          ],
          contactIsPublic: true,
          contact: {
            name: 'name',
            title: 'title',
            phone: '123',
            email: 'a@a.a'
          },
          attachments: []
        }
      };

      expect(result).toEqual(expected);
    });
  });

  describe('Transform view data to edit form', () => {
    it('should transform offering waste type rfo for edit form', () => {
      const viewData = {
        id: '9e22be8f-1946-4c99-aa36-22c50235b1d7',
        rfoType: 'offeringWaste',
        company: {
          id: '80a6b027-6c96-358e-4463-ec66f0a1e5f4',
          name: 'testi tero',
          businessId: 'solita-y',
          address: {
            name: '',
            address: 'helsinginkatu 6',
            postalCode: '00550',
            city: 'Helsinki',
            cityId: 'M_33',
            region: 'Uusimaa',
            regionId: 'R_1',
            coordinates: [
              {
                type: 'EUREF_FIN',
                lon: 386708.351,
                lat: 6674016.904
              }
            ]
          },
          email: 'jesse.huurre@solita.fi',
          isTSVRequestRecipient: false
        },
        businessId: 'solita-y',
        title: 'load test',
        created: '2019-03-28T09:29:32.0143337Z',
        createdBy: 'b22f2476-975a-4301-841b-88425d5e51b4',
        expires: '2019-06-29T21:00:00Z',
        contactIsPublic: true,
        contact: {
          name: 'testi',
          title: 'a',
          phone: '31123123123',
          email: 'romulus.kasalus@yritysabcdefg.com'
        },
        materials: [
          {
            classification: 'keramiikka',
            industry: 'rakentaminen_ja_purkaminen',
            ewcCode: '11 22 33',
            isWaste: true,
            useTsv: true,
            type: 'nondangerous',
            permanent: false,
            description: 'Description',
            quantity: {
              amount: 1000,
              unitOfMeasure: 't'
            },
            continuity: 'continuous',
            amountDescription: 'Amount description',
            locationIsPublic: true,
            location: {
              name: 'sijainti',
              address: 'alvar aallon katu 5',
              postalCode: '00550',
              city: 'Helsinki',
              cityId: 'M_33',
              countryCode: 'fi',
              coordinatesPoint: {
                type: 'Point',
                coordinates: [24.93839719204329, 60.17660323126781]
              },
              coordinates: [
                {
                  type: 'WGS84',
                  lon: 24.93839719204329,
                  lat: 60.17660323126781
                },
                {
                  type: 'EUREF_FIN',
                  lon: 385634.467,
                  lat: 6672864.688
                }
              ]
            },
            service: {
              serviceIds: [
                'kuljetus_kasittely',
                'esikasittely',
                'uudelleenkayton_valmistelu',
                'kierratys',
                'hyodyntaminen_maantaytossa_tai_maisemoinnissa'
              ],
              requirements: 'Service requirements',
              duration: 'Service duration'
            }
          }
        ],
        materialsWanted: [],
        attachments: []
      };

      const regionDataFlat = [
        {
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [24.93813, 60.16981]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 24.93813,
              lat: 60.16981
            },
            {
              type: 'EUREF_FIN',
              lon: 385596.02595120465,
              lat: 6672108.828002105
            }
          ],
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          regionCoordinates: [
            {
              type: 'WGS84',
              lon: 24.74495,
              lat: 60.28761
            },
            {
              type: 'EUREF_FIN',
              lon: 375328.2692726671,
              lat: 6685573.626630756
            }
          ],
          regionCoordinatesPoint: {
            type: 'Point',
            coordinates: [24.74495, 60.28761]
          },
          configurationType: 'Municipality'
        }
      ];

      const result = rfoUtils.mapRfoDataToForm(viewData, regionDataFlat);

      const expected = {
        title: 'load test',
        expires: '2019-06-29T21:00:00Z',
        rfoHasExpired: true,
        businessId: 'solita-y',
        contactIsPrivate: false,
        type: 'offeringWaste',
        contact_name: 'testi',
        contact_title: 'a',
        contact_email: 'romulus.kasalus@yritysabcdefg.com',
        contact_phone: '31123123123',
        materials: [
          {
            classification: 'keramiikka',
            industry: 'rakentaminen_ja_purkaminen',
            ewcCode: '11 22 33',
            isWaste: true,
            useTsv: true,
            type: 'nondangerous',
            permanent: false,
            description: 'Description',
            quantityAmount: 1000,
            quantityUnit: 't',
            continuity: 'continuous',
            amountDescription: 'Amount description'
          }
        ],
        locationIsPrivate: false,
        locationName: 'sijainti',
        locationStreetAddress: 'alvar aallon katu 5',
        locationPostalCode: '00550',
        locationCity: {
          configurationType: 'Municipality',
          coordinates: [
            {
              lat: 60.16981,
              lon: 24.93813,
              type: 'WGS84'
            },
            {
              lat: 6672108.828002105,
              lon: 385596.02595120465,
              type: 'EUREF_FIN'
            }
          ],
          coordinatesPoint: {
            coordinates: [24.93813, 60.16981],
            type: 'Point'
          },
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          regionCoordinates: [
            {
              lat: 60.28761,
              lon: 24.74495,
              type: 'WGS84'
            },
            {
              lat: 6685573.626630756,
              lon: 375328.2692726671,
              type: 'EUREF_FIN'
            }
          ],
          regionCoordinatesPoint: {
            coordinates: [24.74495, 60.28761],
            type: 'Point'
          },
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          type: 'Kaupunki'
        },

        serviceName: 'kuljetus_kasittely',
        subService: [
          'esikasittely',
          'uudelleenkayton_valmistelu',
          'kierratys',
          'hyodyntaminen_maantaytossa_tai_maisemoinnissa'
        ],
        serviceRequirements: 'Service requirements',
        serviceDuration: 'Service duration',

        attachments: [],
        regions: []
      };

      expect(result).toEqual(expected);
    });

    it('should transform offering material type rfo for edit form', () => {
      const viewData = {
        id: '9ea70925-ac7a-42c7-9b2b-5869227ad8a4',
        rfoType: 'offeringMaterial',
        company: {
          id: '80a6b027-6c96-358e-4463-ec66f0a1e5f4',
          name: 'testi tero',
          businessId: 'solita-y',
          address: {
            name: '',
            address: 'helsinginkatu 6',
            postalCode: '00550',
            city: 'Helsinki',
            cityId: 'M_33',
            region: 'Uusimaa',
            regionId: 'R_1',
            coordinates: [
              {
                type: 'EUREF_FIN',
                lon: 386708.351,
                lat: 6674016.904
              }
            ]
          },
          email: 'jesse.huurre@solita.fi',
          isTSVRequestRecipient: false
        },
        businessId: 'solita-y',
        title: 'Offering material',
        created: '2019-03-28T06:27:51.7684864Z',
        createdBy: 'b22f2476-975a-4301-841b-88425d5e51b4',
        expires: '2019-06-29T21:00:00Z',
        contactIsPublic: true,
        contact: {
          name: 'testi',
          title: 'a',
          phone: '31123123123',
          email: 'romulus.kasalus@yritysabcdefg.com'
        },
        materials: [
          {
            classification: 'muovi',
            industry: 'rakentaminen_ja_purkaminen',
            isWaste: false,
            useTsv: false,
            permanent: false,
            description: 'Description',
            quantity: {
              amount: 1.0,
              unitOfMeasure: 'kg'
            },
            continuity: 'onetime',
            amountDescription: 'Amount description',
            locationIsPublic: true,
            location: {
              name: 'sijainti',
              address: 'alvar aallon katu 5',
              postalCode: '00550',
              city: 'Helsinki',
              cityId: 'M_33',
              region: 'Uusimaa',
              regionId: 'R_1',
              countryCode: 'fi',
              coordinatesPoint: {
                type: 'Point',
                coordinates: [24.93839719204329, 60.176603231267812]
              },
              coordinates: [
                {
                  type: 'WGS84',
                  lon: 24.93839719204329,
                  lat: 60.176603231267812
                },
                {
                  type: 'EUREF_FIN',
                  lon: 385634.467,
                  lat: 6672864.688
                }
              ]
            }
          }
        ],
        materialsWanted: [],
        attachments: []
      };

      const regionDataFlat = [
        {
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [24.93813, 60.16981]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 24.93813,
              lat: 60.16981
            },
            {
              type: 'EUREF_FIN',
              lon: 385596.02595120465,
              lat: 6672108.828002105
            }
          ],
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          regionCoordinates: [
            {
              type: 'WGS84',
              lon: 24.74495,
              lat: 60.28761
            },
            {
              type: 'EUREF_FIN',
              lon: 375328.2692726671,
              lat: 6685573.626630756
            }
          ],
          regionCoordinatesPoint: {
            type: 'Point',
            coordinates: [24.74495, 60.28761]
          },
          configurationType: 'Municipality'
        }
      ];

      const result = rfoUtils.mapRfoDataToForm(viewData, regionDataFlat);

      const expected = {
        title: 'Offering material',
        expires: '2019-06-29T21:00:00Z',
        rfoHasExpired: true,
        businessId: 'solita-y',
        contactIsPrivate: false,
        type: 'offeringMaterial',
        contact_name: 'testi',
        contact_title: 'a',
        contact_email: 'romulus.kasalus@yritysabcdefg.com',
        contact_phone: '31123123123',
        materials: [
          {
            classification: 'muovi',
            industry: 'rakentaminen_ja_purkaminen',
            isWaste: false,
            useTsv: false,
            permanent: false,
            description: 'Description',
            quantityAmount: 1,
            quantityUnit: 'kg',
            continuity: 'onetime',
            amountDescription: 'Amount description'
          }
        ],
        locationIsPrivate: false,
        locationName: 'sijainti',
        locationStreetAddress: 'alvar aallon katu 5',
        locationPostalCode: '00550',
        locationCity: {
          configurationType: 'Municipality',
          coordinates: [
            {
              lat: 60.16981,
              lon: 24.93813,
              type: 'WGS84'
            },
            {
              lat: 6672108.828002105,
              lon: 385596.02595120465,
              type: 'EUREF_FIN'
            }
          ],
          coordinatesPoint: {
            coordinates: [24.93813, 60.16981],
            type: 'Point'
          },
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          regionCoordinates: [
            {
              lat: 60.28761,
              lon: 24.74495,
              type: 'WGS84'
            },
            {
              lat: 6685573.626630756,
              lon: 375328.2692726671,
              type: 'EUREF_FIN'
            }
          ],
          regionCoordinatesPoint: {
            coordinates: [24.74495, 60.28761],
            type: 'Point'
          },
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          type: 'Kaupunki'
        },
        attachments: [],
        regions: []
      };

      expect(result).toEqual(expected);
    });

    it('should transform receiving material type rfo for edit form', () => {
      const viewData = {
        id: '9ddb9a98-a287-40d8-a1aa-4d87c9e831e6',
        rfoType: 'receivingMaterial',
        company: {
          id: '80a6b027-6c96-358e-4463-ec66f0a1e5f4',
          name: 'testi tero',
          businessId: 'solita-y',
          address: {
            name: '',
            address: 'helsinginkatu 6',
            postalCode: '00550',
            city: 'Helsinki',
            cityId: 'M_33',
            region: 'Uusimaa',
            regionId: 'R_1',
            coordinates: [
              {
                type: 'EUREF_FIN',
                lon: 386708.351,
                lat: 6674016.904
              }
            ]
          },
          email: 'jesse.huurre@solita.fi',
          isTSVRequestRecipient: false
        },
        businessId: 'solita-y',
        title: 'Solita testi: Etsin materiaalia ',
        created: '2019-03-26T17:57:11.0060869Z',
        createdBy: 'b22f2476-975a-4301-841b-88425d5e51b4',
        expires: '2019-03-31T00:00:00',
        contactIsPublic: true,
        contact: {
          name: 'Etunimi ',
          title: 'Roolinsa',
          phone: '00000000000',
          email: 'a@b.c'
        },
        materials: [],
        materialsWanted: [
          {
            classification: 'tuhka_ja_kuona',
            description: 'Etsittävän materiaalin kuvaus'
          }
        ],
        regions: [
          {
            id: 'R_3',
            nameFi: 'Satakunta',
            nameSv: 'Satakunta'
          }
        ],
        attachments: []
      };

      const regionDataFlat = [
        {
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [24.93813, 60.16981]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 24.93813,
              lat: 60.16981
            },
            {
              type: 'EUREF_FIN',
              lon: 385596.02595120465,
              lat: 6672108.828002105
            }
          ],
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          regionCoordinates: [
            {
              type: 'WGS84',
              lon: 24.74495,
              lat: 60.28761
            },
            {
              type: 'EUREF_FIN',
              lon: 375328.2692726671,
              lat: 6685573.626630756
            }
          ],
          regionCoordinatesPoint: {
            type: 'Point',
            coordinates: [24.74495, 60.28761]
          },
          configurationType: 'Municipality'
        },
        {
          regionId: 'R_3',
          regionNameFi: 'Satakunta',
          regionNameSv: 'Satakunta',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [22.0944, 61.59148]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 22.0944,
              lat: 61.59148
            },
            {
              type: 'EUREF_FIN',
              lon: 239798.52659372473,
              lat: 6838478.377055628
            }
          ],
          configurationType: 'Region'
        }
      ];

      const result = rfoUtils.mapRfoDataToForm(viewData, regionDataFlat);

      const expected = {
        title: 'Solita testi: Etsin materiaalia ',
        expires: '2019-03-31T00:00:00',
        rfoHasExpired: true,
        businessId: 'solita-y',
        type: 'receivingMaterial',
        contactIsPrivate: false,
        contact_name: 'Etunimi ',
        contact_title: 'Roolinsa',
        contact_phone: '00000000000',
        contact_email: 'a@b.c',
        materials: [
          {
            classification: 'tuhka_ja_kuona',
            description: 'Etsittävän materiaalin kuvaus'
          }
        ],
        regions: [
          {
            regionId: 'R_3',
            regionNameFi: 'Satakunta',
            regionNameSv: 'Satakunta',
            coordinatesPoint: {
              type: 'Point',
              coordinates: [22.0944, 61.59148]
            },
            coordinates: [
              {
                type: 'WGS84',
                lon: 22.0944,
                lat: 61.59148
              },
              {
                type: 'EUREF_FIN',
                lon: 239798.52659372473,
                lat: 6838478.377055628
              }
            ],
            configurationType: 'Region'
          }
        ],
        attachments: []
      };

      expect(result).toEqual(expected);
    });

    it('should transform offering services type rfo for edit form', () => {
      const viewData = {
        id: 'fd0e680a-b15f-47d5-a671-b7fdf63b7fb4',
        rfoType: 'offeringServices',
        company: {
          id: '80a6b027-6c96-358e-4463-ec66f0a1e5f4',
          name: 'testi tero',
          businessId: 'solita-y',
          address: {
            name: '',
            address: 'helsinginkatu 6',
            postalCode: '00550',
            city: 'Helsinki',
            cityId: 'M_33',
            region: 'Uusimaa',
            regionId: 'R_1',
            coordinates: [
              {
                type: 'EUREF_FIN',
                lon: 386708.351,
                lat: 6674016.904
              }
            ]
          },
          email: 'jesse.huurre@solita.fi',
          isTSVRequestRecipient: false
        },
        businessId: 'solita-y',
        title: 'Test offering services',
        created: '2019-03-27T18:02:07.1809927Z',
        createdBy: 'b22f2476-975a-4301-841b-88425d5e51b4',
        expires: '2019-08-30T21:00:00Z',
        contactIsPublic: true,
        contact: {
          name: 'Matti Meitsiläinen',
          title: 'Toimari',
          phone: '00000000000',
          email: 'matti@meitsi.fi'
        },
        materials: [
          {
            isWaste: false,
            useTsv: false,
            permanent: false,
            locationIsPublic: true,
            location: {
              name: 'sijainti',
              address: 'alvar aallon katu 5',
              postalCode: '00550',
              city: 'Helsinki',
              cityId: 'M_33',
              region: 'Uusimaa',
              regionId: 'R_1',
              countryCode: 'fi',
              coordinatesPoint: {
                type: 'Point',
                coordinates: [24.93839719204329, 60.176603231267812]
              },
              coordinates: [
                {
                  type: 'WGS84',
                  lon: 24.93839719204329,
                  lat: 60.176603231267812
                },
                {
                  type: 'EUREF_FIN',
                  lon: 385634.467,
                  lat: 6672864.688
                }
              ]
            }
          }
        ],
        materialsWanted: [],
        regions: [
          {
            id: 'R_3',
            nameFi: 'Satakunta',
            nameSv: 'Satakunta'
          }
        ],
        service: {
          serviceIds: ['varastointi'],
          serviceDescription: 'Kuvaus palvelusta - tosi hyvä on.'
        },
        attachments: [
          {
            id: '3c1050cac0334e4f8ff4aca6b01afb22',
            filename: 'dummy-540x960-Bottles.jpg',
            contentType: 'image/jpeg',
            length: 157570,
            url:
              '/api/attachment/fd0e680a-b15f-47d5-a671-b7fdf63b7fb4/3c1050cac0334e4f8ff4aca6b01afb22/dummy-540x960-Bottles.jpg'
          }
        ]
      };

      const regionDataFlat = [
        {
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          type: 'Kaupunki',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [24.93813, 60.16981]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 24.93813,
              lat: 60.16981
            },
            {
              type: 'EUREF_FIN',
              lon: 385596.02595120465,
              lat: 6672108.828002105
            }
          ],
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          regionCoordinates: [
            {
              type: 'WGS84',
              lon: 24.74495,
              lat: 60.28761
            },
            {
              type: 'EUREF_FIN',
              lon: 375328.2692726671,
              lat: 6685573.626630756
            }
          ],
          regionCoordinatesPoint: {
            type: 'Point',
            coordinates: [24.74495, 60.28761]
          },
          configurationType: 'Municipality'
        },
        {
          regionId: 'R_3',
          regionNameFi: 'Satakunta',
          regionNameSv: 'Satakunta',
          coordinatesPoint: {
            type: 'Point',
            coordinates: [22.0944, 61.59148]
          },
          coordinates: [
            {
              type: 'WGS84',
              lon: 22.0944,
              lat: 61.59148
            },
            {
              type: 'EUREF_FIN',
              lon: 239798.52659372473,
              lat: 6838478.377055628
            }
          ],
          configurationType: 'Region'
        }
      ];

      const result = rfoUtils.mapRfoDataToForm(viewData, regionDataFlat);

      const expected = {
        title: 'Test offering services',
        expires: '2019-08-30T21:00:00Z',
        rfoHasExpired: true,
        businessId: 'solita-y',
        type: 'offeringServices',
        contactIsPrivate: false,
        contact_name: 'Matti Meitsiläinen',
        contact_title: 'Toimari',
        contact_phone: '00000000000',
        contact_email: 'matti@meitsi.fi',
        locationIsPrivate: false,
        locationName: 'sijainti',
        locationStreetAddress: 'alvar aallon katu 5',
        locationPostalCode: '00550',
        locationCity: {
          configurationType: 'Municipality',
          coordinates: [
            {
              lat: 60.16981,
              lon: 24.93813,
              type: 'WGS84'
            },
            {
              lat: 6672108.828002105,
              lon: 385596.02595120465,
              type: 'EUREF_FIN'
            }
          ],
          coordinatesPoint: {
            coordinates: [24.93813, 60.16981],
            type: 'Point'
          },
          id: 'M_33',
          nameFi: 'Helsinki',
          nameSv: 'Helsingfors',
          regionCoordinates: [
            {
              lat: 60.28761,
              lon: 24.74495,
              type: 'WGS84'
            },
            {
              lat: 6685573.626630756,
              lon: 375328.2692726671,
              type: 'EUREF_FIN'
            }
          ],
          regionCoordinatesPoint: {
            coordinates: [24.74495, 60.28761],
            type: 'Point'
          },
          regionId: 'R_1',
          regionNameFi: 'Uusimaa',
          regionNameSv: 'Nyland',
          type: 'Kaupunki'
        },
        regions: [
          {
            regionId: 'R_3',
            regionNameFi: 'Satakunta',
            regionNameSv: 'Satakunta',
            coordinatesPoint: {
              type: 'Point',
              coordinates: [22.0944, 61.59148]
            },
            coordinates: [
              {
                type: 'WGS84',
                lon: 22.0944,
                lat: 61.59148
              },
              {
                type: 'EUREF_FIN',
                lon: 239798.52659372473,
                lat: 6838478.377055628
              }
            ],
            configurationType: 'Region'
          }
        ],
        serviceName: 'varastointi',
        subService: [],
        serviceDescription: 'Kuvaus palvelusta - tosi hyvä on.',
        attachments: [
          {
            id: '3c1050cac0334e4f8ff4aca6b01afb22',
            filename: 'dummy-540x960-Bottles.jpg',
            contentType: 'image/jpeg',
            length: 157570,
            url:
              '/api/attachment/fd0e680a-b15f-47d5-a671-b7fdf63b7fb4/3c1050cac0334e4f8ff4aca6b01afb22/dummy-540x960-Bottles.jpg'
          }
        ]
      };

      expect(result).toEqual(expected);
    });
  });

  describe('Is rfo tsv', () => {
    it('should return true if at least one materials has useTsv set true', () => {
      const rfo = {
        materials: [
          {
            useTsv: false
          },
          {
            useTsv: true
          }
        ]
      };

      expect(rfoUtils.isTsv(rfo)).toEqual(true);
    });

    it('should return false if no materials has useTsv set true', () => {
      const rfo = {
        materials: [
          {
            useTsv: false
          },
          {
            useTsv: false
          }
        ]
      };

      expect(rfoUtils.isTsv(rfo)).toEqual(false);
    });

    it('should return false if rfo has no materials', () => {
      const rfo = {};

      expect(rfoUtils.isTsv(rfo)).toEqual(false);
    });
  });

  describe('Has (rfo) id', () => {
    it('should return true for rfo with the right id', () => {
      const rfo = {
        id: 'foo'
      };

      expect(rfoUtils.idEquals(rfo, 'foo')).toEqual(true);
    });

    it('should return false for rfo with wrong id', () => {
      const rfo = {
        id: 'bar'
      };

      expect(rfoUtils.idEquals(rfo, 'foo')).toEqual(false);
    });

    it('should return false for undefined rfo', () => {
      const rfo = undefined;

      expect(rfoUtils.idEquals(rfo, 'foo')).toEqual(false);
    });

    it('should return false for empty rfo', () => {
      const rfo = {};

      expect(rfoUtils.idEquals(rfo, 'foo')).toEqual(false);
    });
  });
});
