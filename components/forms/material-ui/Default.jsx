import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const Default = ({ refFunction, ...properties }) =>
  <FormsyMuiInput {...properties} ref={refFunction}/>;


replaceComponent('FormComponentDefault', Default);
