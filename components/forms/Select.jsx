import React from 'react';
import FormsyMuiSelect from '../formsy-mui/FormsyMuiSelect';
import { replaceComponent } from 'meteor/vulcan:core';


const SelectComponent = ({ refFunction, ...properties }) =>
    <FormsyMuiSelect {...properties} ref={refFunction} native={true}/>;


replaceComponent('FormComponentSelect', SelectComponent);
