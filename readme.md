
# erikdakoda:vulcan-material-ui

Replacement for [Vulcan](http://vulcanjs.org/) components using [Material-UI](https://material-ui-next.com/). 
It's based on the latest [v1-beta branch](https://github.com/callemall/material-ui/tree/v1-beta) of Material-UI.

This package should be considered alpha quality - I am releasing it now to get feedback and possibly contributions 
from the community. Caveat emptor: it will likely change before final release. I am undecided about whether
the layout, forms and users components should be broken out into separate packages. To give me feedback open an issue on GitHub
or you can reach me on the [Vulcan Slack](https://vulcanjs.slack.com) channel as erikdakoda.

For some parts of vulcan:forms to use Material-UI you need to check out [devel branch](https://github.com/VulcanJS/Vulcan/tree/devel) of Vulcan.

There are some nice bonus features like a CountrySelect with autocomplete and theming. Documentation is forthcoming.

The following components are not implemented yet: Icon, DateTime.

## Installation

``` sh
$ meteor add erikdakoda:vulcan-material-ui

$ meteor npm install --save material-ui@next
$ meteor npm install --save material-ui-icons
$ meteor npm install --save react-autosuggest
$ meteor npm install --save autosuggest-highlight
```

## Features

### incomplete

Input options:

``` 
  name: {
    label: 'Name',
    type: String,
    form: {
      autoFocus: true,
    },
  },
```

Textarea options:

```
  description: {
    label: 'Description',
    type: String,
    control: 'textarea',
    form: {
      rows: 10,
    },
  },
```
