import React from 'react';
import MuiCheckboxGroup from '../base-controls/MuiCheckboxGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const CheckboxGroupComponent = ({ refFunction, ...properties }) =>
  <MuiCheckboxGroup {...properties} ref={refFunction}/>;


replaceComponent('FormComponentCheckboxGroup', CheckboxGroupComponent);
