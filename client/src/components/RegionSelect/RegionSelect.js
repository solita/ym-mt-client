import React, { Component } from 'react';
import { compose, prop, either } from 'ramda';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Loader from '../Loader/Loader';
import Select from '../Select/Select';
import { localeMunicipalityPropName, localeRegionPropName } from './region-utils';

const searchFn = searchString => value => {
  const typeAgnosticFiValue = either(prop('nameFi'), prop('regionNameFi'))(value);
  const typeAgnosticSvValue = either(prop('nameSv'), prop('regionNameSv'))(value);
  return (
    typeAgnosticFiValue.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
    typeAgnosticSvValue.toLowerCase().indexOf(searchString.toLowerCase()) > -1
  );
};

const displayFn = lang =>
  either(prop(localeMunicipalityPropName(lang)), prop(localeRegionPropName(lang)));

const keyFn = either(prop('id'), prop('regionId'));

const handleRegionlist = (isMunicipalitiesOnly, municipalities, regionsAndMunicipalities) => {
  return isMunicipalitiesOnly ? municipalities : regionsAndMunicipalities;
};

const placeholderText = isMunicipalitiesOnly => {
  return isMunicipalitiesOnly ? 'Kunta tai kaupunki' : 'Maakunta, kunta tai kaupunki';
};

export class RegionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }

  componentDidMount() {
    this.setState({
      values: handleRegionlist(
        this.props.municipalitiesOnly,
        this.props.municipalities,
        this.props.municipalitiesAndRegions
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.configurationsFetched !== this.props.configurationsFetched) {
      this.setState({
        values: handleRegionlist(
          this.props.municipalitiesOnly,
          this.props.municipalities,
          this.props.municipalitiesAndRegions
        )
      });
    }
  }

  addRegion = region => {
    this.props.handleChange(region);
  };

  handleRemoveSingle = () => {
    this.props.onRemove();
  };

  render() {
    const { loadingConfigurations, t, municipalitiesOnly, i18n } = this.props;

    return (
      <Loader loading={loadingConfigurations}>
        <Select
          values={this.state.values}
          onAdd={this.addRegion}
          single={this.props.single}
          value={this.props.value}
          displayFn={displayFn(i18n.language)}
          keyFn={keyFn}
          placeholder={t(placeholderText(municipalitiesOnly))}
          searchFn={searchFn}
          onRemove={location => this.props.onRemove(location)}
        />
      </Loader>
    );
  }
}

const mapStateToProps = state => ({
  municipalities: state.generalState.location.municipalities,
  municipalitiesAndRegions: state.generalState.location.regionsAndMunicipalities,
  loadingConfigurations: state.generalState.loadingConfigurations,
  configurationsFetched: state.generalState.configurationsFetched
});

export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(RegionSelect);
