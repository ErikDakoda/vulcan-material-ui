import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Formsy from 'formsy-react';
import ComponentMixin from './mixins/component';
import Row from './row';
import Icon from './icon';
import propUtilities from './prop-utilities';
import Input from 'material-ui/Input';


const FormsyMuiInput = createReactClass({
  
  mixins: [Formsy.Mixin, ComponentMixin],
  
  propTypes: {
    type: PropTypes.oneOf([
      'color',
      'date',
      'datetime',
      'datetime-local',
      'email',
      'hidden',
      'month',
      'number',
      'password',
      'range',
      'search',
      'tel',
      'text',
      'time',
      'url',
      'week'
    ]),
    addonBefore: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    addonAfter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    buttonBefore: PropTypes.node,
    buttonAfter: PropTypes.node
  },
  
  getDefaultProps: function () {
    return {
      type: 'text',
      addonBefore: null,
      addonAfter: null,
      buttonBefore: null,
      buttonAfter: null
    };
  },
  
  changeValue: function (event) {
    const value = event.currentTarget.value;
    this.setValue(value);
    this.props.onChange(this.props.name, value);
  },
  
  render: function () {
    let element = this.renderElement();
    
    if (this.props.type === 'hidden') {
      return element;
    }
    
    if (this.props.addonBefore || this.props.addonAfter || this.props.buttonBefore ||
      this.props.buttonAfter) {
      element = this.renderInputGroup(element);
    }
    
    if (this.getLayout() === 'elementOnly') {
      return element;
    }
    
    let warningIcon = null;
    if (this.showErrors()) {
      warningIcon = (
        <Icon symbol="remove" className="form-control-feedback"/>
      );
    }
    
    return (
      <Row
        {...this.getRowProperties()}
        htmlFor={this.getId()}
      >
        {element}
        {warningIcon}
        {this.renderHelp()}
        {this.renderErrorMessage()}
      </Row>
    );
  },
  
  renderElement: function () {
    const options = this.props.options || {};
    return (
      <Input ref={(c) => this.element = c}
             {...propUtilities.cleanProps(this.props)}
             id={this.getId()}
             value={this.getValue()}
             onChange={this.changeValue}
             disabled={this.isFormDisabled() || this.props.disabled}
             rows={options.rows || this.props.rows}
             autoFocus={options.autoFocus}
      />
    );
  },
  
  renderInputGroup: function (element) {
    return (
      <div className="input-group">
        {this.renderAddon(this.props.addonBefore)}
        {this.renderButton(this.props.buttonBefore)}
        {element}
        {this.renderAddon(this.props.addonAfter)}
        {this.renderButton(this.props.buttonAfter)}
      </div>
    );
  },
  
  renderAddon: function (addon) {
    if (!addon) {
      return false;
    }
    return (
      <span className="input-group-addon">{addon}</span>
    );
  },
  
  renderButton: function (button) {
    if (!button) {
      return false;
    }
    return (
      <span className="input-group-btn">{button}</span>
    );
  }
  
});


export default FormsyMuiInput;
