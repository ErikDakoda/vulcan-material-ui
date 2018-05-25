import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Components,
  replaceComponent,
  instantiateComponent,
  withCurrentUser,
} from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import ExpandLessIcon from 'mdi-material-ui/ChevronUp';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';
import Users from 'meteor/vulcan:users';

const styles = theme => ({
  root: {
    minWidth: '320px'
  },
  paper: {
    padding: theme.spacing.unit * 3
  },
  subheading: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit,
    color: theme.palette.primary[500],
    cursor: 'pointer',
  },
  label: {
  },
  toggle: {
    '& svg': {
      width: 21,
      height: 21,
      display: 'block',
    }
  },
  container: {
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: -4,
    marginRight: -4,
  },
  entered: {
    overflow: 'visible',
  },
});


class FormGroup extends PureComponent {
  
  
  constructor (props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    
    this.isAdmin = props.name === 'admin';
    
    this.state = {
      collapsed: props.startCollapsed || this.isAdmin,
    };
  }
  
  
  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  
  render () {
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
      formType,
      throwError,
      addToDeletedValues
    } = this.props;
    
    if (this.isAdmin && !Users.isAdmin(currentUser)) {
      return null;
    }
    
    if (typeof hidden === 'function' ? hidden({ ...this.props }) : hidden) {
      return null;
    }
    
    //do not display if no fields, no startComponent and no endComponent
    if (!startComponent && !endComponent && !fields.length) {
      return null;
    }
  
    // if at least one of the fields in the group has an error, the group as a whole has an error
    const hasErrors = fields.find(field => {
      return !!errors.filter(
        error => error.properties && error.properties.name && error.properties.name === field.path
      ).length;
    });
  
    const collapsible = this.props.collapsible || this.isAdmin;
    const anchorName = name.split('.').length > 1 ? name.split('.')[1] : name;
    const collapseIn = !this.state.collapsed || hasErrors;
    
    return (
      <div className={classes.root}>
        
        <a name={anchorName}/>
        
        {name === 'default' ? null : (
          <Typography className={classes.subheading} variant="subheading" onClick={this.toggle}>
            
            <div className={classes.label}>
              {label}
            </div>
            
            {
              collapsible &&
              
              <div className={classes.toggle}>
                {
                  this.state.collapsed
                    ?
                    <ExpandMoreIcon/>
                    :
                    <ExpandLessIcon/>
                }
              </div>
            }
          
          </Typography>
        )}
        
        <Collapse classes={{ container: classes.container, entered: classes.entered }} in={collapseIn}>
          <Paper className={classes.paper}>
            
            {instantiateComponent(startComponent)}
            
            {fields.map(field => {
              return (
                <Components.FormComponent
                  key={field.name}
                  {...field}
                  errors={errors}
                  throwError={throwError}
                  currentValues={currentValues}
                  updateCurrentValues={updateCurrentValues}
                  addToDeletedValues={addToDeletedValues}
                  deletedValues={deletedValues}
                  clearFieldErrors={this.props.clearFieldErrors}
                  formType={formType}
                />
              );
            })}
            
            {instantiateComponent(endComponent)}
          
          </Paper>
        </Collapse>
      
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
  collapsible: PropTypes.bool,
  startCollapsed: PropTypes.bool,
  updateCurrentValues: PropTypes.func,
  startComponent: PropTypes.node,
  endComponent: PropTypes.node,
  currentUser: PropTypes.object
};


replaceComponent('FormGroup', FormGroup, withCurrentUser, [withStyles, styles]);
