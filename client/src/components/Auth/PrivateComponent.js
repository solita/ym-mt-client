import { Component } from 'react';
import { connect } from 'react-redux';
import { has, any } from 'ramda';
import { userSelectors } from '../../state/ducks/user';

export const isAdminCheck = (props, user) => {
  return has('isAdmin', props) ? userSelectors.isAdmin(user) : true;
};
export const isPublicOfficerCheck = (props, user) => {
  return has('isPublicOfficer', props) ? userSelectors.isPublicOfficer(user) : true;
};
export const belongsToBusinessCheck = (props, userBusinessId) => {
  return has('belongsToBusiness', props)
    ? Array.isArray(props.belongsToBusiness)
      ? props.belongsToBusiness.includes(userBusinessId)
      : props.belongsToBusiness === userBusinessId
    : true;
};
export const doesNotBelongToBusinessCheck = (props, userBusinessId) => {
  return has('doesNotBelongToBusiness', props)
    ? props.doesNotBelongToBusiness !== userBusinessId
    : true;
};
export const isAdminOrBelongsToBusinessCheck = (props, user, userBusinessId) => {
  return has('isAdminOrBelongsToBusiness', props)
    ? userSelectors.isAdmin(user) || props.isAdminOrBelongsToBusiness === userBusinessId
    : true;
};
export const isMunicipalWasteManagement = (props, user) => {
  return has('isMunicipalWasteManagement', props)
    ? userSelectors.isMunicipalWasteManagement(user)
    : true;
};

export const isStronglyAuthenticated = (props, user) => {
  return has('requireStrongAuth', props) ? userSelectors.isStronglyAuthenticated(user) : true;
};

export const isPublicOfficerFacility = (props, user) => {
  return has('isPublicOfficerFacility', props)
    ? userSelectors.publicOfficerFacilityIds(user).includes(props.isPublicOfficerFacility)
    : true;
};

const isAllowedCheck = user => props => {
  return isAllowed(user, props);
};

export const isAnyCheck = (props, user) => {
  if (has('isAny', props) && Array.isArray(props.isAny)) {
    return any(isAllowedCheck(user), props.isAny);
  }
  return true;
};

export const isAllowed = (user, props) => {
  const userBusinessId = userSelectors.getOwnBusinessId(user);
  return (
    !!userBusinessId &&
    isAdminCheck(props, user) &&
    belongsToBusinessCheck(props, userBusinessId) &&
    doesNotBelongToBusinessCheck(props, userBusinessId) &&
    isAdminOrBelongsToBusinessCheck(props, user, userBusinessId) &&
    isMunicipalWasteManagement(props, user) &&
    isStronglyAuthenticated(props, user) &&
    isPublicOfficerFacility(props, user) &&
    isAnyCheck(props, user)
  );
};

class PrivateComponent extends Component {
  render() {
    const { user, children, renderInstead } = this.props;
    return isAllowed(user, this.props) ? children : renderInstead ? renderInstead() : null;
  }
}

const mapStateToProps = state => ({ user: state.userState.user });

export default connect(mapStateToProps)(PrivateComponent);
