import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { compose } from 'ramda';

const IndustryOptionList = React.memo(({ industries, t }) => (
  <>
    {industries.map(unit => (
      <option value={unit.id} key={unit.id}>
        {t(unit.id)}
      </option>
    ))}
  </>
));

const mapStateToProps = state => ({
  industries: state.generalState.configurations.industries
});

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(IndustryOptionList);
