import React from 'react';
import MuiSelect from '../base-controls/MuiSelect';
import { replaceComponent } from 'meteor/vulcan:core';


const SelectMultiple = ({ refFunction, ...properties }) => {
  properties.multiple = true;
  
  return <MuiSelect {...properties} ref={refFunction}/>;
};


replaceComponent('FormComponentSelectMultiple', SelectMultiple);
