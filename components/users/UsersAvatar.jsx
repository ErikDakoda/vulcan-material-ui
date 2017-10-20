import React from 'react';
import PropTypes from 'prop-types';
import { replaceComponent } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';


const styles = theme => ({
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


const UsersAvatar = ({ classes, className, user, size, gutter, link }) => {
  
  const avatarUrl = user.avatarUrl || Users.avatar.getUrl(user);
  
  const avatar =
    <Avatar alt={Users.getDisplayName(user)}
            src={avatarUrl}
            className={classNames(classes.avatar, classes[size], classes[gutter], className)}>
      {!avatarUrl ? Users.avatar.getInitials(user) : null}
    </Avatar>;
  
  
  return (
    <div className={classNames(className)}>
      {
        link
          ?
          <Link to={Users.getProfileUrl(user)}>
            <span>{avatar}</span>
          </Link>
          :
          avatar
      }
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
};


UsersAvatar.defaultProps = {
  size: 'medium',
  gutter: 'right',
  link: true,
};


UsersAvatar.displayName = 'UsersAvatar';


replaceComponent('UsersAvatar', UsersAvatar, [withStyles, styles]);
