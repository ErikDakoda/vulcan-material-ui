import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Formsy from 'formsy-react';
import ComponentMixin from './mixins/component';
import Row from './row';
import withStyles from 'material-ui/styles/withStyles';
import Input, { InputAdornment } from 'material-ui/Input';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { registerComponent } from 'meteor/vulcan:core';
import classNames from 'classnames';


/*{
  container:                'react-autosuggest__container',
  containerOpen:            'react-autosuggest__container--open',
  input:                    'react-autosuggest__input',
  inputOpen:                'react-autosuggest__input--open',
  inputFocused:             'react-autosuggest__input--focused',
  suggestionsContainer:     'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList:          'react-autosuggest__suggestions-list',
  suggestion:               'react-autosuggest__suggestion',
  suggestionFirst:          'react-autosuggest__suggestion--first',
  suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
  sectionContainer:         'react-autosuggest__section-container',
  sectionContainerFirst:    'react-autosuggest__section-container--first',
  sectionTitle:             'react-autosuggest__section-title'
}*/
const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  textField: {
    width: '100%',
    'label + div > &': {
      marginTop: theme.spacing.unit * 2,
    },
  },
  input: {
    outline: 0,
    font: 'inherit',
    color: 'currentColor',
    width: '100%',
    border: '0',
    margin: '0',
    padding: '7px 0',
    display: 'block',
    boxSizing: 'content-box',
    background: 'none',
    verticalAlign: 'middle',
  },
  readOnly: {
    cursor: 'pointer',
  },
  suggestionsContainer: {
    display: 'none',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: theme.zIndex.modal,
    marginBottom: theme.spacing.unit * 3,
  },
  suggestionsContainerOpen: {
    display: 'block',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});


const FormsyMuiSuggest = createReactClass({
  
  mixins: [Formsy.Mixin, ComponentMixin],
  
  propTypes: {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      iconComponent: PropTypes.node,
    })),
    classes: PropTypes.object.isRequired,
    limitToList: PropTypes.bool,
  },
  
  getInitialState: function () {
    if (this.props.refFunction) {
      this.props.refFunction(this);
    }
  
    return {
      inputValue: null,
      suggestions: [],
    };
  },
  
  getInputValue: function () {
    if (this.state.inputValue !== null) {
      return this.state.inputValue;
    }
    const value = this.getValue();
    if (!value) {
      return '';
    }
    const selectedOption = this.props.options.find((opt) => opt.value === value);
    
    return selectedOption ? selectedOption.label : '';
  },
  
  suggestionSelected: function (event, { suggestion, suggestionValue }) {
    event.preventDefault();
    this.setState({
      inputValue: suggestion.label,
    });
    
    this.setValue(suggestionValue);
    this.props.onChange(this.props.name, suggestionValue);
    
    if (this.props.limitToList) {
      setTimeout(() => {document.activeElement.blur();});
    }
  },
  
  validate: function () {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    return true;
  },

  handleInputChange: function (event) {
    const value = event.currentTarget.value;
    this.setState({
      inputValue: value,
    });
  },
  
  
  handleSuggestionsFetchRequested: function ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  },
  
  handleSuggestionsClearRequested: function () {
    this.setState({
      suggestions: [],
    });
  },
  
  shouldRenderSuggestions: function (value) {
    return true;
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
  
    if (this.props.addonAfter || this.props.buttonAfter) {
      endAdornment =
        <InputAdornment position="end">
          {this.props.buttonAfter && this.props.buttonAfter}
          {this.props.addonAfter && this.props.addonAfter}
        </InputAdornment>;
    }
  
    let element = this.renderElement(startAdornment, endAdornment);

    if (this.getLayout() === 'elementOnly') {
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
    const { classes, autoFocus } = this.props;
    
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          input: classNames(classes.input, this.props.limitToList && classes.readOnly),
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestion: classes.suggestion,
          suggestionsList: classes.suggestionsList,
        }}
        renderInputComponent={this.renderInputComponent}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.suggestionSelected}
        inputProps={{
          autoFocus: autoFocus,
          autoComplete: 'off',
          classes,
          onChange: this.handleInputChange,
          value: this.getInputValue(),
          readOnly: this.props.limitToList,
          disabled: this.isFormDisabled() || this.props.disabled,
          startAdornment,
          endAdornment,
        }}
      />
    );
  },
  
  renderInputComponent: function (inputProps) {
    const { classes, autoFocus, value, ref, startAdornment, endAdornment, ...rest } = inputProps;
    
    return (
      <Input
        autoFocus={autoFocus}
        className={classes.textField}
        value={value}
        inputRef={(c) => {
          ref(c);
          this.element = c;
        }}
        type="text"
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        inputProps={{
          ...rest,
        }}
      />
    );
  },
  
  renderSuggestion: function (suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
    
    return (
      <MenuItem selected={isHighlighted} component="div">
        {
          suggestion.iconComponent &&
          suggestion.iconComponent
        }
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
            ) : (
              <strong key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  },
  
  renderSuggestionsContainer: function (options) {
    const { containerProps, children } = options;
    
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  },
  
  getSuggestionValue: function (suggestion) {
    return suggestion.value;
  },
  
  getSuggestions: function (value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    
    return this.props.limitToList ?
  
      this.props.options.filter(suggestion => {
        return true;
      })
  
      :
  
      inputLength === 0
      
      ?
      
      this.props.options.filter(suggestion => {
        count += 1;
        return count <= 5;
      })
      
      :
      
      this.props.options.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
        
        if (keep) {
          count += 1;
        }
        
        return keep;
      });
  },
  
});


export default withStyles(styles)(FormsyMuiSuggest);
registerComponent('FormsyMuiSuggest', FormsyMuiSuggest, [withStyles, styles]);
