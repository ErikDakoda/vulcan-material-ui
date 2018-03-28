import React from 'react';
import FormsyMuiSuggest from '../formsy-mui/FormsyMuiSuggest';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { registerComponent } from 'meteor/vulcan:core';
import { regions } from './countries';


const RegionSelect = ({ refFunction, ...properties }) => {
  const country = properties.document.country;
  let options;
  if (country && regions[country]) {
    options = regions[country];
  }
  
  if (options) {
    return <FormsyMuiSuggest {...properties} refFunction={refFunction} options={options}/>;
  } else {
    return <FormsyMuiInput {...properties} ref={refFunction}/>;
  }
};


registerComponent('RegionSelect', RegionSelect);
