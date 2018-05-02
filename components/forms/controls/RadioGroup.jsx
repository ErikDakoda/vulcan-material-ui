import React from 'react';
import MuiRadioGroup from '../base-controls/MuiRadioGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const RadioGroupComponent = ({ inputProperties, refFunction }) =>
  <MuiRadioGroup {...inputProperties} ref={refFunction}/>;


replaceComponent('FormComponentRadioGroup', RadioGroupComponent);
