import React from 'react';
import FormsyMuiCheckboxGroup from '../formsy-mui/FormsyMuiCheckboxGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxGroupComponent = ({inputProperties, ...properties}) =>
  <FormsyMuiCheckboxGroup {...inputProperties}/>;


replaceComponent('FormComponentCheckboxGroup', CheckboxGroupComponent);
