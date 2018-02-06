import React from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import { FormattedMessage } from 'react-intl';


const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
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
                      document,
                      deleteDocument,
                      collectionName,
                      classes
                    }, { intl }) => (
  <div className={classes.root}>
  
    {
      deleteDocument
        ?
        <Tooltip id={`tooltip-delete-${collectionName}`}
                 className={classes.delete}
                 classes={{tooltip: classes.tooltip}}
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
        <Button raised className={classes.button} onClick={(e) => {
          e.preventDefault();
          cancelCallback(document);
        }}>{cancelLabel ? cancelLabel : <FormattedMessage id="forms.cancel"/>}</Button>
        :
        null
    }
    
    <Button raised type="submit" color="secondary" className={classes.button}>
      {submitLabel ? submitLabel : <FormattedMessage id="forms.submit"/>}
    </Button>
    
  </div>
);


FormSubmit.propTypes = {
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  cancelCallback: PropTypes.func,
  document: PropTypes.object,
  deleteDocument: PropTypes.func,
  collectionName: PropTypes.string,
  classes: PropTypes.object,
};


FormSubmit.contextTypes = {
  intl: intlShape,
};


replaceComponent('FormSubmit', FormSubmit, [withStyles, styles]);
