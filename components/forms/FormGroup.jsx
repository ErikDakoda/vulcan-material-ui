import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Components,
  replaceComponent,
  withCurrentUser
} from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Users from 'meteor/vulcan:users';

const styles = theme => ({
  root: {
    minWidth: '320px'
  },
  head: {
    paddingLeft: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit,
    color: theme.palette.primary[500]
  },
  paper: {
    padding: theme.spacing.unit * 3
  }
});

class FormGroup extends PureComponent {
  renderExtraComponent(extraComponent) {
    if (!extraComponent) return null;

    const { document, updateCurrentValues } = this.props;

    if (typeof extraComponent === 'string') {
      const ExtraComponent = Components[extraComponent];
      return (
        <ExtraComponent
          document={document}
          updateCurrentValues={updateCurrentValues}
        />
      );
    } else {
      return extraComponent;
    }
  }

  render() {
    const {
      name,
      label,
      hidden,
      classes,
      currentUser,
      fields,
      updateCurrentValues,
      startComponent,
      endComponent,
      errors,
      currentValues,
      deletedValues,
      formType
    } = this.props;

    // if at least one of the fields in the group has an error, the group as a whole has an error
    const hasErrors = _.some(fields, field => {
      return !!errors.filter(
        error => error.data && error.data.name && error.data.name === field.path
      ).length;
    });

    if (name === 'admin' && !Users.isAdmin(currentUser)) {
      return null;
    }

    if (hidden) {
      return null;
    }

    const anchorName = name.split('.').length > 1 ? name.split('.')[1] : name;

    return (
      <div className={classes.root}>
        <a name={anchorName} />

        {name === 'default' ? null : (
          <Typography className={classes.head} variant="subheading">
            {label}
          </Typography>
        )}

        <Paper className={classes.paper}>
          {this.renderExtraComponent(startComponent)}
          {fields.map(field => {
            if (typeof field.getHidden === 'function') {
              if (field.getHidden.call(field)) {
                return null;
              }
            }
            return (
              <Components.FormComponent
                key={field.name}
                {...field}
                updateCurrentValues={updateCurrentValues}
                formType={formType}
                currentValues={currentValues}
                deletedValues={deletedValues}
                errors={errors}
              />
            );
          })}
          {this.renderExtraComponent(endComponent)}
        </Paper>
      </div>
    );
  }
}

FormGroup.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  order: PropTypes.number,
  hidden: PropTypes.bool,
  fields: PropTypes.array,
  startCollapsed: PropTypes.bool,
  updateCurrentValues: PropTypes.func,
  startComponent: PropTypes.node,
  endComponent: PropTypes.node,
  currentUser: PropTypes.object
};

replaceComponent('FormGroup', FormGroup, withCurrentUser, [withStyles, styles]);
