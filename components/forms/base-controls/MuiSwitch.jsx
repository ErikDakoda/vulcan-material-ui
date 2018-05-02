import React from 'react';
import createReactClass from 'create-react-class';
import ComponentMixin from './mixins/component';
import Row from './Row';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import propUtilities from './prop-utilities';


const MuiSwitch = createReactClass({
  
  mixins: [ComponentMixin],
  
  getDefaultProps: function () {
    return {
      label: '',
      rowLabel: '',
      value: false
    };
  },
  
  changeValue: function (event) {
    const target = event.target;
    const value = target.checked;
    
    //this.setValue(value);
    this.props.onChange(this.props.name, value);
    
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
            checked={this.props.value === true}
            onChange={this.changeValue}
            disabled={this.props.disabled}
          />
        }
        label={this.props.label}
      />
    );
  },
  
});


export default MuiSwitch;
