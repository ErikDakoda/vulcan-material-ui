Package.describe({
  name: 'erikdakoda:vulcan-material-ui',
  version: '0.9.9',
  summary: 'Replacement for Vulcan (http://vulcanjs.org/) components using material-ui',
  git: 'https://github.com/ErikDakoda/vulcan-material-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.6');
  
  api.use([
    'ecmascript',
    'vulcan:core',
    'vulcan:forms',
    'vulcan:accounts',
  ]);
  
  api.mainModule('client/main.js', 'client');
  api.mainModule('server/main.js', 'server');
});
