import React from 'react';
import FormsyMuiSelect from '../formsy-mui/FormsyMuiSelect';
import { replaceComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root:{
    marginRight:'48px'
  },
  formInput: {}, //added this to avoid material-ui warnings
  counterWithHelper: {},
  counterWithoutHelper: {},
  clearButton: {},
  halfWidthLeft: {},
  halfWidthRight: {},
}
const SelectComponent = ({ refFunction, inputProperties, classes, ...properties }) =>
    <FormsyMuiSelect className={classes.root} {...inputProperties} ref={refFunction} native={true}/>;


replaceComponent('FormComponentSelect', SelectComponent, [withStyles,styles]);
