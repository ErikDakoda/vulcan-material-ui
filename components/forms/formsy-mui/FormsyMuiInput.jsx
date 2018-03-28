import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Formsy from 'formsy-react';
import ComponentMixin from './mixins/component';
import Row from './row';
import propUtilities from './prop-utilities';
import Input, { InputAdornment } from 'material-ui/Input';
import OpenInNewIcon from 'mdi-material-ui/OpenInNew';
import IconButton from 'material-ui/IconButton';


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
  
  handleChange: function (event) {
    const value = event.currentTarget.value;
    this.changeValue(value);
  },
  
  changeValue: function (value) {
    this.setValue(value);
    this.props.onChange(this.props.name, value);
  },
  
  renderUrlButton: function () {
    const style = {
      verticalAlign: 'bottom',
      width: '24px',
      height: '24px',
      fontSize: '20px',
      paddingTop: '4px',
    };
    return (
      <IconButton style={style}
                  href={this.getValue()}
                  target="_blank"
                  disabled={!this.getValue()}
      >
        <OpenInNewIcon/>
      </IconButton>
    );
  },
  
  render: function () {
    let startAdornment;
    let endAdornment;
    
    if (this.props.addonBefore || this.props.buttonBefore) {
      startAdornment =
        <InputAdornment position="start">
          {this.props.addonBefore && this.props.addonBefore}
          {this.props.buttonBefore && this.props.buttonBefore}
        </InputAdornment>;
    }
    
      const urlButton = this.props.type === 'url' && this.renderUrlButton();
    
    if (this.props.addonAfter || this.props.buttonAfter || urlButton) {
      endAdornment =
        <InputAdornment position="end">
          {urlButton && urlButton}
          {this.props.buttonAfter && this.props.buttonAfter}
          {this.props.addonAfter && this.props.addonAfter}
        </InputAdornment>;
    }
    
    let element = this.renderElement(startAdornment, endAdornment);
    
    if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
      return element;
    }
    
    return (
      <Row
        {...this.getRowProperties()}
        htmlFor={this.getId()}
      >
        {element}
        {this.renderHelp()}
        {this.renderErrorMessage()}
      </Row>
    );
  },
  
  renderElement: function (startAdornment, endAdornment) {
    const options = this.props.options || {};

    return (
      <Input ref={(c) => this.element = c}
             {...propUtilities.cleanProps(this.props)}
             id={this.getId()}
             value={this.getValue()}
             onChange={this.handleChange}
             disabled={this.isFormDisabled() || this.props.disabled}
             rows={options.rows || this.props.rows}
             autoFocus={options.autoFocus || this.props.autoFocus}
             startAdornment={startAdornment}
             endAdornment={endAdornment}
      />
    );
  },
  
});


export default FormsyMuiInput;
