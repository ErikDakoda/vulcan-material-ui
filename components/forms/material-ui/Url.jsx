import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const UrlComponent = ({refFunction, inputProperties, ...properties}) =>
  <FormsyMuiInput ref={refFunction} {...inputProperties} type="url" />;


replaceComponent('FormComponentUrl', UrlComponent);
