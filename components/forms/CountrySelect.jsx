import React from 'react';
import FormsyMuiSuggest from '../formsy-mui/FormsyMuiSuggest';
import { registerComponent } from 'meteor/vulcan:core';
import { countries } from './countries';


const CountrySelect = ({ refFunction, ...properties }) =>
  <FormsyMuiSuggest {...properties} ref={refFunction} options={countries}/>;


registerComponent('CountrySelect', CountrySelect);
