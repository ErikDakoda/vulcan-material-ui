import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchIcon from 'mdi-material-ui/Magnify';
import ClearIcon from 'mdi-material-ui/CloseCircle';
import Input from '@material-ui/core/Input';
import NoSsr from '@material-ui/core/NoSsr';
import classNames from 'classnames';
import _debounce from 'lodash/debounce';
import autosizeInput from 'autosize-input';

const styles = theme => ({
  
  '@global': {
    'input[type=text]::-ms-clear, input[type=text]::-ms-reveal':
      {
        display: 'none',
        width: 0,
        height: 0,
      },
    'input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button':
      { display: 'none' },
    'input[type="search"]::-webkit-search-results-button, input[type="search"]::-webkit-search-results-decoration':
      { display: 'none' },
  },
  
  root: {
    display: 'inline-flex',
    backgroundColor: theme.palette.common.faintBlack,
    borderRadius: 20,
    padding: 6,
  },
  
  clear: {
    transition: theme.transitions.create('opacity,transform', {
      duration: theme.transitions.duration.short,
    }),
    opacity: 0.65,
    width: 36,
    height: 36,
    margin: -6,
    marginLeft: 0,
    '& svg': {
      width: 16,
      height: 16,
    },
    flexDirection: 'column',
  },
  
  clearDense: {
    width: 32,
    height: 32,
    margin: -4,
    marginLeft: 0,
  },
  
  clearDisabled: {
    opacity: 0,
    pointerEvents: 'none',
  },
  
  dense: {
    padding: 4,
  },
  
  icon: {
    color: theme.palette.common.lightBlack,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  
  input: {
    lineHeight: 1,
    paddingTop: 2,
    paddingBottom: 2,
    marginBottom: 1,
    /*transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),*/
    minWidth: 130,
  },
  
});


class SearchInput extends PureComponent {
  
  constructor (props) {
    super(props);
    
    this.state = {
      value: props.defaultValue || '',
    };
    
    this.input = null;
    this.removeAutosize = null;
    this.triggerResize = null;
    
    this.updateQuery = _debounce(this.updateQuery, 500);
  }
  
  componentDidMount () {
    if (!document) return;
    const element = document.querySelector(`.search-input-${this.props.name} input[type=search]`);
  
    // We have to patch into addEventListener because autosizeInput provides no way to trigger resize
    element._addEventListener = element.addEventListener;
    element.addEventListener = function(type, listener, useCapture) {
      if(useCapture === undefined)
        useCapture = false;
      this._addEventListener(type, listener, useCapture);
      this.triggerResize = listener;
    };

    this.removeAutosize = autosizeInput(element);
    
    this.triggerResize = element.triggerResize;
    element.addEventListener = element._addEventListener;
  
    if (this.props.action) {
      this.props.action({
        setSearch: this.setSearch,
        clearSearch: this.clearSearch,
        focusInput: this.focusInput,
      });
    }
  }
  
  
  componentWillUnmount () {
    if (this.removeAutosize) {
      this.removeAutosize();
    }
  }
  
  
  handleShortcutKeys = (key, event) => {
    switch (key) {
      case 's':
      case 'f':
        this.focusInput();
        event.preventDefault();
        break;
      case 'c':
      case 'esc':
        this.clearSearch(true);
        event.preventDefault();
        break;
    }
  };
  
  
  handleFocus = () => {
    this.input.select();
  };
  
  
  focusInput = (event) => {
    this.input.focus();
  };
  
  
  clearSearch = (dontFocus) => {
    this.setState({ value: '' }, this.triggerResize);
    this.updateQuery('');
  
    if (!dontFocus) {
      this.focusInput();
    }
  };
  
  
  updateSearch = (event) => {
    const value = event.target.value;
    this.setSearch(value);
  };
  
  
  setSearch = (value) => {
    this.setState({ value: value }, this.triggerResize);
    this.updateQuery(value);
  };
  
  
  updateQuery = (value) => {
    this.props.updateQuery(value);
  };
  
  
  render () {
    const {
      classes,
      className,
      dense,
      noShortcuts,
      name,
    } = this.props;
    
    const searchIcon = <SearchIcon className={classes.icon} onClick={this.focusInput}/>;
    
    const clearButton = <Components.TooltipButton
      titleId="search.clear"
      icon={<ClearIcon/>}
      onClick={() => { this.clearSearch(); }}
      classes={{
        root: classNames(!this.state.value && classes.clearDisabled),
        button: classNames('clear-button', classes.clear, dense && classes.clearDense),
      }}
      disabled={!this.state.value}
    />;
    
    return (
      <React.Fragment>
        <Input className={classNames('search-input', `search-input-${name}`, classes.root, dense && classes.dense, className)}
               classes={{ input: classes.input }}
               id={`search-input-${name}`}
               name={name}
               inputRef={input => this.input = input}
               value={this.state.value}
               type="search"
               onChange={this.updateSearch}
               onFocus={this.handleFocus}
               disableUnderline={true}
               startAdornment={searchIcon}
               endAdornment={clearButton}
        />
        <NoSsr>
          {
            !noShortcuts &&
            <Components.KeyboardHandler handleKeys={['s', 'c', 'esc']} onKeyEvent={this.handleShortcutKeys}/>
          }
        </NoSsr>
      </React.Fragment>
    );
  }
  
}


SearchInput.propTypes = {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   *         setSearch(value)
   *         clearSearch(dontFocus)
   *         focusInput()
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,
  classes: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool,
  noShortcuts: PropTypes.bool,
  name: PropTypes.string.isRequired,
};


SearchInput.defaultProps = {
  name: 'search',
};


SearchInput.displayName = 'SearchInput';


registerComponent('SearchInput', SearchInput, [withStyles, styles]);
