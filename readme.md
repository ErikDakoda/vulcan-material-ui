
# erikdakoda:vulcan-material-ui 0.13.9

Replacement for [Vulcan](http://vulcanjs.org/) components using [Material-UI](https://material-ui-next.com/). 
It's based on the latest [v1-beta branch](https://github.com/callemall/material-ui/tree/v1-beta) of Material-UI.

This package is progressing and is now beta quality. Further changes are likely to come and I will likely break out
the example layout into a separate package. To give me feedback open an issue on GitHub
or you can reach me on the [Vulcan Slack](https://vulcanjs.slack.com) channel as erikdakoda.

This version has been tested against Vulcan 1.8.9 and Material UI v1.0.0-beta.35.

NOTE: Material UI is still in beta and the API is still in flux. 
If you are experiencing problems, try locking your project to 
v1.0.0-beta.35 by removing the ^ before the version number in your package.json.

``` json
    "material-ui": "1.0.0-beta.35",
```

There are some nice bonus features like a CountrySelect with autocomplete and theming.

All components that use bootstrap in vulcan:core, vulcan:forms and vulcan:accounts 
have been implemented except for Icon and DateTime (but they will still work).

## Installation

To add vulcan-material-ui to an existing Vulcan project, enter the following:

``` sh
$ meteor add erikdakoda:vulcan-material-ui

$ meteor npm install --save material-ui@next
$ meteor npm install --save mdi-material-ui
$ meteor npm install --save react-autosuggest
$ meteor npm install --save autosuggest-highlight
```

> IMPORTANT: Please note that I have abandoned material-ui-icons in favor of mdi-material-ui because it has a much larger [selection of icons](https://materialdesignicons.com/).

To activate the example layout copy the three components to your project and import them:

``` javascript
import './example/Header',
import './example/Layout',
import './example/SideNavigation',
```

## Theming

For an example theme see `modules/sampleTheme.js`. For a complete list of values you can customize, 
see the [MUI Default Theme](https://material-ui-next.com/customization/theme-default/). 

Register your theme in the Vulcan environment by giving it a name: `registerTheme('MyTheme', theme);`. 
You can have multiple themes registered and you can specify which one to use in your settings file using the `muiTheme` public setting.

In addition to the Material UI spec, I use a `utils` section in my themes where I place global variables for reusable styles. 
For example the sample theme contains 

```
const theme = {
  
  . . .
  
  utils: {
    
    tooltipEnterDelay: 700,
    
    errorMessage: {
      textAlign: 'center',
      backgroundColor: red[500],
      color: 'white',
      borderRadius: '4px',
    },
    
    . . .
    
    // additional utils definitions go here
    
  },
  
};
```

You can use tooltipEnterDelay (or any other variable you define in utils) anywhere you include the withTheme HOC. See `/components/bonus/TooltipIconButton.jsx` for an example.

You can use errorMessage (or any other style fragment you define in utils) anywhere you include the withStyles HOC. See `/components/accounts/Form.jsx` for an example.

## Form Controls

You can pass a couple of extra options to text inputs from the `form` property of your schema:

``` javascript
  userKey: {
    type: String,
    label: 'User key',
    description: 'The user’s key',
    optional: true,
    form: {
      autoFocus: true,                  // focus this input when the form loads
      addonBefore: () => <KeyIcon/>,    // adorn the start of the input
      addonAfter: () => <KeyIcon/>,     // adorn the end of the input
      inputClassName: 'halfWidthLeft',  // add this class to the input
      hideLabel: true,                  // hide the label
      help: 'Enter your key here',      // add help text below the input
      getHidden: () => function () {    // function that returns true if input
        return !this.document.useKey;   //   should be temporarily hidden
      },
    },
    group: platformGroup,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
```

And to textarea inputs:

``` javascript
    form: {
      rows: 10,
    },
```

## Form Groups

You can pass a couple of extra options form groups as well:

``` javascript
  const platformGroup: {
    name: 'shops.platform',
    order: 4,
    startComponent: 'ShopsPlatformTitle', // component to put at the top of the form group
    endComponent: 'ShopsConnectButtons', // component to put at the bottom of the form group
  },

```

## DataTable

You can pass the DataTable component an `editComponent` property in addition to or instead of `showEdit`. Here is a simplified example:

``` javascript
const AgendaJobActions = ({ collection, document }) => {
  const executeAgent = () => {
    Meteor.call('executeAgent', document.agentId);
  };
  
  return <Components.TooltipIconButton titleId="executions.execute"
                                       icon={<Components.ExecutionsIcon/>}
                                       onClick={executeAgent}/>;
};

AgendaJobActionsInner.propTypes = {
  collecion: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
};

<Components.Datatable
  editComponent={AgendaJobActions}
  collection={AgendaJobs}
   ...
/>
```

You can also control the spacing of the table cells using the `dense` property. Valid values are:

| Value   | Description  |
| ------- | ------------ |
| dense   | right cell padding of 16px instead of 56px |
| flat    | right cell padding of 16px and nowrap |
| denser  | right cell padding of 16px, nowrap, and row height of 40px instead of 56px |

You can also use other string values, as long as you define a `utils` entry named the same + `Table`, for example `myCustomTable`. Check out the sample theme for examples.


## CountrySelect

There is an additional component, an autosuggest-based country select.

``` javascript
  country: {
    type: String,
    label: 'Country',
    control: 'CountrySelect',
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
```

Countries are stored as their 2-letter country codes. I have included a helper function for displaying the country name:

``` javascript
import Typography from 'material-ui/Typography';
import { getCountryLabel } from 'meteor/erikdakoda:vulcan-material-ui';

<Typography variant="subheading">
  {getCountryLabel(supplier.country)}
</Typography>
```

