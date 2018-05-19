import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { instantiateComponent } from 'meteor/vulcan:lib';
import { withStyles } from '@material-ui/core/styles';
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

  renderComponent = () => {
    const { input, inputType, formType } = this.props;
    const properties = this.getProperties();

    // if input is a React component, use it
    if (typeof input === 'function') {
      const InputComponent = input;
      return <InputComponent {...properties} />;
    } else {
      // else pick a predefined component

      switch (inputType) {
        case 'text':
          return <MuiInput {...properties}/>;

        case 'nested':
          return <Components.FormNested {...properties} />;

        case 'number':
          return <MuiInput {...properties} type="number"/>;

        case 'url':
          return <MuiInput {...properties} type="url"/>;

        case 'email':
          return <MuiInput {...properties} type="email"/>;

        case 'textarea':
          return <MuiInput {...properties}
                           multiline={true}
                           rows={properties.rows ? properties.rows : 2}
                           rowsMax={10}
          />;

        case 'checkbox':
          properties.value = !!properties.value;
          return <MuiSwitch {...properties}/>;

        case 'checkboxgroup':
          if (!Array.isArray(properties.value)) {
            properties.value = [properties.value];
          }
          // in case of checkbox groups, check "checked" option to populate value if this is a "new
          // document" form
          const checkedValues = _.where(properties.options, { checked: true })
          .map(option => option.value);
          if (checkedValues.length && !properties.value && formType === 'new') {
            properties.value = checkedValues;
          }
          return <MuiCheckboxGroup {...properties}/>;

        case 'radiogroup':
          return <MuiRadioGroup {...properties}/>;

        case 'select':
          const noneOption = {
            label: '',
            value: '',
            disabled: true,
          };
          properties.options = [noneOption, ...properties.options];
          return <MuiSelect {...properties}/>;

        case 'selectmultiple':
          properties.multiple = true;
          return <MuiSelect {...properties}/>;

        case 'datetime':
          return <Components.FormComponentDateTime {...properties}/>;

        case 'date':
          return <Date {...properties}/>;

        case 'time':
          return <Components.Time {...properties}/>;

        default:
          const CustomComponent = Components[input];
          return CustomComponent ? (
            <CustomComponent {...properties} />
          ) : (
            <MuiInput {...properties}/>
          );
      }
    }
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
        {this.renderComponent(properties)}
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
};


FormComponentInner.displayName = 'FormComponentInner';


replaceComponent('FormComponentInner', FormComponentInner, [withStyles, styles]);
