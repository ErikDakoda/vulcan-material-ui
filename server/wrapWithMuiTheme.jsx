import React from 'react';
import { addCallback } from 'meteor/vulcan:core';
import JssProvider from 'react-jss/lib/JssProvider';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import { getCurrentTheme } from '../modules/themes';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssCleanup from '../components/theme/JssCleanup';


function wrapWithMuiTheme (app, { req, res, store, apolloClient }) {
  const sheetsRegistry = new SheetsRegistry();
  req.sheetsRegistry = sheetsRegistry;
  const generateClassName = createGenerateClassName();
  const theme = getCurrentTheme();
  
  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <JssCleanup>
          {app}
        </JssCleanup>
      </MuiThemeProvider>
    </JssProvider>
  );
}


function injectJss ({ req, res }) {
  const sheets = req.sheetsRegistry.toString();
  
  req.dynamicHead = req.dynamicHead || '';
  req.dynamicHead += `<style id="jss-server-side">${sheets}</style>`;
}


addCallback('router.server.wrapper', wrapWithMuiTheme);
addCallback('router.server.postRender', injectJss);
