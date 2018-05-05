import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText } from 'material-ui/Form';
import { FormattedMessage } from 'meteor/vulcan:i18n';


export default {
  
  propTypes: {
    label: PropTypes.string,
    hideLabel: PropTypes.bool,
    layout: PropTypes.string,
    required: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.object),
  },
  
  getFormControlProperties: function () {
    return {
      label: this.props.label,
      hideLabel: this.props.hideLabel,
      layout: this.props.layout,
      required: this.props.required,
      hasErrors: this.hasErrors(),
    };
  },
  
  getFormHelperProperties: function () {
    return {
      help: this.props.help,
      errors: this.props.errors,
      hasErrors: this.hasErrors(),
      showCharsRemaining: this.props.showCharsRemaining,
      charsRemaining: this.props.charsRemaining,
      charsCount: this.props.charsCount,
      max: this.props.max,
    };
  },
  
  hashString: function (string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
    }
    return hash;
  },
  
  /**
   * The ID is used as an attribute on the form control, and is used to allow
   * associating the label element with the form control.
   *
   * If we don't explicitly pass an `id` prop, we generate one based on the
   * `name` and `label` properties.
   */
  getId: function () {
    if (this.props.id) {
      return this.props.id;
    }
    const label = (typeof this.props.label === 'undefined' ? '' : this.props.label);
    return [
      'frc',
      this.props.name.split('[').join('_').replace(']', ''),
      this.hashString(JSON.stringify(label))
    ].join('-');
  },
  
  hasErrors: function () {
    return !!(this.props.errors && this.props.errors.length);
  },
  
  cleanProps: function (props) {
    const {
      beforeComponent,
      afterComponent,
      addonAfter,
      addonBefore,
      help,
      label,
      hideLabel,
      options,
      layout,
      rowLabel,
      validatePristine,
      validateOnSubmit,
      inputClassName,
      optional,
      throwError,
      currentValues,
      addToDeletedValues,
      deletedValues,
      clearFieldErrors,
      formType,
      inputType,
      showCharsRemaining,
      charsCount,
      charsRemaining,
      handleChange,
      document,
      updateCurrentValues,
      classes,
      errors,
      description,
      clearField,
      regEx,
      ...rest
    } = props;
    
    return rest;
  },
  
  cleanSwitchProps: function (props) {
    const {
      value,
      error,
      ...rest
    } = props;
    
    return rest;
  },
  
};
