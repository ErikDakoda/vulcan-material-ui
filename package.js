Package.describe({
  name: 'erikdakoda:vulcan-material-ui',
  version: '1.11.2',
  summary: 'Replacement for Vulcan (http://vulcanjs.org/) components using material-ui',
  git: 'https://github.com/ErikDakoda/vulcan-material-ui',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.6');

  api.use([
    'ecmascript',
    'vulcan:accounts@1.3.2',
    'vulcan:forms@1.11.2',
    'vulcan:core@1.11.2',
    'vulcan:ui-bootstrap@1.11.2'
  ]);

  api.addFiles('accounts.css', ['client', 'server']);

  api.mainModule('client/main.js', 'client');
  api.mainModule('server/main.js', 'server');
});
