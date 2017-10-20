import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import classNames from 'classnames/dedupe';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormLabel } from 'material-ui/Form';


const Row = createReactClass({
  
  propTypes: {
    label: PropTypes.node,
    children: PropTypes.node,
    rowClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    labelClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    elementWrapperClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    required: PropTypes.bool,
    hasErrors: PropTypes.bool,
    fakeLabel: PropTypes.bool,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    htmlFor: PropTypes.string
  },
  
  getDefaultProps: function () {
    return {
      label: '',
      rowClassName: '',
      labelClassName: '',
      elementWrapperClassName: '',
      required: false,
      hasErrors: false,
      fakeLabel: false
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
    
    if (this.props.layout === 'elementOnly') {
      return null;
    }
    
    const labelClassNames = [];
    labelClassNames.push('control-label');
    
    labelClassNames.push(this.props.labelClassName);
    
    if (this.props.fakeLabel) {
      return (
        <FormLabel component="legend">
          {this.props.label}
          {this.renderRequiredSymbol()}
        </FormLabel>
      );
    }
    
    return (
      <InputLabel className={classNames(labelClassNames)}
                  data-required={this.props.required}
                  htmlFor={this.props.htmlFor}>
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


export default Row;
