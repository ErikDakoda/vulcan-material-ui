import React from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';

import Snackbar from 'material-ui/Snackbar';
import withStyles from 'material-ui/styles/withStyles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    position: 'relative',
    boxShadow: 'none',
    marginBottom: theme.spacing.unit * 2
  },
  list: {
    marginBottom: 0
  },
  error: { '& > div': { backgroundColor: theme.palette.error[500] } },
  danger: { '& > div': { backgroundColor: theme.palette.error[500] } },
  warning: { '& > div': { backgroundColor: theme.palette.error[500] } }
});

const FormErrors = ({ errors, classes }) => {
  const messageNode = (
    <ul className={classes.list}>
      {errors.map((error, index) => (
        <li key={index}>
          {error.message || (
            <FormattedMessage
              id={error.id}
              values={{ ...error.properties }}
              defaultMessage={JSON.stringify(error)}
            />
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {!!errors.length && (
        <Snackbar
          open={true}
          className={classNames(classes.root , classes.danger)}
          message={messageNode}
        />
      )}
    </div>

    // <div className="form-errors">
    //   {!!errors.length && (
    //     <Alert className="flash-message" bsStyle="danger">
    //       <ul>
    //         {errors.map((error, index) => (
    //           <li key={index}>
    //             {error.message || (
    //               <FormattedMessage
    //                 id={error.id}
    //                 values={{ ...error.data }}
    //                 defaultMessage={JSON.stringify(error)}
    //               />
    //             )}
    //           </li>
    //         ))}
    //       </ul>
    //     </Alert>
    //   )}
    // </div>
  );
};
replaceComponent('FormErrors', FormErrors, [withStyles, styles]);
