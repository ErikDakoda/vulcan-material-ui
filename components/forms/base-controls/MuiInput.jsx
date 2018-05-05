import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import withStyles from 'material-ui/styles/withStyles';
import ComponentMixin from './mixins/component';
import MuiFormControl from './MuiFormControl';
import MuiFormHelper from './MuiFormHelper';
import Input from 'material-ui/Input';
import StartAdornment, { hideStartAdornment } from './StartAdornment';
import EndAdornment from './EndAdornment';


export const styles = theme => ({
  inputRoot: {
    '& .clear-enabled': { opacity: 0 },
    '&:hover .clear-enabled': { opacity: 0.54 },
  },
  inputFocused: {
    '& .clear-enabled': { opacity: 0.54 }
  },
});


//noinspection JSUnusedGlobalSymbols
const MuiInput = createReactClass({
  element: null,
  
  mixins: [ComponentMixin],
  
  displayName: 'MuiInput',
  
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
    errors: PropTypes.array,
    placeholder: PropTypes.string,
  },
  
  getDefaultProps: function () {
    return {
      type: 'text',
    };
  },
  
  handleChange: function (event) {
    const value = event.target.value;
    this.changeValue(value);
  },
  
  changeValue: function (value) {
    this.props.onChange(this.props.name, value);
  },
  
  render: function () {
    const startAdornment = hideStartAdornment(this.props) ? null :
      <StartAdornment {...this.props}
                      classes={null}
      />;
    const endAdornment =
      <EndAdornment {...this.props}
                    classes={null}
                    changeValue={this.changeValue}
      />;
    
    let element = this.renderElement(startAdornment, endAdornment);
    
    if (this.props.layout === 'elementOnly' || this.props.type === 'hidden') {
      return element;
    }
    
    return (
      <MuiFormControl {...this.getFormControlProperties()} htmlFor={this.getId()}>
        {element}
        <MuiFormHelper {...this.getFormHelperProperties()}/>
      </MuiFormControl>
    );
  },
  
  renderElement: function (startAdornment, endAdornment) {
    const { classes, disabled, autoFocus, value } = this.props;
    const options = this.props.options || {};
    
    return (
      <Input
        ref={c => (this.element = c)}
        {...this.cleanProps(this.props)}
        id={this.getId()}
        value={value}
        onChange={this.handleChange}
        disabled={disabled}
        rows={options.rows || this.props.rows}
        autoFocus={options.autoFocus || autoFocus}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        placeholder={this.props.placeholder}
        classes={{ root: classes.inputRoot, focused: classes.inputFocused }}
      />
    );
  },
  
  
});


export default withStyles(styles)(MuiInput);
