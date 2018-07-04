import React from 'react';
import PropTypes from 'prop-types';
import { instantiateComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'mdi-material-ui/CloseCircle';
import classNames from 'classnames';


export const styles = theme => ({
  inputAdornment: {
    whiteSpace: 'nowrap',
    marginTop: '0 !important',
    '& > *': {
      verticalAlign: 'bottom',
    },
    '& > svg': {
      color: theme.palette.common.darkBlack,
    },
    '& > * + *': {
      marginLeft: 8,
    }
  },
  clearButton: {
    opacity: 0,
    '& svg': {
      width: 20,
      height: 20,
    },
    marginRight: -12,
    marginLeft: -4,
    '&:first-child': {
      marginLeft: -12,
    },
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),
  },
  urlButton: {
    verticalAlign: 'bottom',
    width: 24,
    height: 24,
    fontSize: 20,
  }
});


const EndAdornment = (props) => {
  const { classes, value, changeValue, addonAfter, disabled } = props;
  
  if (!addonAfter && (!changeValue || disabled)) return null;
  const hasValue = !!value || value === 0;
  
  const clearButton = changeValue && !disabled &&
    <IconButton className={classNames('clear-button', classes.clearButton, hasValue && 'clear-enabled')}
                onClick={event => {
                  event.preventDefault();
                  changeValue(null);
                }}
                tabIndex="-1"
    >
      <CloseIcon/>
    </IconButton>;
  
  return (
    <InputAdornment classes={{ root: classes.inputAdornment }} position="end">
      {instantiateComponent(addonAfter)}
      {clearButton}
    </InputAdornment>
  );
};


EndAdornment.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.any,
  changeValue: PropTypes.func,
  addonAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
};


export default withStyles(styles)(EndAdornment);
