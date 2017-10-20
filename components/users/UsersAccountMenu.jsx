import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover';


const styles = theme => ({});


class UsersAccountMenu extends PureComponent {
  
  
  constructor (props) {
    super(props);
    
    this.state = {
      popupOpen: false,
      anchorEl: null,
    };
  }
  
  
  handleClickButton = () => {
    this.setState({
      popupOpen: true,
      anchorEl: findDOMNode(this.button),
    });
  };
  
  
  handleRequestClose = () => {
    this.setState({
      popupOpen: false,
    });
  };
  
  
  render () {
    const {
      popupOpen,
      anchorEl,
    } = this.state;
    
    return (
      <div className="users-account-menu">
        <Button color="contrast"
                ref={node => {this.button = node;}}
                onClick={this.handleClickButton}
        >
          <FormattedMessage id="users.log_in"/>/<FormattedMessage id="users.sign_up"/>
        </Button>
        
        <Popover
          open={popupOpen}
          anchorEl={anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          transformOrigin={{ vertical: 'top', horizontal: 'right', }}
        >
          <Components.AccountsLoginForm/>
        </Popover>
      </div>
    );
  }
  
  
}


UsersAccountMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};


UsersAccountMenu.displayName = 'UsersAccountMenu';


replaceComponent('UsersAccountMenu', UsersAccountMenu, [withStyles, styles]);
