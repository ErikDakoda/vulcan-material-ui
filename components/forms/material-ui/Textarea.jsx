import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const TextareaComponent = ({refFunction, ...properties}) =>
  <FormsyMuiInput ref={refFunction} multiline={true} rows={2} rowsMax={10} {...properties}/>;


replaceComponent('FormComponentTextarea', TextareaComponent);
