Package.describe({
  name: 'erikdakoda:vulcan-material-ui',
  version: '0.8.1',
  summary: 'Replacement for Vulcan (http://vulcanjs.org/) components using material-ui',
  git: 'https://github.com/ErikDakoda/vulcan-material-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.5.2');
  
  api.use([
    'ecmascript',
    'vulcan:core@1.8.0',
    'vulcan:forms@1.8.0',
    'vulcan:accounts@1.8.0',
  ]);
  
  api.addFiles('components/forms/forms.css', 'client');

  api.mainModule('main.js');
});
