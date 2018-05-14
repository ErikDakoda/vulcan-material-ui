import React from 'react';
import MuiInput from '../base-controls/MuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const NumberComponent = ({ refFunction, ...properties }) =>
  <MuiInput {...properties} ref={refFunction} type="number" />;


replaceComponent('FormComponentNumber', NumberComponent);
