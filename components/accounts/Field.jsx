import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import TextField from 'material-ui/TextField';


export class AccountsField extends PureComponent {
  
  
  constructor (props) {
    super(props);
    this.state = {
      mount: true
    };
  }
  
  
  triggerUpdate () {
    // Trigger an onChange on initial load, to support browser pre-filled values.
    const { onChange } = this.props;
    if (this.input && onChange) {
      onChange({ target: { value: this.input.value } });
    }
  }
  
  
  componentDidMount () {
    this.triggerUpdate();
  }
  
  
  componentDidUpdate (prevProps) {
    // Re-mount component so that we don't expose browser pre-filled passwords if the component was
    // a password before and now something else.
    if (prevProps.id !== this.props.id) {
      this.setState({ mount: false });
    } else if (!this.state.mount) {
      this.setState({ mount: true });
      this.triggerUpdate();
    }
  }
  
  
  render () {
    const {
      id,
      hint,
      label,
      type = 'text',
      onChange,
      required = false,
      className = 'field',
      defaultValue = '',
      autoFocus,
      message,
    } = this.props;
    const { mount = true } = this.state;
    
    if (type === 'notice') {
      return <div className={className}>{label}</div>;
    }
    
    return (
      mount &&
      
      <div className={className} style={{ marginBottom: '10px' }}>
        <TextField
          id={id}
          type={type}
          label={label}
          placeholder={hint}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          onChange={onChange}
          required={required}
          error={!!message}
          helperText={message && message.message}
          fullWidth
        />
      </div>
    );
  }
}


AccountsField.propTypes = {
  onChange: PropTypes.func,
};


replaceComponent('AccountsField', AccountsField);
