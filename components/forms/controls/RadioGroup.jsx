import React from 'react';
import MuiRadioGroup from '../base-controls/MuiRadioGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const RadioGroupComponent = ({ refFunction, ...properties }) =>
  <MuiRadioGroup {...properties} ref={refFunction}/>;


replaceComponent('FormComponentRadioGroup', RadioGroupComponent);
