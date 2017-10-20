import React from 'react';
import FormsyMuiSwitch from '../formsy-mui/FormsyMuiSwitch';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxComponent = ({ refFunction, ...properties }) =>
  <FormsyMuiSwitch {...properties} ref={refFunction}/>;


replaceComponent('FormComponentCheckbox', CheckboxComponent);
