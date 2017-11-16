import React from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import { browserHistory } from 'react-router';
import Users from 'meteor/vulcan:users';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    padding: 0,
    borderRadius: '50%',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  avatar: {
  },
  small: {
    width: '20px',
    height: '20px',
  },
  medium: {
    width: '40px',
    height: '40px',
  },
  large: {
    width: '60px',
    height: '60px',
  },
  left: {
    marginLeft: theme.spacing.unit,
  },
  right: {
    marginRight: theme.spacing.unit,
  },
  both: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  none: {},
});


const UsersAvatar = ({
                       classes,
                       className,
                       user,
                       size,
                       gutter,
                       link,
                       buttonRef,
                       onClick
                     }) => {
  
  let avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);
  if (avatarUrl.indexOf('gravatar.com') > -1) avatarUrl = null;
  
  const avatar =
    <Avatar alt={Users.getDisplayName(user)}
            src={avatarUrl}
            className={classNames(classes.avatar, classes[size], classes[gutter])}>
      {
        !avatarUrl
        ?
        Users.avatar.getInitials(user)
        :
        null
      }
    </Avatar>;
  
  onClick = onClick || function () { browserHistory.go(Users.getProfileUrl(user)); };
  
  const rootClassNames = classNames(classes.root, className);
  
  return (
    link
      
      ?
      
      <ButtonBase className={rootClassNames} ref={buttonRef} onClick={onClick}>
        {avatar}
      </ButtonBase>
      
      :
      
      <div className={rootClassNames}>
        {avatar}
      </div>
  );
  
};


UsersAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  gutter: PropTypes.oneOf(['left', 'right', 'both', 'none']),
  link: PropTypes.bool,
  buttonRef: PropTypes.func,
  onClick: PropTypes.func,
};


UsersAvatar.defaultProps = {
  size: 'medium',
  gutter: 'right',
  link: true,
};


UsersAvatar.displayName = 'UsersAvatar';


replaceComponent('UsersAvatar', UsersAvatar, [withStyles, styles]);
