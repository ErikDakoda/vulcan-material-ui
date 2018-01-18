import React from 'react';
import { addCallback } from 'meteor/vulcan:core';
import { MuiThemeProvider } from 'material-ui/styles';
import { getCurrentTheme } from '../modules/themes';
import JssCleanup from './JssCleanup';


function wrapWithMuiTheme (app) {
  return (
    <MuiThemeProvider theme={getCurrentTheme()}>
      <JssCleanup>
        {app}
      </JssCleanup>
    </MuiThemeProvider>
  );
}


addCallback('router.client.wrapper', wrapWithMuiTheme);
