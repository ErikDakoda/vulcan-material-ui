import React from 'react';
import FormsyMuiInput from '../formsy-mui/FormsyMuiInput';
import { replaceComponent } from 'meteor/vulcan:core';


const Default = ({ refFunction, inputProperties, ...properties }) =>{
  return (<FormsyMuiInput {...inputProperties} ref={refFunction}/>);}


replaceComponent('FormComponentDefault', Default);
