import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { replaceComponent, Utils } from 'meteor/vulcan:core';
import classNames from 'classnames';


export class AccountsButton extends PureComponent {
  render () {
    
    const {
      label,
      type,
      disabled = false,
      className,
      onClick
    } = this.props;
    
    return (
      <Button
        raised={type !== 'link'}
        dense={type === 'link'}
        color="primary"
        className={classNames(`button-${Utils.slugify(label)}`, className)}
        type={type}
        disabled={disabled}
        onClick={onClick}>
        {label}
      </Button>
    );
  }
}


AccountsButton.propTypes = {
  onClick: PropTypes.func,
};


replaceComponent('AccountsButton', AccountsButton);
