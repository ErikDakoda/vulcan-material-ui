import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const EmailComponent = ({refFunction, ...properties}) =>
  <FormsyMuiInput {...properties} ref={refFunction} type="email" />;


replaceComponent('FormComponentEmail', EmailComponent);
