import React from 'react';
import createReactClass from 'create-react-class';
import Formsy from 'formsy-react';
import ComponentMixin from './mixins/component';
import Row from './row';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import propUtilities from './prop-utilities';


const FormsyMuiSwitch = createReactClass({
  
  mixins: [Formsy.Mixin, ComponentMixin],
  
  getDefaultProps: function () {
    return {
      label: '',
      rowLabel: '',
      value: false
    };
  },
  
  changeValue: function (event) {
    const target = event.currentTarget;
    const value = target.checked;
    console.log(value);
    
    this.setValue(value);
    this.props.onChange(this.props.name, value);
    
    /*if (this.props.onBlur) {
      setTimeout(() => {this.props.onBlur();}, 1000);
    }*/
    setTimeout(() => {document.activeElement.blur();});
  },
  
  render: function () {
    
    const element = this.renderElement();
    
    if (this.getLayout() === 'elementOnly') {
      return element;
    }
    
    return (
      <Row
        {...this.getRowProperties()}
        label={this.props.rowLabel}
        htmlFor={this.getId()}
      >
        {element}
        {this.renderHelp()}
        {this.renderErrorMessage()}
      </Row>
    );
  },
  
  renderElement: function () {
    return (
      <FormControlLabel
        control={
          <Switch
            ref={(c) => this.element = c}
            {...propUtilities.cleanSwitchProps(propUtilities.cleanProps(this.props))}
            id={this.getId()}
            checked={this.getValue() === true}
            onChange={this.changeValue}
            disabled={this.isFormDisabled() || this.props.disabled}
          />
        }
        label={this.props.label}
      />
    );
  },
  
});


export default FormsyMuiSwitch;
