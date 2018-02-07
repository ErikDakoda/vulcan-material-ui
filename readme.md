
# erikdakoda:vulcan-material-ui 0.10.4

Replacement for [Vulcan](http://vulcanjs.org/) components using [Material-UI](https://material-ui-next.com/). 
It's based on the latest [v1-beta branch](https://github.com/callemall/material-ui/tree/v1-beta) of Material-UI.

This package is progressing and is now beta quality. Further changes are likely to come and I will likely break out
the example layout into a separate package. To give me feedback open an issue on GitHub
or you can reach me on the [Vulcan Slack](https://vulcanjs.slack.com) channel as erikdakoda.

This version has been tested against Vulcan 1.8.9 and Material UI v1.0.0-beta.31. NOTE: Material UI is still in 
beta and the API is still in flux. I suggest that you lock your project to v1.0.0-beta.31 by removing the ^ before
the version number in your package.json.

``` json
    "material-ui": "1.0.0-beta.31",
```

There are some nice bonus features like a CountrySelect with autocomplete and theming.

All components that use bootstrap in vulcan:core, vulcan:forms and vulcan:accounts have been implemented except for Icon, DateTime.

## Installation

To add vulcan-material-ui to an existing Vulcan project, enter the following:

``` sh
$ meteor add erikdakoda:vulcan-material-ui

$ meteor npm install --save material-ui@next
$ meteor npm install --save material-ui-icons
$ meteor npm install --save react-autosuggest
$ meteor npm install --save autosuggest-highlight
```

To activate the example layout copy the three components to your project and import them:

```javascript
import './example/Header',
import './example/Layout',
import './example/SideNavigation',
```

## Theming

For an example theme see ```modules/sampleTheme.js```. For a complete list of values you can customize, 
see the [MUI Default Theme](https://material-ui-next.com/customization/theme-default/). 

Register your theme in the Vulcan environment by giving it a name: ```registerTheme('MyTheme', theme);```. 
You can have multiple themes registered and you can specify which one to use in your settings file using the ```muiTheme``` public setting.

## Form Controls

You can pass a couple of extra options to text inputs from your schema:

```javascript
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
    },
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
```

And to textarea inputs:

```javascript
    form: {
      rows: 10,
    },
```

## CountrySelect

There is an additional component, an autosuggest-based country select.

```javascript
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

```javascript
import Typography from 'material-ui/Typography';
import { getCountryLabel } from 'meteor/erikdakoda:vulcan-material-ui';

<Typography type="subheading">
  {getCountryLabel(supplier.country)}
</Typography>
```

