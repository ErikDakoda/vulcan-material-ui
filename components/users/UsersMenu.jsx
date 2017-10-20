import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';
import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import List, { ListItem } from 'material-ui/List';
import { Meteor } from 'meteor/meteor';
import { withApollo } from 'react-apollo';
import Popover from 'material-ui/Popover';
import ButtonBase from 'material-ui/ButtonBase';


class UsersMenu extends PureComponent {
  
  
  constructor (props) {
    super(props);
    
    this.handleRequestLogout = this.handleRequestLogout.bind(this);
    
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
  
  
  handleRequestLogout = () => {
    Meteor.logout(() => this.props.client.resetStore());
    this.handleRequestClose();
  };
  
  
  render () {
    const {
      popupOpen,
      anchorEl,
    } = this.state;
    
    const {
      currentUser,
      client,
    } = this.props;
    
    return (
      <div className="users-account-menu">
        <ButtonBase ref={node => {this.button = node;}} onClick={this.handleClickButton}>
          <Components.UsersAvatar user={currentUser} link={false} gutter="none"/>
        </ButtonBase>
        
        <Popover
          open={popupOpen}
          anchorEl={anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          transformOrigin={{ vertical: 'top', horizontal: 'right', }}
        >
          <List>
            <ListItem button onClick={() => {
              browserHistory.push(`/users/${currentUser.slug}`);
              this.handleRequestClose();
            }}>
              <FormattedMessage id="users.profile"/>
            </ListItem>
            <ListItem button onClick={() => {
              browserHistory.push(`/account`);
              this.handleRequestClose();
            }}>
              <FormattedMessage id="users.edit_account"/>
            </ListItem>
            <ListItem button onClick={() => {
              Meteor.logout(() => client.resetStore());
              browserHistory.push(`/`);
              this.handleRequestClose();
            }}>
              <FormattedMessage id="users.log_out"/>
            </ListItem>
          </List>
        </Popover>
      </div>
    );
  }
  
  
}


UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};


UsersMenu.displayName = 'UsersMenu';


replaceComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
