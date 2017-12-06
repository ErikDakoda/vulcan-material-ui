import React from 'react';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { CardContent } from 'material-ui/Card';


export class AccountsFields extends React.Component {
  render () {
    const {
      fields = {},
    } = this.props;
    
    return (
      <CardContent>
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
