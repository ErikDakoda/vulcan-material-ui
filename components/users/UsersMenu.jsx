import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';
import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import List, { ListItem } from 'material-ui/List';
import { Meteor } from 'meteor/meteor';
import { withApollo } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Popover from 'material-ui/Popover';


const styles = theme => ({
  avatar: {
    padding: '5px',
  },
  popover: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  }
});


class UsersMenu extends PureComponent {
  
  
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
      anchorEl: findDOMNode(this.button), // eslint-disable-line react/no-find-dom-node
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
    
    const {
      classes,
      currentUser,
      client,
    } = this.props;
    
    return (
      <div className="users-account-menu">
        
        <Components.UsersAvatar user={currentUser}
                                gutter="none"
                                buttonRef={node => {this.button = node;}}
                                onClick={this.handleClickButton}
                                className={classes.avatar}
        />
        
        <Popover open={popupOpen}
                 anchorEl={anchorEl}
                 onRequestClose={this.handleRequestClose}
                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                 transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                 className={classes.popover}
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
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  client: PropTypes.object,
};


UsersMenu.displayName = 'UsersMenu';


replaceComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo, [withStyles, styles]);
