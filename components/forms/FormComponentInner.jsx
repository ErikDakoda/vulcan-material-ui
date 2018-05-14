import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import { Components, registerComponent, instantiateComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import MuiInput from './base-controls/MuiInput';
import MuiSwitch from './base-controls/MuiSwitch';
import MuiCheckboxGroup from './base-controls/MuiCheckboxGroup';
import MuiRadioGroup from './base-controls/MuiRadioGroup';
import MuiSelect from './base-controls/MuiSelect';
import _omit from 'lodash/omit';
import classNames from 'classnames';


const styles = theme => ({
  
  formInput: {
    position: 'relative',
    marginBottom: theme.spacing.unit * 2,
  },
  
  halfWidthLeft: {
    display: 'inline-block',
    width: '48%',
    verticalAlign: 'top',
    marginRight: '4%',
  },
  
  halfWidthRight: {
    display: 'inline-block',
    width: '48%',
    verticalAlign: 'top',
  },
  
  hidden: {
    display: 'none',
  },
  
});


class FormComponentInner extends PureComponent {
  
  getProperties = () => {
    return _omit(this.props, 'classes');
  };
  
  render () {
    const {
      classes,
      inputClassName,
      name,
      input,
      hidden,
      beforeComponent,
      afterComponent,
      renderComponent,
    } = this.props;
    
    const inputClass = classNames(
      classes.formInput,
      hidden && classes.hidden,
      inputClassName && classes[inputClassName],
      `input-${name}`,
      `form-component-${input || 'default'}`
    );
    
    const properties = this.getProperties();
    
    return (
      <div className={inputClass}>
        {instantiateComponent(beforeComponent, properties)}
        {renderComponent(properties)}
        {instantiateComponent(afterComponent, properties)}
      </div>
    );
  }
}


FormComponentInner.contextTypes = {
  intl: intlShape,
};


FormComponentInner.propTypes = {
  classes: PropTypes.object.isRequired,
  inputClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  input: PropTypes.any,
  beforeComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  afterComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  errors: PropTypes.array.isRequired,
  help: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  showCharsRemaining: PropTypes.bool.isRequired,
  charsRemaining: PropTypes.number,
  charsCount: PropTypes.number,
  max: PropTypes.number,
  renderComponent: PropTypes.func.isRequired,
};


FormComponentInner.displayName = 'FormComponentInner';


registerComponent('FormComponentInner', FormComponentInner, [withStyles, styles]);
