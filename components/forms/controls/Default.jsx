import React from 'react';
import MuiInput from '../base-controls/MuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const Default = ({ inputProperties, refFunction }) =>
  <MuiInput {...inputProperties} ref={refFunction}/>;


replaceComponent('FormComponentDefault', Default);
