import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Formsy from 'formsy-react';
import ComponentMixin from './mixins/component';
import withStyles from 'material-ui/styles/withStyles';
import Row from './row';
import { FormControlLabel, } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import classNames from 'classnames';


const styles = theme => ({
  group: {
    marginTop: '8px',
  },
  inline: {
    flexDirection: 'row',
    '& > label': {
      marginRight: theme.spacing.unit * 5,
    },
  },
  twoColumn: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      '& > label': {
        marginRight: theme.spacing.unit * 5,
      },
    },
    [theme.breakpoints.up('md')]: {
      '& > label': {
        width: '49%',
      },
    },
  },
  threeColumn: {
    display: 'block',
    [theme.breakpoints.down('xs')]: {
      '& > label': {
        marginRight: theme.spacing.unit * 5,
      },
    },
    [theme.breakpoints.up('xs')]: {
      '& > label': {
        width: '49%',
      },
    },
    [theme.breakpoints.up('md')]: {
      '& > label': {
        width: '32%',
      },
    },
  },
  radio: {
    width: '32px',
    height: '32px',
    marginLeft: '8px',
  },
});


const FormsyMuiRadioGroup = createReactClass({
  
  mixins: [Formsy.Mixin, ComponentMixin],
  
  propTypes: {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['inline', 'stacked']),
    options: PropTypes.array.isRequired
  },
  
  getInitialState: function () {
    if (this.props.refFunction) {
      this.props.refFunction(this);
    }
  },
  
  getDefaultProps: function () {
    return {
      type: 'stacked',
      label: '',
      help: null,
      classes: PropTypes.object.isRequired,
    };
  },
  
  changeRadio: function (event) {
    const value = event.currentTarget.value;
    this.setValue(value);
    this.props.onChange(this.props.name, value);
  },
  
  validate: function () {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    return true;
  },
  
  renderElement: function () {
    const controls = this.props.options.map((radio, key) => {
      let checked = (this.getValue() === radio.value);
      let disabled = this.isFormDisabled() || radio.disabled || this.props.disabled;
      
      return (
        <FormControlLabel
          key={key}
          value={radio.value}
          control={<Radio
            className={this.props.classes.radio}
            inputRef={(c) => this['element-' + key] = c}
            checked={checked}
            disabled={disabled}
          />}
          label={radio.label}
        />
      );
    });
    
    const maxLength = this.props.options.reduce((max, option) =>
      option.label.length > max ? option.label.length : max, 0);
    
    let columnClass = maxLength < 18 ? 'threeColumn' : maxLength < 30 ? 'twoColumn' : '';
    if (this.props.type === 'inline') columnClass = 'inline';
    
    return (
      <RadioGroup
        aria-label={this.props.name}
        name={this.props.name}
        className={classNames(this.props.classes.group, this.props.classes[columnClass])}
        value={this.getValue()}
        onChange={this.changeRadio}
      >
        {controls}
      </RadioGroup>
    );
  },
  
  render: function () {
    
    if (this.getLayout() === 'elementOnly') {
      return (
        <div>{this.renderElement()}</div>
      );
    }
    
    return (
      <Row
        {...this.getRowProperties()}
        fakeLabel={true}
      >
        {this.renderElement()}
        {this.renderHelp()}
        {this.renderErrorMessage()}
      </Row>
    );
  }
});


export default withStyles(styles)(FormsyMuiRadioGroup);
