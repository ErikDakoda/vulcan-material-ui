import React from 'react';
import { addCallback } from 'meteor/vulcan:core';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';
import { getCurrentTheme } from '../modules/themes';
import { SheetsRegistry } from 'react-jss/lib/jss';


function wrapWithMuiTheme (app, { req, res, store, apolloClient }) {
  const sheetsRegistry = new SheetsRegistry();
  req.sheetsRegistry = sheetsRegistry;
  const generateClassName = createGenerateClassName();
  
  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={getCurrentTheme()} sheetsManager={new Map()}>
        {app}
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
