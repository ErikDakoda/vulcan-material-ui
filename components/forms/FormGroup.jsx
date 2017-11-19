import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';


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
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        
        {
          this.props.name === 'default'
            ?
            null
            :
            <Typography className={classes.head} type="subheading">
              <div>
                {this.props.label}
              </div>
            </Typography>
        }
        
        <Paper className={classes.paper}>
          {
            this.props.fields.map(field =>
              <Components.FormComponent key={field.name}
                                        {...field}
                                        updateCurrentValues={this.props.updateCurrentValues}
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
  fields: PropTypes.array,
  startCollapsed: PropTypes.bool,
  updateCurrentValues: PropTypes.func,
};


replaceComponent('FormGroup', FormGroup, [withStyles, styles]);
