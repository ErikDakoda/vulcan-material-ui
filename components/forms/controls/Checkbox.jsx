import React from 'react';
import MuiSwitch from '../base-controls/MuiSwitch';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxComponent = ({ inputProperties, refFunction }) =>
  <MuiSwitch {...inputProperties} ref={refFunction}/>;


replaceComponent('FormComponentCheckbox', CheckboxComponent);
