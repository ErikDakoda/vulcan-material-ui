import React from 'react';
import FormsyMuiCheckboxGroup from '../formsy-mui/FormsyMuiCheckboxGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxGroupComponent = ({...properties}) =>
  <FormsyMuiCheckboxGroup {...properties}/>;


replaceComponent('FormComponentCheckboxGroup', CheckboxGroupComponent);
