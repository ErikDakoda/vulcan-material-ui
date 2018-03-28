import React from 'react';
import createReactClass from 'create-react-class';
import Formsy from 'formsy-react';
import ComponentMixin from './mixins/component';
import Row from './row';
import propUtilities from './prop-utilities';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import _isArray from 'lodash/isArray';


const FormsyMuiSelect = createReactClass({
  
  mixins: [Formsy.Mixin, ComponentMixin],
  
  changeValue: function (event) {
    const target = event.currentTarget;
    let value;
    if (this.props.multiple) {
      value = [];
      for (let i = 0; i < target.length; i++) {
        const option = target.options[i];
        if (option.selected) {
          value.push(option.value);
        }
      }
    } else {
      value = target.value;
    }
    this.setValue(value);
    this.props.onChange(this.props.name, value);
  },
  
  render: function () {
    if (this.getLayout() === 'elementOnly') {
      return this.renderElement();
    }
    
    return (
      <Row
        {...this.getRowProperties()}
        htmlFor={this.getId()}
      >
        {this.renderElement()}
        {this.renderHelp()}
        {this.renderErrorMessage()}
      </Row>
    );
  },
  
  renderElement: function () {
    const renderOption = function (item, key) {
      const { group, label, ...rest } = item;
      return (
        <option key={key} {...rest}>{key ? label : ''}</option>
      );
    };
    
    const options = this.props.options;
    
    let groups = options.filter(function (item) {
      return item.group;
    }).map(function (item) {
      return item.group;
    });
    // Get the unique items in group.
    groups = [...new Set(groups)];
    
    let optionNodes = [];
    
    if (groups.length === 0) {
      optionNodes = options.map(function (item, index) {
        return renderOption(item, index);
      });
    } else {
      // For items without groups.
      const itemsWithoutGroup = options.filter(function (item) {
        return !item.group;
      });
      
      itemsWithoutGroup.forEach(function (item, index) {
        optionNodes.push(renderOption(item, 'no-group-' + index));
      });
      
      groups.forEach(function (group, groupIndex) {
        
        const groupItems = options.filter(function (item) {
          return item.group === group;
        });
        
        const groupOptionNodes = groupItems.map(function (item, index) {
          return renderOption(item, groupIndex + '-' + index);
        });
        
        optionNodes.push(<optgroup label={group} key={groupIndex}>{groupOptionNodes}</optgroup>);
      });
    }
    
    let value = this.getValue();
    if (!this.props.multiple && _isArray(value)) {
      value = value.length ? value[0] : '';
    }
    
    return (
      <Select native={true}
              ref={(c) => this.element = c}
              {...propUtilities.cleanProps(this.props)}
              value={value}
              onChange={this.changeValue}
              disabled={this.isFormDisabled() || this.props.disabled}
              input={<Input id={this.getId()}/>}
      >
        {optionNodes}
      </Select>
    );
  }
});


export default FormsyMuiSelect;
