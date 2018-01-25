import React from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import { Components } from 'meteor/vulcan:core';
import Snackbar from 'material-ui/Snackbar';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    position: 'relative',
    boxShadow: 'none',
    marginBottom: theme.spacing.unit * 2,
  },
  list: {
    marginBottom: 0,
  },
  error: { '& > div': { backgroundColor: theme.palette.error[500] } },
  danger: { '& > div': { backgroundColor: theme.palette.error[500] } },
  warning: { '& > div': { backgroundColor: theme.palette.error[500] } },
});


const FormFlash = ({ classes, message, type }) => {
  
  type = type === 'error' ? 'danger' : type; // if type is "error", use "danger" instead
  
  const errorClass = ['warning', 'error', 'danger'].includes(type) && classes[type];
  
  const messageNode = Array.isArray(message)
    ?
    <ul className={classes.list}>
      {message.map((message, index) =>
        <li key={index}>{message.content}</li>
      )}
    </ul>
    :
    <span>{message.content}</span>;
  
  
  return (
    <Snackbar
      open={true}
      className={classNames(classes.root, errorClass)}
      message={messageNode}
    />
  );
};


FormFlash.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
  classes: PropTypes.object,
};


replaceComponent('FormFlash', FormFlash, [withStyles, styles]);
