import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import classNames from 'classnames';
import { Components } from 'meteor/vulcan:core';
import { registerComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';


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
});


class FormComponent extends PureComponent {
  
  constructor (props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.updateCharacterCount = this.updateCharacterCount.bind(this);
    
    if (props.limit) {
      this.state = {
        limit: props.value ? props.limit - props.value.length : props.limit
      };
    }
  }
  
  componentWillReceiveProps (nextProps) {
    this.updateCharacterCount(nextProps.name, nextProps.value);
  }
  
  handleBlur () {
    if (this.formControl) {
      const value = this.formControl.getValue();
      this.props.updateCurrentValues({ [this.props.name]: value });
    }
  }
  
  updateCharacterCount (name, value) {
    if (this.props.limit) {
      const characterCount = value ? value.length : 0;
      this.setState({
        limit: this.props.limit - characterCount
      });
    }
  }
  
  renderComponent () {
    
    // see https://facebook.github.io/react/warnings/unknown-prop.html
    /* eslint-disable */
    const {
      control,
      group,
      updateCurrentValues,
      document,
      beforeComponent,
      afterComponent,
      limit,
      //errors,
      classes,
      ...rest
    } = this.props;
    /* eslint-enable */
    
    // const base = typeof this.props.control === 'function' ? this.props : rest;
    
    const properties = {
      value: '', // default value, will be overridden by `rest` if real value has been passed down
                 // through props
      ...rest,
      onBlur: this.handleBlur,
      refFunction: (ref) => this.formControl = ref,
    };
    
    // for text fields, update character count on change
    if (!this.props.control ||
      ['number', 'url', 'email', 'textarea', 'text'].includes(this.props.control)) {
      properties.onChange = this.updateCharacterCount;
    }
    
    // if control is a React component, use it
    if (typeof this.props.control === 'function') {
      
      return <this.props.control {...properties} document={document}/>;
      
    } else if (typeof this.props.control === 'string') { // else pick a predefined component
      
      switch (this.props.control) {
        
        case 'number':
          return <Components.FormComponentNumber {...properties}/>;
        
        case 'url':
          return <Components.FormComponentUrl {...properties}/>;
        
        case 'email':
          return <Components.FormComponentEmail {...properties}/>;
        
        case 'textarea':
          return <Components.FormComponentTextarea {...properties}/>;
        
        case 'checkbox':
          // not sure why, but onChange needs to be specified here
          properties.onChange =
            (name, value) => {this.props.updateCurrentValues({ [name]: value });};
          return <Components.FormComponentCheckbox {...properties} />;
        
        case 'checkboxgroup':
          return <Components.FormComponentCheckboxGroup {...properties} />;
        
        case 'radiogroup':
          // not sure why, but onChange needs to be specified here
          properties.onChange =
            (name, value) => {this.props.updateCurrentValues({ [name]: value });};
          return <Components.FormComponentRadioGroup {...properties} />;
        
        case 'select':
          properties.options = [{ value: '', label: 'None' }, ...properties.options];
          return <Components.FormComponentSelect {...properties} />;
        
        case 'datetime':
          return <Components.FormComponentDateTime {...properties} />;
        
        case 'time':
          return <Components.FormComponentTime {...properties} />;
        
        case 'text':
          return <Components.FormComponentDefault {...properties}/>;
        
        default:
          const CustomComponent = Components[this.props.control];
          return <CustomComponent {...properties} updateCurrentValues={this.props.updateCurrentValues} document={document}/>;
      }
      
    } else {
      
      return <Components.FormComponentDefault {...properties}/>;
      
    }
  }
  
  showClear = () => {
    return ['datetime', 'radiogroup'].includes(this.props.control);
  };
  
  clearField = (e) => {
    e.preventDefault();
    console.log(this.props);
    const fieldName = this.props.name;
    // clear value
    this.props.updateCurrentValues({ [fieldName]: null });
    // add it to unset
    this.context.addToDeletedValues(fieldName);
  };
  
  renderClear () {
    return (
      <a href="javascript:void(0)" className="form-component-clear"
         title={this.context.intl.formatMessage({ id: 'forms.clear_field' })}
         onClick={this.clearField}><span>✕</span></a>
    );
  }
  
  renderExtraComponent (extraComponent) {
    if (!extraComponent) return null;
  
    /* eslint-disable */
    const {
      control,
      group,
      updateCurrentValues,
      beforeComponent,
      afterComponent,
      limit,
      errors,
      classes,
      ...rest
    } = this.props;
    /* eslint-enable */
  
    // const base = typeof this.props.control === 'function' ? this.props : rest;
  
    const properties = {
      value: '',
      ...rest,
    };
  
    if (typeof extraComponent === 'string') {
      const ExtraComponent = Components[extraComponent];
      return <ExtraComponent {...properties}/>;
    } else {
      return extraComponent;
    }
  }
  
  render () {
    const {
      classes,
      inputClassName,
      name,
      control,
    } = this.props;
    const inputClass = classNames(classes.formInput, inputClassName && classes[inputClassName],
      `input-${name}`, `form-component-${control || 'default'}`);
    
    return (
      <div className={inputClass}>
        {this.renderExtraComponent(this.props.beforeComponent)}
        {this.renderComponent()}
        {this.showClear() ? this.renderClear() : null}
        {this.props.limit ? <div className={classNames('form-control-limit',
          { danger: this.state.limit < 10 })}>{this.state.limit}</div> : null}
        {this.renderExtraComponent(this.props.afterComponent)}
      </div>
    );
  }
  
}

FormComponent.propTypes = {
  document: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  prefilledValue: PropTypes.any,
  options: PropTypes.any,
  control: PropTypes.any,
  datatype: PropTypes.any,
  disabled: PropTypes.bool,
  updateCurrentValues: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

FormComponent.contextTypes = {
  intl: intlShape,
  addToDeletedValues: PropTypes.func,
};

registerComponent('FormComponent', FormComponent, [withStyles, styles]);
