import React from 'react';
import PropTypes from 'prop-types';
import { instantiateComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import { FormHelperText } from 'material-ui/Form';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';


export const styles = theme => ({
  
  error: {
    color: theme.palette.error.main,
  },
  
  formHelperText: {
    display: 'flex',
    '& :first-child': {
      flexGrow: 1,
    }
  },
  
});


const EndAdornment = (props) => {
  const {
    classes,
    help,
    errors,
    hasErrors,
    showCharsRemaining,
    charsRemaining,
    charsCount,
    max,
  } = props;
  
  if (!help && !hasErrors && !showCharsRemaining) {
    return null;
  }
  
  const errorMessage = hasErrors &&
    (errors[0].message ||
    <FormattedMessage
      id={errors[0].id}
      values={{ ...errors[0].properties }}
      defaultMessage={JSON.stringify(errors[0])}
    />);
  
  return (
    <FormHelperText className={classes.formHelperText} error={hasErrors}>
      
      <span>
        {
          hasErrors ? errorMessage : help
        }
      </span>
      
      {
        showCharsRemaining &&
        
        <span className={charsRemaining < 0 ? classes.error : null}>
          {charsCount} / {max}
        </span>
      }
    
    </FormHelperText>
  );
};


EndAdornment.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.any,
  changeValue: PropTypes.func,
  addonAfter: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
};


export default withStyles(styles)(EndAdornment);
