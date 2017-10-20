import React from 'react';
import FormsyMuiCheckboxGroup from '../formsy-mui/FormsyMuiCheckboxGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxGroupComponent = ({refFunction, ...properties}) =>
  <FormsyMuiCheckboxGroup {...properties} ref={refFunction} />;


replaceComponent('FormComponentCheckboxGroup', CheckboxGroupComponent);
