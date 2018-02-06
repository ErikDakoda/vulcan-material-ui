import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { CardActions } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    flexDirection: 'row-reverse',
    padding: theme.spacing.unit * 2,
    height: 'auto',
  },
});


export class Buttons extends Component {
  render () {
    
    const {
      classes,
      buttons = {},
      className = 'buttons',
    } = this.props;
  
    return (
      <CardActions className={classNames(classes.root, className)}>
        {Object.keys(buttons).map((id, i) =>
          <Components.AccountsButton {...buttons[id]} key={i}/>
        )}
      </CardActions>
    );
  }
}


Buttons.propTypes = {
  classes: PropTypes.object.isRequired,
  buttons: PropTypes.object,
  className: PropTypes.string,
};


Buttons.displayName = 'AccountsButtons';


replaceComponent('AccountsButtons', Buttons, [withStyles, styles]);
