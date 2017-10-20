import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { getSetting, Components, replaceComponent } from 'meteor/vulcan:core';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const drawerWidth = 240;
const topBarHeight = 100;


const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      overflow: 'hidden',
    },
    body: {
      margin: 0,
    },
  },
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    height: '100vh',
    alignItems: 'stretch',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    paddingTop: `${topBarHeight}px`,
    backgroundColor: theme.palette.background[200],
  },
  drawerHeader: {
    height: `${topBarHeight}px !important`,
    minHeight: `${topBarHeight}px !important`,
  },
  content: {
    padding: theme.spacing.unit * 8,
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: `calc(100% - ${topBarHeight}px)`,
    marginTop: topBarHeight,
    overflowY: 'scroll',
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});


class Layout extends React.Component {
  state = {
    isOpen: { sideNav: true }
  };
  
  toggle = (item, openOrClose) => {
    const newState = { isOpen: {} };
    newState.isOpen[item] = typeof openOrClose === 'string' ?
      openOrClose === 'open' :
      !this.state.isOpen[item];
    this.setState(newState);
  };
  
  render = () => {
    const currentUser = this.props.currentUser;
    const currentRouteName = this.props.currentRoute.name.replace('.', '-');
    const classes = this.props.classes;
    const isOpen = this.state.isOpen;
  
    return (
          <div className={classNames(classes.root, 'wrapper', `wrapper-${currentRouteName}`)}>
            <div className={classes.appFrame}>
              
              {
                currentUser &&
                
                <Components.UsersProfileCheck currentUser={currentUser}
                                              documentId={currentUser._id}
                />
              }
              
              <Components.Header isSideNavOpen={isOpen.sideNav}
                                 toggleSideNav={openOrClose => this.toggle('sideNav',
                                   openOrClose)}/>
              
              <Drawer type="persistent"
                      classes={{ paper: classes.drawerPaper, }}
                      open={isOpen.sideNav}
              >
                <AppBar className={classes.drawerHeader} elevation={4} square={true}>
                  <Toolbar>
                  </Toolbar>
                </AppBar>
                <Components.SideNavigation/>
              </Drawer>
              
              <main className={classNames(classes.content, isOpen.sideNav && classes.contentShift)}>
                {this.props.children}
              </main>
              
              <Components.FlashMessages/>
            
            </div>
          </div>
    );
  };
}


Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
};


Layout.displayName = 'Layout';


replaceComponent('Layout', Layout, [withStyles, styles]);
