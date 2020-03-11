import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'ramda';

const UnitOptionList = React.memo(({ units, t }) => (
  <>
    {units.map(unit => (
      <option value={unit.id} key={unit.id}>
        {t(unit.id)}
      </option>
    ))}
  </>
));

const mapStateToProps = state => ({
  units: state.generalState.configurations.units
});

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(UnitOptionList);
