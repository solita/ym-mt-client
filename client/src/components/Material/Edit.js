import cx from 'classnames';
import React from 'react';
import { Trans, withNamespaces } from 'react-i18next';
import { regExpForNumberWithUnlimitedDecimals } from '../../utils/text-utils';
import InfoBox from '../InfoBox/InfoBox';
import formStyles from '../Layout/Form.module.css';
import { Col, Row } from '../Layout/Layout';
import Select from '../Select/Select';
import IndustryOptionList from './IndustryOptionList';
import MaterialOptionList from './MaterialOptionList';
import UnitOptionList from './UnitOptionList';

const QuanityUnitField = React.memo(({ t, material, handleMaterialChange, isWaste = false }) => (
  <>
    <label>
      <span className={formStyles.defaultLabelSpan}>{t('Määrän yksikkö')}</span>{' '}
      <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
      <select
        name="quantityUnit"
        value={material.quantityUnit || ''}
        onChange={handleMaterialChange}
      >
        <option value="" disabled hidden>
          {t('Valitse yksikkö')}
        </option>
        <UnitOptionList t={t} />
      </select>
    </label>
  </>
));

const searchEwcFn = t => searchString => value => {
  const ss = searchString.toLowerCase();
  return (
    value.id.toLowerCase().indexOf(ss) > -1 ||
    value.id
      .split(' ')
      .join('')
      .toLowerCase()
      .indexOf(ss) > -1 ||
    value.fi.toLowerCase().indexOf(ss) > -1 ||
    value.sv.toLowerCase().indexOf(ss) > -1
  );
};

const SingleWasteEdit = React.memo(({ t, material, ewcs, handleMaterialChange, i18n }) => {
  const displayFn = lang => value => {
    const localeDisplayValue = lang === 'sv-FI' ? value.sv : value.fi;
    return `[${value.id}] ${localeDisplayValue}`;
  };

  return (
    <>
      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Jäte')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
              <InfoBox
                infoText={
                  <Trans i18nKey="jateilmoituksen_luontisivun_jate">
                    Jätteen lajia tai materiaalityppiä mahdollisimman hyvin kuvaava termi. Valmiiden
                    ilmoitusten hakua voi rajata tämän jätteen luokittelun perusteella.
                    <br />
                    <br />
                    Voit valita vain yhden jätteen yhteen ilmoitukseen. Mikäli teet ilmoituksen
                    sekalaisesta jätteestä, määrittele jätteen tarkempi koostumus vapaamuotoisessa
                    ”Jätteen kuvaus” –kohdassa.
                    <br />
                    <br />
                    Huom!
                    <br />
                    <br />
                    Tuottajavastuun alaiset jätteet (renkaat, ajoneuvot, sähkö- ja
                    elektroniikkalaitteet, paristot ja akut, paperi, pakkaukset) tulee toimittaa
                    pääsääntöisesti tuottajan hyväksymään vastaanottoon.
                    <br />
                    <br />
                    Asumisessa sekä kunnan hallinto- ja palvelutoiminnassa syntyvät
                    yhdyskuntajätteet kuuluvat kunnan vastuulle, jolloin kunta järjestää kyseisten
                    jätteiden jätehuollon.
                    <br />
                    <br />
                    Lisätietoja jätehuollon vastuista
                    <br />
                    <a href="https://www.ymparisto.fi/fi-FI/Kulutus_ja_tuotanto/Jatteet_ja_jatehuolto/Jatehuollon_vastuut_ja_jarjestaminen">
                      https://www.ymparisto.fi/fi-FI/Kulutus_ja_tuotanto/Jatteet_ja_jatehuolto/Jatehuollon_vastuut_ja_jarjestaminen
                    </a>
                    .
                  </Trans>
                }
              />{' '}
            </span>
            <select
              name="classification"
              value={material.classification || ''}
              onChange={handleMaterialChange}
            >
              <option value="" disabled hidden>
                {t('Valitse jäte')}
              </option>
              <MaterialOptionList includeWaste={true} />
            </select>
          </label>
        </Col>
      </Row>
      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>{t('Toimiala, jossa jäte syntyy')}</span>{' '}
            <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
            <select name="industry" value={material.industry || ''} onChange={handleMaterialChange}>
              <option value="" disabled hidden>
                {t('Valitse toimiala')}
              </option>
              <IndustryOptionList />
            </select>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Euroopan jäteluettelon koodi eli jätenimike')}{' '}
              <InfoBox
                infoText={t(
                  'Jäteasetuksen (179/2012) liitteen 4 jäteluettelon mukainen kuusinumeroinen jätekoodi. Kutsutaan myös EWC-koodiksi (European Waste Catalog) tai LoW-koodiksi (List of Waste).\n\nJätenimike on suositeltavaa antaa, mikäli se on tiedossa.'
                )}
              />
            </span>
          </label>
          <Select
            values={ewcs}
            onAdd={val =>
              handleMaterialChange({ target: { value: val.id, name: 'ewcCode', type: 'custom' } })
            }
            single={true}
            value={ewcs.filter(f => f.id === material.ewcCode)}
            displayFn={displayFn(i18n.language)}
            searchFn={searchEwcFn()}
            keyFn={val => val.id}
            showAllOnFocus={true}
            noSelectFn={ewc => ewc.id.length < 6}
            onRemove={() => {
              handleMaterialChange({ target: { value: '', name: 'ewcCode', type: 'custom' } });
            }}
          />
        </Col>
      </Row>
      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Jätteen vaarallisuus')}{' '}
              <InfoBox
                infoText={t(
                  'Vaarallisella jätteellä tarkoitetaan jätettä, jolla on palo- tai räjähdysvaarallinen, tartuntavaarallinen, muu terveydelle vaarallinen, ympäristölle vaarallinen tai muu vastaava ominaisuus (vaaraominaisuus).\n\nVaarattomalla jätteellä tarkoitetaan jätettä, jolla ei ole vaaraominaisuuksia. Vaaratonta jätettä on kutsuttu myös tavanomaiseksi jätteeksi.\n\nJätedirektiivin liitteessä III, joka on annettu komission asetuksella (EU) N:o 1357/2014, on lueteltu ominaisuudet, jotka tekevät jätteistä vaarallisia, sekä kyseisten ominaisuuksien arvioinnissa käytettävät kriteerit. Jäte on vaarallista, jos sillä on yksikin komission asetuksessa määritelty vaaraominaisuus. Vaaralliset jätteet on jäteasetuksen liitteen 4 jäteluettelossa merkitty tähdellä (*). Lisätietoja luokittelemisesta vaaraominaisuuksien perusteella saa Suomen ympäristökeskuksen julkaisemasta ”Jätteen luokittelu vaaralliseksi jätteeksi” –oppaasta.'
                )}
              />
            </span>

            <select name="type" value={material.type || ''} onChange={handleMaterialChange}>
              <option value="" disabled hidden>
                {t('Valitse tyyppi')}
              </option>
              <option value="dangerous">{t('Vaarallinen jäte')}</option>
              <option value="nondangerous">{t('Vaaraton jäte')}</option>
              <option value="unknown">{t('Ei tiedossa')}</option>
            </select>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Jätteen kuvaus')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
              <InfoBox
                infoText={t(
                  'Jätteen alkuperä, koostumus, olomuoto (kiinteä, neste, liete, kaasu), tiedot mahdollisista epäpuhtauksista ja tarkennukset vaaraominaisuuksista tai muita jätteen vastaanottajan löytämisen kannalta oleellisia tietoja jätteestä.'
                )}
              />
            </span>
            <textarea
              name="description"
              type="text"
              rows={6}
              value={material.description || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
      </Row>

      <h2>{t('Jätteen määrä ja toistuvuus')}</h2>
      <p>
        <strong>
          {t('Kertaerä vai jatkuvasti syntyvä jäte')}{' '}
          <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
          <InfoBox
            infoText={t(
              'Ilmoita yksittäinen jäte-erä tai jatkuvasti syntyvä jäte, mikäli jätettä syntyy toistuvasti pidemmällä aikavälillä ja tavoitteenasi on pidempiaikainen sopimus palvelusta.'
            )}
          />
        </strong>
      </p>
      <Row className={cx(formStyles.formRow)}>
        <Col span={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <input
              checked={material.continuity === 'onetime'}
              type="radio"
              name="continuity"
              value="onetime"
              onChange={handleMaterialChange}
            />
            <span className={formStyles.labelSpanAfterCheckbox}>{t('Kertaerä')}</span>
          </label>
        </Col>
      </Row>
      <Row className={cx(formStyles.formRow)}>
        <Col span={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <input
              type="radio"
              name="continuity"
              value="continuous"
              checked={material.continuity === 'continuous'}
              onChange={handleMaterialChange}
            />
            <span className={formStyles.labelSpanAfterCheckbox}>
              {t('Jatkuvasti syntyvä jäte')}
            </span>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            {material.continuity === 'continuous' ? (
              <span className={formStyles.defaultLabelSpan}>
                {t('Arvio jätteen kokonaismäärästä vuodessa')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
              </span>
            ) : (
              <span className={formStyles.defaultLabelSpan}>
                {t('Arvio jätteen määrästä')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
              </span>
            )}
            <input
              name="quantityAmount"
              type="text"
              pattern={regExpForNumberWithUnlimitedDecimals}
              placeholder="0"
              value={material.quantityAmount || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <QuanityUnitField
            t={t}
            material={material}
            handleMaterialChange={handleMaterialChange}
            isWaste={true}
          />
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Lisätietoja määrästä')}
              <InfoBox
                infoText={t(
                  'Yksittäisten jäte-erien määrä, koko ja toistuvuus tai muita tarkennettavia tietoja jätteen määrästä tai palveluntarpeen toistuvuudesta, jotka voivat olla jätteen vastaanottajan löytämisen kannalta oleellisia.'
                )}
              />
            </span>

            <textarea
              name="amountDescription"
              type="text"
              rows={6}
              value={material.amountDescription || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
      </Row>
    </>
  );
});

const SingleMaterialEdit = React.memo(({ t, material, handleMaterialChange }) => {
  return (
    <>
      <Row className={cx(formStyles.formRow)}>
        <Col span={5} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Materiaali')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
              <InfoBox
                infoText={t(
                  'Materiaalia mahdollisimman hyvin kuvaava termi. Valmiiden ilmoitusten hakua voi rajata tämän luokittelun perusteella. Voit valita vain yhden materiaalin yhteen ilmoitukseen.'
                )}
              />
            </span>
            <select
              name="classification"
              value={material.classification || ''}
              onChange={handleMaterialChange}
            >
              <option value="" disabled hidden>
                {t('Valitse materiaali')}
              </option>
              <MaterialOptionList includeMaterials={true} />
            </select>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Toimiala, jossa materiaali syntyy')}{' '}
              <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
            </span>
            <select name="industry" value={material.industry || ''} onChange={handleMaterialChange}>
              <option value="" disabled hidden>
                {t('Valitse toimiala')}
              </option>
              <IndustryOptionList />
            </select>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Materiaalin kuvaus')}{' '}
              <InfoBox
                infoText={t(
                  'Materiaalin koostumus tai muu hyödyntämisen kannalta olennainen tieto materiaalin ominaisuuksista.'
                )}
              />
            </span>

            <textarea
              name="description"
              type="text"
              rows={6}
              value={material.description || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
      </Row>

      <h2>{t('Materiaalin määrä ja toistuvuus')}</h2>
      <p>
        <strong>{t('Kertaerä vai jatkuvasti syntyvä materiaali')}</strong>{' '}
        <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
      </p>
      <Row className={cx(formStyles.formRow)}>
        <Col span={12} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <input
              checked={material.continuity === 'onetime'}
              type="radio"
              name="continuity"
              value="onetime"
              onChange={handleMaterialChange}
            />
            <span className={formStyles.labelSpanAfterCheckbox}>{t('Kertaerä')}</span>
          </label>
        </Col>
      </Row>
      <Row className={formStyles.formRow}>
        <Col span={12} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <input
              type="radio"
              name="continuity"
              value="continuous"
              checked={material.continuity === 'continuous'}
              onChange={handleMaterialChange}
            />
            <span className={formStyles.labelSpanAfterCheckbox}>
              {t('Jatkuvasti syntyvä materiaali')}
            </span>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            {material.continuity === 'continuous' ? (
              <span className={formStyles.defaultLabelSpan}>
                {t('Arvio materiaalin kokonaismäärästä vuodessa')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
              </span>
            ) : (
              <span className={formStyles.defaultLabelSpan}>
                {t('Arvio materiaalin määrästä')}{' '}
                <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>
              </span>
            )}

            <input
              name="quantityAmount"
              type="text"
              pattern={regExpForNumberWithUnlimitedDecimals}
              placeholder="0"
              value={material.quantityAmount || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <QuanityUnitField t={t} material={material} handleMaterialChange={handleMaterialChange} />
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={12} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Lisätietoja määrästä')}
              <InfoBox
                infoText={t(
                  'Yksittäisten materiaalierien määrä, koko, toistuvuus ja saatavuus tai muita tarkennettavia tietoja materiaalin määrästä tai toistuvuudesta, jotka voivat olla hyödyntämisen kannalta oleellisia.'
                )}
              />
            </span>

            <textarea
              name="amountDescription"
              type="text"
              rows={6}
              value={material.amountDescription || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
      </Row>
    </>
  );
});

const SingleReceiveMaterialEdit = React.memo(({ t, material, handleMaterialChange }) => {
  return (
    <>
      <Row className={cx(formStyles.formRow)}>
        <Col span={6} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Materiaali')} <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
              <InfoBox
                infoText={t(
                  'Etsittävää materiaalia mahdollisimman hyvin kuvaava termi. Valmiiden ilmoitusten hakua voi rajata tämän luokittelun perusteella. Voit valita vain yhdenmateriaalin yhteen ilmoitukseen.'
                )}
              />
            </span>
            <select
              name="classification"
              value={material.classification || ''}
              onChange={handleMaterialChange}
            >
              <option value="" disabled hidden>
                {t('Valitse haettava materiaali')}
              </option>
              <MaterialOptionList includeMaterials={true} includeWaste={true} />
            </select>
          </label>
        </Col>
      </Row>

      <Row className={cx(formStyles.formRow)}>
        <Col span={12} sm={12} xs={12} className={cx(formStyles.formInputContainer)}>
          <label>
            <span className={formStyles.defaultLabelSpan}>
              {t('Materiaalin ja tarpeen kuvaus')}{' '}
              <span className={'requiredIndicator'}>{t('(pakollinen)')}</span>{' '}
              <InfoBox
                infoText={t(
                  'Hyödyntämisen kannalta olennaiset edellytykset materiaaliin ja sen ominaisuuksiin liittyen. Voit lisäksi kuvata, miten aiot materiaalia hyödyntää. Voit myös, kertoa miten suurta määrää haet, ja onko kyse jatkuvasta vai kertatarpeesta.'
                )}
              />
            </span>
            <textarea
              name="description"
              type="text"
              rows={6}
              value={material.description || ''}
              onChange={handleMaterialChange}
            />
          </label>
        </Col>
      </Row>
    </>
  );
});

const SingleWasteEditWithTranslation = withNamespaces()(SingleWasteEdit);
const SingleMaterialEditWithTranslation = withNamespaces()(SingleMaterialEdit);
const SingleReceiveMaterialEditWithTranslation = withNamespaces()(SingleReceiveMaterialEdit);

export {
  SingleMaterialEditWithTranslation as SingleMaterialEdit,
  SingleWasteEditWithTranslation as SingleWasteEdit,
  SingleReceiveMaterialEditWithTranslation as SingleReceiveMaterialEdit
};
