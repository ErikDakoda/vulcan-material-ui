import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import SearchIcon from 'mdi-material-ui/Magnify';
import ClearIcon from 'mdi-material-ui/CloseCircle';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import { FormControl } from 'material-ui/Form';
import classNames from 'classnames';
import _debounce from 'lodash/debounce';


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
    width: 220,
    backgroundColor: theme.palette.common.faintBlack,
    borderRadius: 20,
    padding: 6,
  },
  clear: {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),
    opacity: 0.65,
    width: 36,
    height: 36,
    margin: -6,
    marginLeft: 0,
    '& svg': {
      width: 16
    },
  },
  dense: {
    '& $root': {
      width: 200,
      padding: 4,
    },
    '& $clear': {
      width: 32,
      height: 32,
      margin: -4,
      marginLeft: 0,
    }
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
  },
  clearDisabled: {
    opacity: 0,
  }
});


class SearchInput extends PureComponent {
  
  constructor (props) {
    super(props);
    
    this.state = {
      value: props.defaultValue || '',
    };
    
    this.focusInput = this.focusInput.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateQuery = _debounce(this.updateQuery, 500);
  }
  
  focusInput () {
    this.input.focus();
  }
  
  clearSearch () {
    this.setState({
      value: '',
    });
    this.updateQuery('');
  }
  
  updateSearch (event) {
    //event.preventDefault();
    
    const value = event.target.value;
    this.setState({
      value: value
    });
    this.updateQuery(value);
  }
  
  updateQuery (value) {
    this.props.updateQuery(value);
  }
  
  render () {
    const {
      classes,
      className,
      dense
    } = this.props;
    
    const searchIcon = <SearchIcon className={classes.icon} onClick={this.focusInput}/>;
    
    const clearButton = <IconButton
      className={classNames('clear-button', classes.clear, !this.state.value &&
        classes.clearDisabled)}
      onClick={this.clearSearch}
      disabled={!this.state.value}
    >
      <ClearIcon/>
    </IconButton>;
    
    return (
        <Input className={classNames('search-input', classes.root, className, dense && classes.dense)}
               classes={{ input: classes.input }}
               id="search-input"
               inputRef={(input) => this.input = input}
               value={this.state.value}
               type="search"
               onChange={this.updateSearch}
               disableUnderline={true}
               startAdornment={searchIcon}
               endAdornment={clearButton}
        />
    );
  }
  
}


SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool,
};


SearchInput.displayName = 'SearchInput';


registerComponent('SearchInput', SearchInput, [withStyles, styles]);
