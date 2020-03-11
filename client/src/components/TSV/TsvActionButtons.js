import cx from 'classnames';
import { path } from 'ramda';
import { Component, default as React } from 'react';
import { Trans, withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TSV_SOPIMUSLUONNOKSET } from '../../routes';
import PrivateComponent from '../Auth/PrivateComponent';
import InfoBox from '../InfoBox/InfoBox';
import { strongAuthButton } from './tsv-helpers';
import { rejectReasonTranslated, tsvCanBeCancelled, tsvStateIsWaiting } from './tsv-utils';
import styles from './Tsv.module.css';
import {
  TSV_REJECT_REASON_FACILITY_HAS_NO_CAPACITY,
  TSV_REJECT_REASON_OTHER,
  TSV_REJECT_REASON_WASTE_IS_UNSUITABLE
} from './types';

const initialButtonsLevel = (t, setIsRejecting, tsv, disableButtons, cancelTsv) => {
  let tsvId = path(['id'], tsv);

  return (
    <div>
      <PrivateComponent belongsToBusiness={path(['rfo', 'businessId'], tsv)}>
        {tsvCanBeCancelled(tsv) && (
          <button
            className={cx(
              'buttonStyle',
              'qa-cancelTsvRequest',
              styles.marginRight2em,
              styles.marginBottom2em
            )}
            type="button"
            disabled={disableButtons}
            onClick={cancelTsv}
          >
            {t('Peru pyyntö')}
          </button>
        )}
      </PrivateComponent>
      {tsvStateIsWaiting(tsv) && (
        <PrivateComponent
          isMunicipalWasteManagement={true}
          belongsToBusiness={path(['tsvFacility', 'businessId'], tsv)}
        >
          <PrivateComponent
            requireStrongAuth={true}
            renderInstead={strongAuthButton(t('Tunnistaudu vahvasti käsitelläksesi pyyntöä'))}
          >
            <>
              <button
                className={cx(styles.marginRight2em, styles.marginBottom2em)}
                type="button"
                onClick={setIsRejecting}
              >
                {t('Hylkää')}
              </button>
              <Link
                className={cx(
                  'buttonStyle',
                  'qa-openTsvContractDraftCreateForm',
                  styles.marginRight2em,
                  styles.marginBottom2em,
                  styles.greenBackground
                )}
                to={`${TSV_SOPIMUSLUONNOKSET}/${tsvId}/teeluonnos`}
              >
                {t('Tee sopimus Materiaalitorissa')}
              </Link>
              <Link
                className={cx(
                  'buttonStyle',
                  styles.marginRight2em,
                  styles.marginBottom2em,
                  styles.greenBackground
                )}
                to={`${TSV_SOPIMUSLUONNOKSET}/${tsvId}/teeluonnos?tuosopimus=true`}
              >
                {t('Tuo tiedot tehdystä sopimuksesta')}
              </Link>
              <InfoBox
                infoText={
                  <Trans i18nKey="tsv_pyynnon_katselusivun_painikkeiden_ohje">
                    Kunnan jätelaitoksen on mahdollista kieltäytyä palvelun tarjoamisesta, mikäli
                    jäte ei määrältään tai laadultaan sovellu teknisesti kunnan
                    jätehuoltojärjestelmään tai kunnalla ei ole tarvittavaa kapasiteettia jätteen
                    vastaanottamiseksi. Tällaisessa tapauksessa pyyntö tulee hylätä ja lisätä
                    perustelut hylkäämiselle. Pyynnön hylkäämiseen tyytymätön on tarvittaessa
                    ohjattava viemään asiaan kunnan jätehuoltoviranomaisen ratkaistavaksi.
                    <br />
                    <br />
                    Jätelain 33 §:n mukaan kunnan on tehtävä jätteen haltijan kanssa kunnan
                    toissijaisesta jätehuoltopalvelusta sopimus silloin, kun palvelun arvo on
                    vähintään 2000 euroa vuodessa. Sopimusosapuolia ovat kunnan jätelaitos ja
                    palvelua pyytävä jätteen haltija taikka tälle jätelain mukaisesti
                    jätehuoltopalvelua tarjoava yritys. Sopimuksen kesto voi olla enintään kolme
                    vuotta kerrallaan ja osapuolet voivat irtisanoa sopimuksessa määritellyn
                    irtisanomisajan kuluttua.
                    <br />
                    <br />
                    Sopimus voidaan tehdä suoraan Materialitorissa hyödyntämällä valmista
                    sopimuspohjaa valitsemalla ”Tee sopimus Materiaalitorissa”. Tällöin sopimuspohja
                    aukeaa täytettäväksi. Lopuksi sopimusluonnos ja tieto pyynnön hyväksymisestä
                    lähtee pyytäjälle. Sopimus tulee voimaan, kun pyynnön tekijä hyväksyy
                    sopimuksen.
                    <br />
                    <br />
                    Vaihtoehtoisesti sopimuksen voi tehdä Materiaalitorin ulkopuolella. Sopimuksessa
                    on oltava tiedot sopimusosapuolista, jätteestä ja sen sijainnista sekä
                    palvelusta ja sen hinnasta.
                    <strong>
                      Nämä tiedot on tuotava Materiaalitoriin viimeistään 14 vuorokauden kuluttua
                      sopimuksen tekemisestä.
                    </strong>
                    Tiedot tuodaan valitsemalla ”Tuo tiedot tehdyistä sopimuksista”.
                  </Trans>
                }
              />
            </>
          </PrivateComponent>
        </PrivateComponent>
      )}
    </div>
  );
};

const isRejecting = (t, viewForm, handleViewFormChange, rejectTsv, setIsNotRejecting, loading) => {
  const showOtherReasonOfRejectTextBox = viewForm.reasonOfRejectOption === TSV_REJECT_REASON_OTHER;
  const obligatoryFieldsMissing =
    !viewForm.reasonOfRejectOption ||
    (viewForm.reasonOfRejectOption === TSV_REJECT_REASON_OTHER &&
      !viewForm.otherReasonOfRejectText);
  const disableRejectButton = loading || obligatoryFieldsMissing;

  return (
    <div>
      <h3>{t('Hylkää TSV-pyyntö')}</h3>
      <strong>{t('Hylkäysperusteet') + ':'}</strong>
      <div className={styles.marginBottom1em}>
        <input
          type="radio"
          name="reasonOfRejectOption"
          value={TSV_REJECT_REASON_WASTE_IS_UNSUITABLE}
          checked={viewForm.reasonOfRejectOption === TSV_REJECT_REASON_WASTE_IS_UNSUITABLE}
          onChange={handleViewFormChange}
          id="reasonOfRejectOption-1"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfRejectOption-1" className={'radioButtonLabel'}>
          {rejectReasonTranslated(t, TSV_REJECT_REASON_WASTE_IS_UNSUITABLE)}
        </label>
        <input
          type="radio"
          name="reasonOfRejectOption"
          value={TSV_REJECT_REASON_FACILITY_HAS_NO_CAPACITY}
          checked={viewForm.reasonOfRejectOption === TSV_REJECT_REASON_FACILITY_HAS_NO_CAPACITY}
          onChange={handleViewFormChange}
          id="reasonOfRejectOption-2"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfRejectOption-2" className={'radioButtonLabel'}>
          {rejectReasonTranslated(t, TSV_REJECT_REASON_FACILITY_HAS_NO_CAPACITY)}
        </label>
        <input
          type="radio"
          name="reasonOfRejectOption"
          value={TSV_REJECT_REASON_OTHER}
          checked={viewForm.reasonOfRejectOption === TSV_REJECT_REASON_OTHER}
          onChange={handleViewFormChange}
          id="reasonOfRejectOption-3"
          className={'radioButton'}
        />
        <label htmlFor="reasonOfRejectOption-3" className={'radioButtonLabel'}>
          {rejectReasonTranslated(t, TSV_REJECT_REASON_OTHER)}
        </label>
        {showOtherReasonOfRejectTextBox && (
          <div className={styles.marginTopHalfem}>
            <textarea
              name="otherReasonOfRejectText"
              type="text"
              rows={3}
              value={viewForm.otherReasonOfRejectText || ''}
              onChange={handleViewFormChange}
            />
          </div>
        )}
      </div>
      <div>
        <button
          className={cx('cancel', styles.marginRight2em, styles.marginBottom2em)}
          type="button"
          onClick={setIsNotRejecting}
        >
          {t('Peruuta')}
        </button>
        <button
          className={cx(styles.marginRight2em, styles.marginBottom2em)}
          type="button"
          disabled={disableRejectButton}
          onClick={rejectTsv}
        >
          {t('Hylkää')}
        </button>
      </div>
    </div>
  );
};

class TsvActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRejecting: false
    };
  }

  setIsRejecting = () => {
    this.setState({ isRejecting: true });
  };

  setIsNotRejecting = () => {
    this.setState({ isRejecting: false });
  };

  render() {
    const { t, tsv, viewForm, cancelTsv, handleViewFormChange, rejectTsv, loading } = this.props;

    let disableButtons = loading;

    return (
      <>
        {this.state.isRejecting &&
          isRejecting(
            t,
            viewForm,
            handleViewFormChange,
            rejectTsv,
            this.setIsNotRejecting,
            loading
          )}
        {!this.state.isRejecting &&
          initialButtonsLevel(t, this.setIsRejecting, tsv, disableButtons, cancelTsv)}
      </>
    );
  }
}

export default withNamespaces()(TsvActionButtons);
