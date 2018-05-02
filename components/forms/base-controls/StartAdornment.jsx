import PropTypes from 'prop-types';
import React from 'react';
import { instantiateComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import OpenInNewIcon from 'mdi-material-ui/OpenInNew';
import { styles } from './EndAdornment';


export const hideStartAdornment = (props) => {
  return !props.addonBefore && !props.buttonBefore && !props.isUrl;
};


const StartAdornment = (props) => {
  const { classes, value, type, buttonBefore, addonBefore } = props;
  const isUrl = type === 'url';
  
  if (hideStartAdornment(props)) return null;
  
  const urlButton = isUrl &&
    <IconButton
      className={classes.urlButton}
      href={value}
      target="_blank"
      disabled={!value}>
      <OpenInNewIcon/>
    </IconButton>;
  
  
  return (
    <InputAdornment classes={{ root: classes.inputAdornment }} position="start">
      {instantiateComponent(buttonBefore)}
      {instantiateComponent(addonBefore)}
      {urlButton}
    </InputAdornment>
  );
};


StartAdornment.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  addonBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  buttonBefore: PropTypes.node,
};


export default withStyles(styles)(StartAdornment);
