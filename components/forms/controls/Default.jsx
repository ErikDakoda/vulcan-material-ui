import React from 'react';
import MuiInput from '../base-controls/MuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const Default = ({ refFunction, ...properties }) =>
  <MuiInput {...properties} ref={refFunction}/>;


replaceComponent('FormComponentDefault', Default);
