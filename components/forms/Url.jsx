import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const UrlComponent = ({refFunction, ...properties}) =>
  <FormsyMuiInput ref={refFunction} {...properties} type="url" />;


replaceComponent('FormComponentUrl', UrlComponent);
