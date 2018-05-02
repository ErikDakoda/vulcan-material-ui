import React from 'react';
import MuiInput from '../base-controls/MuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const UrlComponent = ({ inputProperties, refFunction }) =>
  <MuiInput {...inputProperties} ref={refFunction} type="url" />;


replaceComponent('FormComponentUrl', UrlComponent);
