import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent, addStrings } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Delete from 'mdi-material-ui/Delete';
import Plus from 'mdi-material-ui/Plus';

addStrings('en', {
  'forms.add': 'Add',
});

const styles = theme => ({
  root: {
    padding: '10px',
    marginBottom: 10,
  },
});

const FormNestedItem = (
  { nestedFields, name, path, removeItem, itemIndex, classes, ...props },
  { errors, intl }
) => {
  return (
    <Paper className={classes.root} elevation={4}>
      {nestedFields.map((field, i) => {
        return (
          <Components.FormComponent key={i}
            {...props}
            {...field}
            path={`${path}.${field.name}`}
            itemIndex={itemIndex}
          />
        );
      })}

      <Tooltip title={intl.formatMessage({ id: 'forms.delete' })}>
        <IconButton
          onClick={() => {
            removeItem(name);
          }}
          aria-label="Delete">
          <Components.IconRemove/>
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

FormNestedItem.contextTypes = {
  errors: PropTypes.array,
  intl: intlShape,
};

replaceComponent('FormNestedItem', FormNestedItem, [withStyles, styles]);

class FormNested extends PureComponent {
  addItem = () => {
    this.props.updateCurrentValues({
      [`${this.props.path}.${this.props.value.length}`]: {}
    });
  };

  removeItem = index => {
    this.props.updateCurrentValues({ [`${this.props.path}.${index}`]: null });
  };

  /*

  Go through this.context.deletedValues and see if any value matches both the current field
  and the given index (ex: if we want to know if the second address is deleted, we
  look for the presence of 'addresses.1')
  */
  isDeleted = index => {
    return this.context.deletedValues.includes(`${this.props.path}.${index}`);
  };

  render () {
    // do not pass FormNested's own value, control and inputProperties props down
    const properties = _.omit(this.props, 'value', 'control', 'inputProperties');

    return (
      <Grid container>
        <Grid item xs={12} sm={3}>
          <Typography component="label">
            {this.props.label}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          {this.props.value &&
          this.props.value.map(
            (subDocument, i) =>
              !this.isDeleted(i) && (
                <Components.FormNestedItem
                  {...properties}
                  key={i}
                  itemIndex={i}
                  path={`${this.props.path}.${i}`}
                  removeItem={() => {
                    this.removeItem(i);
                  }}
                />
              )
          )}
          <Tooltip title={this.context.intl.formatMessage({ id: 'forms.add' })}>
            <IconButton onClick={this.addItem} aria-label="Add">
              <Components.IconAdd/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

FormNested.contextTypes = {
  deletedValues: PropTypes.array,
  intl: intlShape,
};

replaceComponent('FormNested', FormNested);

const IconRemove = () => <Delete/>;

replaceComponent('IconRemove', IconRemove);

const IconAdd = () => <Plus/>;

replaceComponent('IconAdd', IconAdd);
