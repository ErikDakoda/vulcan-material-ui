import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//noinspection JSUnusedGlobalSymbols
const MuiFormControl = createReactClass({
  
  propTypes: {
    label: PropTypes.node,
    children: PropTypes.node,
    required: PropTypes.bool,
    hasErrors: PropTypes.bool,
    fakeLabel: PropTypes.bool,
    hideLabel: PropTypes.bool,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    htmlFor: PropTypes.string
  },
  
  getDefaultProps: function () {
    return {
      label: '',
      required: false,
      hasErrors: false,
      fakeLabel: false,
      hideLabel: false,
    };
  },
  
  renderRequiredSymbol: function () {
    if (this.props.required === false) {
      return null;
    }
    return (
      <span className="required-symbol"> *</span>
    );
  },
  
  renderLabel: function () {
    if (this.props.layout === 'elementOnly' || this.props.hideLabel) {
      return null;
    }
    
    if (this.props.fakeLabel) {
      return (
        <FormLabel className="control-label legend"
                   component="legend"
                   data-required={this.props.required}
        >
          {this.props.label}
          {this.renderRequiredSymbol()}
        </FormLabel>
      );
    }
    
    return (
      <InputLabel className="control-label"
                  data-required={this.props.required}
                  htmlFor={this.props.htmlFor}
      >
        {this.props.label}
        {this.renderRequiredSymbol()}
      </InputLabel>
    );
  },
  
  render: function () {
    
    if (this.props.layout === 'elementOnly') {
      return <span>{this.props.children}</span>;
    }
    
    return (
      <FormControl component="fieldset" error={this.props.hasErrors} fullWidth={true}>
        {this.renderLabel()}
        {this.props.children}
      </FormControl>
    );
  }
  
});


export default MuiFormControl;
