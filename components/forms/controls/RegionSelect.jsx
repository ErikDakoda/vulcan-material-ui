import React from 'react';
import MuiSuggest from '../base-controls/MuiSuggest';
import MuiInput from '../base-controls/MuiInput';
import { registerComponent } from 'meteor/vulcan:core';
import { regions } from './countries';


const RegionSelect = ({ classes, refFunction, ...properties }) => {
  const country = properties.document.country;
  let options;
  if (country && regions[country]) {
    options = regions[country];
  }
  
  if (options) {
    return <MuiSuggest {...properties} ref={refFunction} options={options}/>;
  } else {
    return <MuiInput {...properties} ref={refFunction}/>;
  }
};


registerComponent('RegionSelect', RegionSelect);
