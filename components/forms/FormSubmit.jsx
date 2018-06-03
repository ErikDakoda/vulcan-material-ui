import React from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'mdi-material-ui/Delete';
import Tooltip from 'material-ui/Tooltip';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
  button: {
    margin: theme.spacing.unit,
  },
  delete: {
    float: 'left',
    width: 0,
  },
  tooltip: {
    margin: 0,
  }
});


const FormSubmit = ({
                      submitLabel,
                      cancelLabel,
                      cancelCallback,
                      revertLabel,
                      revertCallback,
                      document,
                      deleteDocument,
                      collectionName,
                      classes
                    }, {
                      intl,
                      isChanged,
                      clearForm,
                    }) => {

  if (typeof isChanged !== 'function') {
    isChanged = () => true;
  }

  return (
    <div className={classes.root}>

      {
        deleteDocument
          ?
          <Tooltip id={`tooltip-delete-${collectionName}`}
                   className={classNames('delete-button', classes.delete)}
                   classes={{ tooltip: classes.tooltip }}
                   title={intl.formatMessage({ id: 'forms.delete' })}
                   placement="bottom">
            <IconButton onClick={deleteDocument}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          :
          null
      }

      {
        cancelCallback
          ?
          <Button variant="raised"
                  className={classNames('cancel-button', classes.button)}
                  onClick={(event) => {
                    event.preventDefault();
                    cancelCallback(document);
                  }}>
            {cancelLabel ? cancelLabel : <FormattedMessage id="forms.cancel"/>}
          </Button>
          :
          null
      }

      {
        revertCallback
          ?
          <Button variant="raised"
                  className={classNames('revert-button', classes.button)}
                  disabled={!isChanged()}
                  onClick={(event) => {
                    event.preventDefault();
                    clearForm({ clearErrors: true, clearCurrentValues: true, clearDeletedValues: true });
                    revertCallback(document);
                  }}
          >
            {revertLabel ? revertLabel : <FormattedMessage id="forms.revert"/>}
          </Button>
          :
          null
      }

      <Button variant="raised"
              type="submit"
              color="secondary"
              className={classNames('submit-button', classes.button)}
              disabled={!isChanged()}
      >
        {submitLabel ? submitLabel : <FormattedMessage id="forms.submit"/>}
      </Button>

    </div>
  );
};


FormSubmit.propTypes = {
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  revertLabel: PropTypes.string,
  cancelCallback: PropTypes.func,
  revertCallback: PropTypes.func,
  document: PropTypes.object,
  deleteDocument: PropTypes.func,
  collectionName: PropTypes.string,
  classes: PropTypes.object,
};


FormSubmit.contextTypes = {
  intl: intlShape,
  isChanged: PropTypes.func,
  clearForm: PropTypes.func,
};


replaceComponent('FormSubmit', FormSubmit, [withStyles, styles]);
