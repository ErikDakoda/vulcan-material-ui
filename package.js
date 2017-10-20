Package.describe({
  name: 'erikdakoda:vulcan-material-ui',
  version: '0.5.0',
  summary: 'Replacement for Vulcan (http://vulcanjs.org/) components using material-ui',
  git: 'https://github.com/ErikDakoda/vulcan-material-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('1.5.2.2');
  
  api.use([
    'ecmascript',
    'vulcan:forms@1.3.0',
    'vulcan:accounts@1.3.0',
    'vulcan:core@1.3.0',
  ]);
  
  api.mainModule('main.js');
});
