/** @module vulcan-material-ui */

import { createMuiTheme } from 'material-ui/styles/index';
import { registerSetting, getSetting } from 'meteor/vulcan:core';


registerSetting('muiTheme', 'Sample', 'Material UI theme used by erikdakota:vulcan-material-ui');


export const ThemesTable = {}; // storage for info about themes


/**
 * Register a theme with a name
 *
 * @param {String} name The name of the theme to register
 * @param {Object} theme The theme object - see defaultTheme.js
 *
 */
export const registerTheme = (name, theme) => {
  const themeInfo = {
    name,
    theme,
  };
  
  ThemesTable[name] = themeInfo;
};


/**
 * Get a theme registered with registerTheme()
 *
 * @param {String} name The name of the theme to get
 * 
 * @returns {Object} A theme object
 */
export const getTheme = (name) => {
  const themeInfo = ThemesTable[name];
  if (!themeInfo) return null;
  return createMuiTheme(themeInfo.theme);
};


/**
 * Get the theme specified in the 'muiTheme' setting
 * 
 * @returns {Object}
 */
export const getCurrentTheme = () => {
  const themeName = getSetting('muiTheme', 'Sample');
  const theme = getTheme(themeName);
  return theme;
};
