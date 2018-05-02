import React from 'react';
import MuiCheckboxGroup from '../base-controls/MuiCheckboxGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxGroupComponent = ({ inputProperties, refFunction }) =>
  <MuiCheckboxGroup {...inputProperties} ref={refFunction}/>;


replaceComponent('FormComponentCheckboxGroup', CheckboxGroupComponent);
