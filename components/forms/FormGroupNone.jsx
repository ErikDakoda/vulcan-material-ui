import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Components,
  registerComponent,
  instantiateComponent,
  withCurrentUser,
} from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Users from 'meteor/vulcan:users';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    minWidth: '320px'
  },
});


class FormGroupNone extends PureComponent {
  
  
  render () {
    const {
      name,
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
    
    const anchorName = name.split('.').length > 1 ? name.split('.')[1] : name;
    
    return (
      <div className={classes.root}>
        
        <a name={anchorName}/>
        
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
      
      </div>
    );
  }
  
  
}


FormGroupNone.propTypes = {
  name: PropTypes.string,
  order: PropTypes.number,
  hidden: PropTypes.bool,
  fields: PropTypes.array,
  updateCurrentValues: PropTypes.func,
  startComponent: PropTypes.node,
  endComponent: PropTypes.node,
  currentUser: PropTypes.object,
};


registerComponent('FormGroupNone', FormGroupNone, withCurrentUser, [withStyles, styles]);
