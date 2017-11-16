Package.describe({
  name: 'erikdakoda:vulcan-material-ui',
  version: '0.7.0',
  summary: 'Replacement for Vulcan (http://vulcanjs.org/) components using material-ui',
  git: 'https://github.com/ErikDakoda/vulcan-material-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('1.5.2.2');
  
  api.use([
    'ecmascript',
    'vulcan:forms@1.8.0',
    'vulcan:accounts@1.8.0',
    'vulcan:core@1.8.0',
    'vulcan:forms-upload',
  ]);
  
  api.addFiles('components/forms/forms.css', 'client');

  api.mainModule('main.js');
});
