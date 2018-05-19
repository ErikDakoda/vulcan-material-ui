import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ComponentMixin from './mixins/component';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { registerComponent } from 'meteor/vulcan:core';
import StartAdornment, { hideStartAdornment } from './StartAdornment';
import EndAdornment from './EndAdornment';
import MuiFormControl from './MuiFormControl';
import MuiFormHelper from './MuiFormHelper';
import _isEqual from 'lodash/isEqual';
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
    '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::after, &:after':
      { display: 'none' },
    '&::-webkit-search-results, &::-webkit-search-results-decoration':
      { display: 'none' },
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
  suggestionIcon: {
    marginRight: theme.spacing.unit * 2,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  inputRoot: {
    '& .clear-enabled': { opacity: 0 },
    '&:hover .clear-enabled': { opacity: 0.54 },
  },
  inputFocused: {
    '& .clear-enabled': { opacity: 0.54 }
  },
});


const MuiSuggest = createReactClass({

  element: null,

  mixins: [ComponentMixin],

  propTypes: {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      iconComponent: PropTypes.node,
    })),
    classes: PropTypes.object.isRequired,
    limitToList: PropTypes.bool,
    disableText: PropTypes.bool,
  },

  getInitialState: function () {
    if (this.props.refFunction) {
      this.props.refFunction(this);
    }

    const selectedOption = this.getSelectedOption();
    return {
      inputValue: selectedOption.label,
      selectedOption: selectedOption,
      suggestions: [],
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.state.value ||
      nextProps.options !== this.props.options) {
      const selectedOption = this.getSelectedOption(nextProps);
      this.setState({
        inputValue: selectedOption.label,
        selectedOption: selectedOption,
      });
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return !_isEqual(nextState, this.state) ||
      nextProps.options !== this.props.options;
  },

  getSelectedOption: function (props) {
    props = props || this.props;
    const selectedOption = props.options.find((opt) => opt.value === props.value);
    return selectedOption || { label: '', value: null };
  },

  handleBlur: function (event, { highlightedSuggestion: suggestion }) {
    event.persist();

    if (suggestion) {
      this.changeValue(suggestion);
    } else if (this.props.limitToList) {
      const selectedOption = this.getSelectedOption();
      this.setState({
        inputValue: selectedOption.label,
      });
    }
  },

  suggestionSelected: function (event, { suggestion }) {
    event.preventDefault();

    this.changeValue(suggestion);

    if (this.props.disableText) {
      setTimeout(() => {document.activeElement.blur();});
    }
  },

  changeValue: function (suggestion) {
    if (!suggestion) {
      suggestion = { label: '', value: null };
    }
    this.setState({
      selectedOption: suggestion,
      inputValue: suggestion.label,
    });
    this.props.onChange(this.props.name, suggestion.value);
  },

  handleInputChange: function (event) {
    const value = event.target.value;
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
    const value = this.props.value;

    const startAdornment = hideStartAdornment(this.props) ? null :
      <StartAdornment {...this.props}
                      value={value}
                      classes={null}
      />;
    const endAdornment =
      <EndAdornment {...this.props}
                    value={value}
                    classes={null}
                    changeValue={this.changeValue}
      />;

    const element = this.renderElement(startAdornment, endAdornment);

    if (this.props.layout === 'elementOnly') {
      return element;
    }

    return (
      <MuiFormControl{...this.getFormControlProperties()} htmlFor={this.getId()}>
        {element}
        <MuiFormHelper {...this.getFormHelperProperties()}/>
      </MuiFormControl>
    );
  },

  renderElement: function (startAdornment, endAdornment) {
    const { classes, autoFocus, disableText } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          input: classNames(classes.input, this.props.disableText && classes.readOnly),
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestion: classes.suggestion,
          suggestionsList: classes.suggestionsList,
        }}
        highlightFirstSuggestion={!disableText}
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
          onBlur: this.handleBlur,
          value: this.state.inputValue,
          readOnly: this.props.disableText,
          disabled: this.props.disabled,
          startAdornment,
          endAdornment,
        }}
      />
    );
  },

  renderInputComponent: function (inputProps) {
    const { classes, autoFocus, autoComplete, value, ref, startAdornment, endAdornment, ...rest } = inputProps;

    return (
      <Input
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        className={classes.textField}
        classes={{ root: classes.inputRoot, focused: classes.inputFocused }}
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
          <div className={this.props.classes.suggestionIcon}>
            {suggestion.iconComponent}
          </div>
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

    return this.props.disableText ?

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


export default withStyles(styles)(MuiSuggest);
registerComponent('MuiSuggest', MuiSuggest, [withStyles, styles]);
