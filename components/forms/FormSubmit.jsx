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
                      discardLabel,
                      discardChanges,
                      document,
                      deleteDocument,
                      collectionName,
                      classes
                    }, {
                      intl,
                      isChanged,
                    }) => (
  <div className={classes.root}>
    
    {
      deleteDocument
        ?
        <Tooltip id={`tooltip-delete-${collectionName}`}
                 className={classes.delete}
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
                className={classes.button}
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
      discardChanges
        ?
        <Button variant="raised"
                className={classes.button}
                disabled={!isChanged()}
                onClick={(event) => {
                  event.preventDefault();
                  discardChanges();
                }}
        >
          {cancelLabel ? cancelLabel : <FormattedMessage id="forms.revert"/>}
        </Button>
        :
        null
    }
    
    <Button variant="raised"
            type="submit"
            color="secondary"
            className={classes.button}
            disabled={!isChanged()}
    >
      {submitLabel ? submitLabel : <FormattedMessage id="forms.submit"/>}
    </Button>
  
  </div>
);


FormSubmit.propTypes = {
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  discardLabel: PropTypes.string,
  cancelCallback: PropTypes.func,
  discardChanges: PropTypes.func,
  document: PropTypes.object,
  deleteDocument: PropTypes.func,
  collectionName: PropTypes.string,
  classes: PropTypes.object,
};


FormSubmit.contextTypes = {
  intl: intlShape,
  isChanged: PropTypes.func,
};


replaceComponent('FormSubmit', FormSubmit, [withStyles, styles]);
