import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Components, registerComponent } from 'meteor/vulcan:core';


export class AccountsForm extends PureComponent {
  
  
  /*constructor (props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }*/
  
  
  componentDidMount () {
    let form = this.form;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
      });
    }
  }
  
  
  /*handleSubmit (event) {
    event.preventDefault();
    const buttons = this.props.buttons;
    buttons.signIn.onClick(event);
  }*/
  
  
  render () {
    const {
      oauthServices,
      fields,
      buttons,
      messages,
      ready = true,
      className
    } = this.props;
    
    return (
      <form ref={(ref) => this.form = ref}
            className={classNames(className, 'accounts-ui', { 'ready': ready, })}
            noValidate
      >
        <Components.AccountsFields fields={fields}/>
        <Components.AccountsButtons buttons={buttons}/>
        <Components.AccountsPasswordOrService oauthServices={oauthServices}/>
        <Components.AccountsSocialButtons oauthServices={oauthServices}/>
        <Components.AccountsFormMessages messages={messages}/>
      </form>
    );
  }
  
  
}


AccountsForm.propTypes = {
  oauthServices: PropTypes.object,
  fields: PropTypes.object.isRequired,
  buttons: PropTypes.object.isRequired,
  error: PropTypes.string,
  ready: PropTypes.bool
};


AccountsForm.displayName = 'ShopsSuppliers';


registerComponent('AccountsForm', AccountsForm);
