import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const NumberComponent = ({refFunction, inputProperties, ...properties}) =>
  <FormsyMuiInput {...inputProperties} ref={refFunction} type="number" />;


replaceComponent('FormComponentNumber', NumberComponent);
