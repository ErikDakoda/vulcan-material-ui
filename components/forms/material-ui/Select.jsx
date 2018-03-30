import React from 'react';
import FormsyMuiSelect from '../formsy-mui/FormsyMuiSelect';
import { replaceComponent } from 'meteor/vulcan:core';


const SelectComponent = ({ refFunction, inputProperties, ...properties }) =>
    <FormsyMuiSelect {...inputProperties} ref={refFunction} native={true}/>;


replaceComponent('FormComponentSelect', SelectComponent);
