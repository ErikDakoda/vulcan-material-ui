import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { withStyles } from 'material-ui/styles';
import { getSetting, Components, replaceComponent } from 'meteor/vulcan:core';
import classNames from 'classnames';


const drawerWidth = 240;
const topBarHeight = 100;


const styles = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    height: `${topBarHeight}px`,
    minHeight: `${topBarHeight}px`,
  },
  headerMid: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    '& h1': {
      margin: '0 24px 0 0',
      fontSize: '18px',
      lineHeight: 1,
    }
  },
  menuButton: {
    marginRight: theme.spacing.unit * 3,
  },
});


const Header = (props, context) => {
  const classes = props.classes;
  const isSideNavOpen = props.isSideNavOpen;
  const toggleSideNav = props.toggleSideNav;
  
  const logoUrl = getSetting('logoUrl');
  const siteTitle = getSetting('title', 'My App');
  const tagline = getSetting('tagline');
  
  return (
    <AppBar className={classNames(classes.appBar, isSideNavOpen && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        
        <IconButton
          color="contrast"
          aria-label="open drawer"
          onClick={e => toggleSideNav()}
          className={classNames(classes.menuButton)}
        >
          {isSideNavOpen ? <ChevronLeftIcon/> : <MenuIcon/>}
        </IconButton>
        
        <div className={classNames(classes.headerMid)}>
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle}/>
          {
            tagline
            
            &&
            
            <Typography type="title" color="inherit" className="tagline">
              {tagline}
            </Typography>
          }
        </div>
        
        {!!props.currentUser ? <Components.UsersMenu/> : <Components.UsersLoggedOutMenu/>}
      
      </Toolbar>
    </AppBar>
  );
};


Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isSideNavOpen: PropTypes.bool,
  toggleSideNav: PropTypes.func,
};


Header.displayName = 'Header';


replaceComponent('Header', Header, [withStyles, styles]);
