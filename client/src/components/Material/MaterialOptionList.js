import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'ramda';

const MaterialOptionList = React.memo(({ materials, t, includeWaste, includeMaterials }) => {
  const wasteMaterials = materials.filter(material => {
    return (includeWaste && material.isWaste) || (includeMaterials && material.isMaterial);
  });

  return (
    <>
      {wasteMaterials.map(unit => (
        <option value={unit.id} key={unit.id}>
          {t(unit.id)}
        </option>
      ))}
    </>
  );
});

const mapStateToProps = state => ({
  materials: state.generalState.configurations.materials
});

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(MaterialOptionList);
