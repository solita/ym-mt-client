import cx from 'classnames';
import { find, path, propEq } from 'ramda';
import React from 'react';
import { Trans, withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ILMOITUKSET, LISAA_ILMOITUS, MUOKKAA_ILMOITUS } from '../../routes';
import { filterImageAttachments, nonImageAttachmentList } from '../../utils/attachment-utils';
import { formatDate } from '../../utils/date-utils';
import { splitTextToParagraphsOnLinebreak } from '../../utils/text-utils';
import Accordion from '../Accordion/Accordion';
import OnlyPublicComponent from '../Auth/OnlyPublicComponent';
import PrivateComponent from '../Auth/PrivateComponent';
import Registrations from '../Company/Registrations';
import ImageList from '../ImageList/ImageList';
import InfoBanner from '../InfoBanner/InfoBanner';
import InfoBox from '../InfoBox/InfoBox';
import formStyles from '../Layout/Form.module.css';
import Map from '../Map/Map.js';
import { getEurefCoordinates } from '../RegionSelect/region-utils';
import CloseRfoButton from './CloseRfoButton';
import { LocationFromMaterialFragment, RfoTitleFragment } from './FormFragments';
import styles from './RequestForOffer.module.css';
import { isClosed, isExpired, isTsv, isTSVActive, isWaste } from './rfo-utils';
import RfoOffers from './RfoOffrers';
import RfoTsvRequests from './RfoTsvRequests';
import * as RFO_TYPES from './types';

const View = ({ rfo, isInPreviewMode, viewOnly, t, regionsAndMunicipalities, ewcs, i18n }) => {
  const id = path(['id'])(rfo);
  const { language } = i18n;

  const displayDate = dateStr => {
    if (isNaN(Date.parse(dateStr))) {
      return <span>{t('Päivämäärän esittämisessä tapahtui virhe')}</span>;
    }
    return <span>{formatDate(new Date(dateStr))}</span>;
  };

  const materialQuantity = quantity => (
    <span>
      {quantity.amount} {quantity.unitOfMeasure}
    </span>
  );

  const displayEwcCode = (ewcId, ewcList, lang = 'fi-FI') => {
    const ewc = find(propEq('id', ewcId))(ewcList);
    if (ewc) {
      const localeDisplayValue = lang === 'sv-FI' ? ewc.sv : ewc.fi;
      return `${ewcId} ${localeDisplayValue}`;
    }
    return '-';
  };

  const tsvButton = (rfo, isTsv, isWaste, disabled = false) => {
    if (isTsv && isWaste) {
      return (
        <PrivateComponent belongsToBusiness={rfo.company.businessId}>
          {disabled ? (
            <span className={cx('disabledLink', styles.uppercase)}>
              {t('Pyydä kunnan toissijaista jätehuoltopalvelua')}
            </span>
          ) : (
            <Link
              className={cx('buttonStyle', 'qa-openTsvCreateForm')}
              to={`${ILMOITUKSET}/${rfo.id}/teetsv`}
            >
              {t('Pyydä kunnan toissijaista jätehuoltopalvelua')}
            </Link>
          )}
        </PrivateComponent>
      );
    }
    return null;
  };

  const tsvSection = rfo => {
    const tsvButtonDisabled = rfo.tsvStatus !== 'tsv-allowed';
    if (isTsv(rfo)) {
      return (
        <>
          {tsvButton(rfo, isTsv(rfo), isWaste(rfo), tsvButtonDisabled)}
          <InfoBox
            infoText={
              t(
                'Kyseessä on jätelain (646/2011) 33 §:n mukainen kunnan toissijainen jätehuoltopalvelu, jota jätteen haltijan on mahdollista pyytää muun palvelutarjonnan puuttuessa.\n\nJätelain mukaan jätteen haltija on velvollinen järjestämään jätteen jätehuollon, mikäli jätehuolto ei kuulu kunnan vastuulle tai jäte ole ns. tuottajavastuun alainen. Käytännössä tämä tarkoittaa sitä, että yritysten ja monien julkisten organisaatioiden on järjestettävä useimpien jätteidensä jätehuolto itse markkinoilla olevia jätehuoltopalveluja hyödyntäen.\n\nMikäli markkinoilta ei kuitenkaan löydy tarvittavaa palvelua, on sitä mahdollista pyytää kunnalta, sillä kunta on jätelain mukaan velvollinen järjestämään jätehuollon toissijaisesti myös muulle jätteelle, kuin sille josta se on ensisijaisesti vastuussa. Ensisijaisesti kunta on velvollinen järjestämään pääsääntöisesti asumisessa syntyvän jätteen sekä kunnan hallinto- ja palvelutoiminnassa syntyvän yhdyskuntajätteen jätehuollon. Kunnalla on lisäksi vaarallisen jätteen vastaanottoon ja käsittelyyn liittyviä vastuita.'
              ) +
              '\n\n' +
              t(
                'Kunnan toissijaisen jätehuoltopalvelun edellytyksenä on, että jätteen haltija pyytää sitä yksityisen palveluntarjonnan puutteen vuoksi ja että jäte laadultaan ja määrältään soveltuu kuljetettavaksi tai käsiteltäväksi kunnan jätehuoltojärjestelmässä. Pyynnön voi jätteen haltijan puolesta esittää jätteen kuljettaja tai muu toimija osana tarjoamaansa jätehuoltopalvelua, kun pyyntö koskee jätteen käsittelyä. Pyynnön voi tehdä kolmen (3) kuukauden kuluessa ilmoituksen voimassaolon päättymisestä.'
              )
            }
          />
        </>
      );
    } else {
      return '';
    }
  };

  const offerButton = rfo => {
    const isWasteRfo = isWaste(rfo);

    return (
      <PrivateComponent doesNotBelongToBusiness={rfo.company.businessId}>
        <Link
          className={cx('buttonStyle', 'qa-createOfferBtn')}
          to={`${ILMOITUKSET}/${rfo.id}/teetarjous`}
        >
          {isWasteRfo ? t('Tee tarjous') : t('Vastaa ilmoitukseen')}
        </Link>
      </PrivateComponent>
    );
  };

  const editRfoButton = (rfoId, businessId, useTsv) => {
    return (
      <PrivateComponent belongsToBusiness={businessId}>
        <Link className={cx('buttonStyle', 'qa-editRfoBtn')} to={`${MUOKKAA_ILMOITUS}/${rfoId}`}>
          {t('Muokkaa ilmoitusta')}
        </Link>
        {useTsv && editRfoWarning()}
      </PrivateComponent>
    );
  };

  const editRfoWarning = () => {
    const content = (
      <Trans i18nKey="huomaa_ilmoituksen_muokkaaminen">
        <strong>Huomaa!</strong> Ilmoituksen muokkaaminen voi pidentää ilmoituksen voimassaoloaikaa.
        Muokatun ilmoituksen on oltava julkaistuna ja muokkaamattomana Materiaalitorissa vähintään
        14 vuorokautta, jotta kunnan toissijaista jätehuoltopalvelua on mahdollista pyytää muun
        palvelutarjonnan puuttuessa.
      </Trans>
    );
    return <InfoBanner content={content} small={true} />;
  };

  const copyRfoButton = (rfoId, businessId) => {
    return (
      <PrivateComponent belongsToBusiness={businessId}>
        <Link className={cx('buttonStyle', 'qa-copyRfoBtn')} to={`${LISAA_ILMOITUS}/${rfoId}`}>
          {t('Kopioi uuden pohjaksi')}
        </Link>
      </PrivateComponent>
    );
  };

  const ilmottajaFragment = (rfoData, t) => (
    <>
      <h2>{t('Ilmoittaja')}</h2>
      <OnlyPublicComponent>
        {!path(['contactIsPublic'], rfoData) && (
          <p>{t('Kirjaudu sisään nähdäksesi ilmoittajan tiedot')}</p>
        )}
      </OnlyPublicComponent>
      <div className={styles.detailWrapper}>
        <div className={styles.detailContainerHalf}>
          <p>
            <span>{path(['company', 'name'], rfoData) && rfoData.company.name}</span>
            <br />
            <span>
              {path(['company', 'businessId'])(rfoData) ? t('Y-tunnus') + ':' : ''}{' '}
              {path(['company', 'businessId'])(rfoData)}
            </span>
          </p>
        </div>

        <div className={styles.detailContainerHalf}>
          <p>
            <span>{path(['contact', 'name'], rfoData) && path(['contact', 'name'], rfoData)}</span>
            <br />
            <span>
              {path(['contact', 'title'], rfoData) && path(['contact', 'title'], rfoData)}
            </span>
            <br />
            <span>
              {path(['contact', 'phone'], rfoData) && path(['contact', 'phone'], rfoData)}
            </span>
            <br />
            <span>
              {path(['contact', 'email'], rfoData) && path(['contact', 'email'], rfoData)}
            </span>
          </p>
        </div>
      </div>
    </>
  );

  const getCoordinates = ({ location }) => {
    let coordinates = { id: id };
    if (location.coordinates) {
      const eurefCoordinates = getEurefCoordinates(location.coordinates);
      if (eurefCoordinates.lat) {
        coordinates.lat = eurefCoordinates.lat;
        coordinates.lon = eurefCoordinates.lon;
      } else if (
        !eurefCoordinates.lat &&
        location.cityId &&
        Array.isArray(regionsAndMunicipalities)
      ) {
        const municipality = regionsAndMunicipalities.filter(f => f.id === location.cityId);
        if (municipality.length > 0) {
          const municipalityEurefCoordinates = getEurefCoordinates(municipality[0].coordinates);
          coordinates.lat = municipalityEurefCoordinates.lat;
          coordinates.lon = municipalityEurefCoordinates.lon;
        }
      }
    }
    return coordinates;
  };

  const getRegionCoordinates = regions => {
    const regionsWithCoords = regions.map(r =>
      regionsAndMunicipalities.find(f => f.id === r.id || f.regionId === r.id)
    );
    const coordinates = regionsWithCoords.map(r => getEurefCoordinates(r.coordinates));
    return coordinates;
  };

  const renderRfo = (rfoData, isInPreviewMode) => {
    switch (rfoData.rfoType) {
      case RFO_TYPES.RFO_OFFERING_WASTE: {
        const [material] = rfoData.materials;
        const { service } = material;

        const coordinateMarker = getCoordinates(material);

        return (
          <div className={viewOnly ? 'embeddedLiftup' : undefined}>
            <RfoTitleFragment
              t={t}
              rfo={rfoData}
              classnameForClosed={styles.smallerGreenSidemark}
            />
            <h3>
              {path(['company', 'name'], rfoData) && rfoData.company.name} |{' '}
              {t(rfo.rfoType + '-title')}
            </h3>
            <div className={'divider'} />
            <Accordion
              hideByDefault={true}
              showText={t('Näytä koko ilmoitus')}
              hideText={t('Pienennä ilmoitus')}
              viewOnly={viewOnly}
            >
              <div className={styles.mainDescription}>
                {splitTextToParagraphsOnLinebreak(material.description)}
              </div>

              <div className={styles.detailWrapper}>
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Luokittelu')}</h2>

                  <p>
                    {t('Jäte')}: {t(material.classification)}
                  </p>
                  <p>
                    <strong>{t('Euroopan jäteluettelon koodi eli jätenimike')}</strong>
                  </p>
                  <p>{displayEwcCode(material.ewcCode, ewcs, language)}</p>
                  <p>
                    <strong>{t('Jätteen vaarallisuus')}</strong>
                  </p>
                  <p>
                    {material.type === 'dangerous' ? t('Vaarallinen jäte') : t('Vaaraton jäte')}
                  </p>
                  <p>{material.permanent && t('Pysyvä jäte')}</p>
                  <p>
                    <strong>{t('Toimiala, jossa jäte syntyy')}</strong>
                  </p>
                  <p>{t(material.industry)}</p>
                </div>
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Määrä')}</h2>
                  <p>
                    {materialQuantity(material.quantity)}{' '}
                    <span>
                      {material.continuity === 'onetime' ? t('Kertaerä') : t('Jatkuva tuotanto')}
                    </span>
                  </p>
                  {material.amountDescription && (
                    <>
                      <p>
                        <strong>{t('Lisätietoja määrästä')}</strong>
                      </p>
                      {splitTextToParagraphsOnLinebreak(material.amountDescription)}
                    </>
                  )}
                </div>

                {/* <div className={styles.detailContainerHalf}>
                <h2>{t('TSV')}</h2>
                <p>
                  {material.useTsv
                    ? t('Jäte menee TSV-prosessiin mikäli vastaanottajaa ei löydy')
                    : t('Jäte ei mene TSV-prosessiin')}
                </p>
              </div> */}
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Haettava palvelu')}</h2>
                  <p>
                    <strong>{t('Palvelu')}</strong>
                  </p>
                  <p>
                    {service.serviceIds &&
                      service.serviceIds.map(serviceId => t(serviceId)).join(', ')}
                  </p>
                  <p>
                    <strong>{t('Haettavan palvelun kuvaus')}</strong>
                  </p>
                  {splitTextToParagraphsOnLinebreak(service.requirements)}
                  <p>
                    <strong>{t('Palvelun toivottu ajankohta')}</strong>
                  </p>
                  {splitTextToParagraphsOnLinebreak(service.duration)}
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Ilmoitus voimassa')}</h2>
                  <p>{displayDate(rfoData.expires)}</p>
                  {rfoData.created && (
                    <>
                      <h2>{t('Ilmoitus luotu')}</h2>
                      <p>{displayDate(rfoData.created)}</p>
                    </>
                  )}
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Liitteet')}</h2>
                  {(!rfoData.attachments ||
                    (rfoData.attachments && rfoData.attachments.length === 0)) &&
                    t('Ei liitteitä')}
                  {rfoData.attachments &&
                    rfoData.attachments.length > 0 &&
                    nonImageAttachmentList(rfoData.attachments)}
                </div>
              </div>

              <ImageList
                images={filterImageAttachments(rfoData.attachments)}
                willNotLoad={isInPreviewMode}
              />

              <div className={'divider'} />

              <div>
                <h2>{t('Jätteen sijainti')}</h2>
                <p>
                  <LocationFromMaterialFragment material={material} />
                </p>
                <div className={formStyles.formRow} style={{ width: '100%', height: '20em' }}>
                  <Map
                    mapState={{
                      markers: [coordinateMarker],
                      searchTerm: ''
                    }}
                    onSearchResult={() => void 0}
                    onMarkerDraw={() => void 0}
                  />
                </div>
              </div>

              <div className={'divider'} />

              {ilmottajaFragment(rfoData, t)}
            </Accordion>
          </div>
        );
      }

      case RFO_TYPES.RFO_OFFERING_MATERIAL: {
        const [material] = rfoData.materials;
        const coordinateMarker = getCoordinates(material);
        return (
          <div className={viewOnly ? 'embeddedLiftup' : undefined}>
            <RfoTitleFragment
              t={t}
              rfo={rfoData}
              classnameForClosed={styles.smallerGreenSidemark}
            />
            <h3>
              {path(['company', 'name'], rfoData) && rfoData.company.name} |{' '}
              {t(rfo.rfoType + '-title')}
            </h3>

            <div className={'divider'} />

            <Accordion
              hideByDefault={true}
              showText={t('Näytä koko ilmoitus')}
              hideText={t('Pienennä ilmoitus')}
              viewOnly={viewOnly}
            >
              <div className={styles.mainDescription}>
                {splitTextToParagraphsOnLinebreak(material.description)}
              </div>

              <div className={styles.detailWrapper}>
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Luokittelu')}</h2>
                  <p>
                    {t('Materiaali')}: {t(material.classification)}
                  </p>
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Määrä')}</h2>
                  <p>
                    {materialQuantity(material.quantity)}{' '}
                    <span>
                      {material.continuity === 'onetime' ? t('Kertaerä') : t('Jatkuva tuotanto')}
                    </span>
                  </p>
                  {material.amountDescription && (
                    <>
                      <p>
                        <strong>{t('Tarkennukset määrään')}</strong>
                      </p>
                      {splitTextToParagraphsOnLinebreak(material.amountDescription)}
                    </>
                  )}
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Voimassa')}</h2>
                  <p>{displayDate(rfoData.expires)}</p>
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Liitteet')}</h2>
                  {(!rfoData.attachments ||
                    (rfoData.attachments && rfoData.attachments.length === 0)) &&
                    t('Ei liitteitä')}
                  {rfoData.attachments &&
                    rfoData.attachments.length > 0 &&
                    nonImageAttachmentList(rfoData.attachments)}
                </div>
              </div>

              <ImageList
                images={filterImageAttachments(rfoData.attachments)}
                willNotLoad={isInPreviewMode}
              />

              <div className={'divider'} />

              <div>
                <h2>{t('Materiaalin sijainti')}</h2>
                <p>
                  <LocationFromMaterialFragment material={material} />
                </p>
                <div className={formStyles.formRow} style={{ width: '100%', height: '20em' }}>
                  <Map
                    mapState={{
                      markers: [coordinateMarker],
                      searchTerm: ''
                    }}
                    onSearchResult={() => void 0}
                    onMarkerDraw={() => void 0}
                  />
                </div>
              </div>

              <div className={'divider'} />

              {ilmottajaFragment(rfoData, t)}
            </Accordion>
          </div>
        );
      }

      case RFO_TYPES.RFO_RECEIVING_MATERIAL: {
        const [material] = rfoData.materialsWanted;
        const markerCoordinates =
          rfoData.regions && regionsAndMunicipalities && regionsAndMunicipalities.length
            ? getRegionCoordinates(rfoData.regions.filter(r => r.id[0] === 'M'))
            : [];

        const regionFeatures = rfoData.regions ? rfoData.regions.filter(r => r.id[0] === 'R') : [];

        return (
          <div className={viewOnly ? 'embeddedLiftup' : undefined}>
            <RfoTitleFragment
              t={t}
              rfo={rfoData}
              classnameForClosed={styles.smallerGreenSidemark}
            />
            <h3>
              {path(['company', 'name'], rfoData) && rfoData.company.name} |{' '}
              {t(rfo.rfoType + '-title')}
            </h3>
            <div className={'divider'} />
            <Accordion
              showText={t('Näytä koko ilmoitus')}
              hideText={t('Pienennä ilmoitus')}
              viewOnly={viewOnly}
              hideByDefault="true"
            >
              <div className={styles.mainDescription}>
                {splitTextToParagraphsOnLinebreak(material.description)}
              </div>

              {/* Tiedot */}
              <div className={styles.detailWrapper}>
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Luokittelu')}</h2>

                  <p>
                    {t('Materiaali')}: {t(material.classification)}
                  </p>
                </div>
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Voimassa')}</h2>
                  <p>{displayDate(rfoData.expires)}</p>
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Sijainti')}</h2>
                  <p>
                    {rfoData.regions &&
                      rfoData.regions
                        .map(region => {
                          return region.nameFi;
                        })
                        .join(', ')}
                  </p>
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Liitteet')}</h2>
                  {(!rfoData.attachments ||
                    (rfoData.attachments && rfoData.attachments.length === 0)) &&
                    t('Ei liitteitä')}
                  {rfoData.attachments &&
                    rfoData.attachments.length > 0 &&
                    nonImageAttachmentList(rfoData.attachments)}
                </div>

                {(markerCoordinates.length > 0 || regionFeatures.length > 0) && (
                  <div
                    className={formStyles.formRow}
                    style={{
                      width: '100%',
                      height: regionFeatures.length ? '40em' : '20em',
                      maxHeight: '70vh'
                    }}
                  >
                    <Map
                      regionFeatures={regionFeatures}
                      mapState={{
                        markers: markerCoordinates,
                        searchTerm: ''
                      }}
                      onSearchResult={() => void 0}
                      onMarkerDraw={() => void 0}
                    />
                  </div>
                )}
              </div>

              <ImageList
                images={filterImageAttachments(rfoData.attachments)}
                willNotLoad={isInPreviewMode}
              />

              <div className={'divider'} />

              {ilmottajaFragment(rfoData, t)}

              {!isInPreviewMode && rfo && rfo.company && (
                <PrivateComponent>
                  <Registrations
                    businessId={rfo.company.businessId}
                    title={t(
                      'Ilmoittajan jätteen vastaanottoon liittyvät luvat tai rekisterimerkinnät'
                    )}
                  />
                </PrivateComponent>
              )}
            </Accordion>
          </div>
        );
      }

      case RFO_TYPES.RFO_OFFERING_SERVICES: {
        const [material] = rfoData.materials;
        const markerCoordinates =
          rfoData.regions && regionsAndMunicipalities && regionsAndMunicipalities.length
            ? getRegionCoordinates(rfoData.regions.filter(r => r.id[0] === 'M'))
            : [];

        const regionFeatures = rfoData.regions ? rfoData.regions.filter(r => r.id[0] === 'R') : [];

        return (
          <div className={viewOnly ? 'embeddedLiftup' : undefined}>
            <RfoTitleFragment
              t={t}
              rfo={rfoData}
              classnameForClosed={styles.smallerGreenSidemark}
            />
            <h3>
              {path(['company', 'name'], rfoData) && rfoData.company.name} |{' '}
              {t(rfo.rfoType + '-title')}
            </h3>

            <div className={'divider'} />
            <Accordion
              showText={t('Näytä koko ilmoitus')}
              hideText={t('Pienennä ilmoitus')}
              viewOnly={viewOnly}
            >
              <div className={styles.mainDescription}>
                {rfoData.service &&
                  rfoData.service.serviceDescription &&
                  splitTextToParagraphsOnLinebreak(rfoData.service.serviceDescription)}
              </div>

              <div className={styles.detailWrapper}>
                <div className={styles.detailContainerHalf}>
                  <h2>{t('Tarjottu palvelu')}</h2>
                  {path(['service', 'serviceIds'], rfoData) &&
                    path(['service', 'serviceIds'], rfoData).map((serviceId, idx) => {
                      return <p key={idx}>{t(serviceId)}</p>;
                    })}
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Voimassa')}</h2>
                  <p>{displayDate(rfoData.expires)}</p>
                </div>

                <div className={styles.detailContainerHalf}>
                  <h2>{t('Liitteet')}</h2>
                  {(!rfoData.attachments ||
                    (rfoData.attachments && rfoData.attachments.length === 0)) &&
                    t('Ei liitteitä')}
                  {rfoData.attachments &&
                    rfoData.attachments.length > 0 &&
                    nonImageAttachmentList(rfoData.attachments)}
                </div>
              </div>

              <ImageList
                images={filterImageAttachments(rfoData.attachments)}
                willNotLoad={isInPreviewMode}
              />

              <div className={styles.divider} />

              <div>
                <h2>{t('Sijainti')}</h2>
                <p>
                  {rfoData.regions &&
                    rfoData.regions
                      .map(region => {
                        return region.nameFi;
                      })
                      .join(', ')}
                </p>
                <p>
                  <LocationFromMaterialFragment material={material} />
                </p>
                {(markerCoordinates.length > 0 || regionFeatures.length > 0) && (
                  <div
                    className={formStyles.formRow}
                    style={{
                      width: '100%',
                      height: regionFeatures.length ? '40em' : '20em',
                      maxHeight: '70vh'
                    }}
                  >
                    <Map
                      regionFeatures={regionFeatures}
                      mapState={{
                        markers: markerCoordinates,
                        searchTerm: ''
                      }}
                      onSearchResult={() => void 0}
                      onMarkerDraw={() => void 0}
                    />
                  </div>
                )}
              </div>

              <div className={styles.divider} />

              {ilmottajaFragment(rfoData, t)}

              {!isInPreviewMode && rfo && rfo.company && (
                <PrivateComponent>
                  <Registrations
                    businessId={rfo.company.businessId}
                    title={t(
                      'Ilmoittajan jätteen vastaanottoon liittyvät luvat tai rekisterimerkinnät'
                    )}
                  />
                </PrivateComponent>
              )}
            </Accordion>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const actionButtons = (t, rfo) => {
    const notExpired = !isExpired(rfo);
    const tsvActive = isTSVActive(rfo);
    const [material] = rfo.materials;
    const businessId = path(['company', 'businessId'])(rfo);

    return (
      <div className={styles.buttonWrap}>
        {notExpired && !tsvActive && offerButton(rfo)}
        {!tsvActive && editRfoButton(id, businessId, path(['useTsv'])(material))}
        {copyRfoButton(id, businessId)}
        <CloseRfoButton
          t={t}
          rfoId={path(['id'])(rfo)}
          rfoBusinessId={path(['company', 'businessId'])(rfo)}
        />
        <PrivateComponent belongsToBusiness={rfo.company.businessId}>
          {tsvSection(rfo)}
        </PrivateComponent>
      </div>
    );
  };

  return (
    <>
      {rfo && renderRfo(rfo, isInPreviewMode)}
      {!viewOnly && !isInPreviewMode && !isClosed(rfo) && actionButtons(t, rfo)}
      {!viewOnly && !isInPreviewMode && rfo && (
        <PrivateComponent>
          <RfoOffers rfo={rfo} />
          <RfoTsvRequests rfo={rfo} />
        </PrivateComponent>
      )}
    </>
  );
};

export default withNamespaces()(View);
