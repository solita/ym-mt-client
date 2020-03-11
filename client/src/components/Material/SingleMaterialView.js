import React from 'react';
import { withNamespaces } from 'react-i18next';

const materialQuantity = (quantity, t) => (
  <>
    <p>
      <strong>{t('Määrä')}</strong> {quantity.amount} {quantity.unitOfMeasure}
    </p>
  </>
);

const SingleMaterialView = ({ material, t }) => {
  return (
    <div>
      <h3>{`${t('Materiaali')}`}</h3>
      <p>
        <strong>{t('Tyyppi')}</strong> {material.materialType}
      </p>
      <p>
        <strong>{t('Kuvaus')}</strong> {material.description}
      </p>
      <p>
        <strong>{t('Jätettä?')}</strong> {material.isWaste ? t('Kyllä') : t('Ei')}
      </p>
      <p>
        <strong>{t('TSV?')}</strong> {material.useTsv ? t('Kyllä') : t('Ei')}
      </p>
      {material.quantity && materialQuantity(material.quantity, t)}
      <p>
        <strong>{t('Hinta')}</strong> {material.priceInEUR}
      </p>
    </div>
  );
};

export default withNamespaces()(SingleMaterialView);
