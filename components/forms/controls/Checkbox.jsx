import React from 'react';
import MuiSwitch from '../base-controls/MuiSwitch';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxComponent = ({ refFunction, ...properties }) =>
  <MuiSwitch {...properties} ref={refFunction}/>;


replaceComponent('FormComponentCheckbox', CheckboxComponent);
