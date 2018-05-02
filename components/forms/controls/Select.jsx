import React from 'react';
import MuiSelect from '../base-controls/MuiSelect';
import { replaceComponent } from 'meteor/vulcan:core';


const SelectComponent = ({ inputProperties, refFunction }) =>
  <MuiSelect {...inputProperties} ref={refFunction}/>;


replaceComponent('FormComponentSelect', SelectComponent);
