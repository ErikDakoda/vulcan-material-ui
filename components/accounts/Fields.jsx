import React, { Component } from 'react';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import CardContent from '@material-ui/core/CardContent';


export class AccountsFields extends Component {
  render () {
    const {
      fields = {},
      className = 'fields'
    } = this.props;

    return (
      <CardContent className={className}>
        {
          Object.keys(fields).map((id, i) =>
            <Components.AccountsField {...fields[id]} autoFocus={i === 0} key={i}/>
          )
        }
      </CardContent>
    );
  }
}


replaceComponent('AccountsFields', AccountsFields);
