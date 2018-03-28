import React from 'react';
import FormsyMuiSuggest from '../formsy-mui/FormsyMuiSuggest';
import { registerComponent } from 'meteor/vulcan:core';
import { countries } from './countries';


const CountrySelect = (props) =>
  <FormsyMuiSuggest {...props} options={countries}/>;


registerComponent('CountrySelect', CountrySelect);
