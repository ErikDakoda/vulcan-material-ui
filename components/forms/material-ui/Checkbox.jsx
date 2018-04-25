import React from 'react';
import FormsyMuiSwitch from '../formsy-mui/FormsyMuiSwitch';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxComponent = ({ refFunction, inputProperties, ...properties }) =>
  <FormsyMuiSwitch {...inputProperties} ref={refFunction}/>;


replaceComponent('FormComponentCheckbox', CheckboxComponent);
