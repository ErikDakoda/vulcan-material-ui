import React from 'react';
import FormsyMuiRadioGroup from '../formsy-mui/FormsyMuiRadioGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const RadioGroupComponent = ({refFunction, inputProperties, ...properties}) =>
  <FormsyMuiRadioGroup {...inputProperties}/>;


replaceComponent('FormComponentRadioGroup', RadioGroupComponent);
