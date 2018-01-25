import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Users from 'meteor/vulcan:users';


const styles = theme => ({
  root: {
    minWidth: '320px',
  },
  head: {
    paddingLeft: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit,
    color: theme.palette.primary[500],
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
});


class FormGroup extends PureComponent {
  
  render () {
    const {
      name,
      label,
      hidden,
      classes,
      currentUser,
      fields,
      updateCurrentValues,
    } = this.props;
    
    if (name === 'admin' && !Users.isAdmin(currentUser)) {
      return null;
    }
    
    if (hidden) {
      return null;
    }
    
    return (
      <div className={classes.root}>
        
        {
          name === 'default'
            ?
            null
            :
            <Typography className={classes.head} type="subheading">
              <div>
                {label}
              </div>
            </Typography>
        }
        
        <Paper className={classes.paper}>
          {
            fields.map(field =>
              <Components.FormComponent key={field.name}
                                        {...field}
                                        updateCurrentValues={updateCurrentValues}
              />)
          }
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
  currentUser: PropTypes.object,
};


replaceComponent('FormGroup', FormGroup, withCurrentUser, [withStyles, styles]);
