import { registerTheme } from './themes';
import { createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';


/** @ignore */

/**
 * 
 * Sample theme to get you out of the gate quickly
 * 
 * For a complete list of configuration variables see:
 * https://material-ui-next.com/customization/themes/
 * 
 */


const serif = (fontFamily) => {
  return `${fontFamily}, Times, serif`;
};


const sansSerif = (fontFamily) => {
  return `${fontFamily}, Helvetica, Arial, sans-serif`;
};


const palettes = {
  primary: indigo,
  secondary: blue,
  error: red,
  background: grey,
};


const display = {
  fontFamily: 'Roboto',
  fontWeight: 300,
  letterSpacing: '-.015em',
  lineHeight: 1.1,
  color: palettes.primary[500],
};


const title = {
  fontFamily: 'Roboto Condensed',
  fontSize: 18,
  letterSpacing: '-.008em',
  lineHeight: 1.2,
  fontWeight: 400,
};


const body = {
  fontFamily: 'Roboto',
  fontSize: 15,
  fontWeightLight: 300,
  fontWeightRegular: 300,
  fontWeightMedium: 400,
  fontColorRegular: 'rgba(0, 0, 0, 0.92)',
  fontColorLight: 'rgba(0, 0, 0, 0.54)',
};


const theme = createMuiTheme({
  
  palette: {
    primary: {
      light: palettes.primary[200],
      main: palettes.primary[500],
      dark: palettes.primary[800],
      ...palettes.primary
    },
    secondary: {
      light: palettes.secondary[200],
      main: palettes.secondary[500],
      dark: palettes.secondary[800],
      ...palettes.secondary
    },
    error: {
      main: palettes.error[500],
      ...palettes.error
    },
    background: {
      default: palettes.background[100],
      ...palettes.background
    }
  },
  
  typography: {
    
    display4: {
      fontSize: 70,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      letterSpacing: display.letterSpacing,
      lineHeight: display.lineHeight,
      color: display.color,
    },
    
    display3: {
      fontSize: 54,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      letterSpacing: display.letterSpacing,
      lineHeight: display.lineHeight,
      color: display.color,
    },
    
    display2: {
      fontSize: 38,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      lineHeight: '48px',
      color: display.color,
    },
    
    display1: {
      fontSize: 30,
      fontWeight: display.fontWeight,
      fontFamily: sansSerif(display.fontFamily),
      letterSpacing: display.letterSpacing,
      lineHeight: display.lineHeight,
      color: display.color,
    },
    
    headline: {
      fontSize: title.fontSize + 8,
      fontWeight: title.fontWeight,
      fontFamily: sansSerif(title.fontFamily),
      letterSpacing: title.letterSpacing,
      lineHeight: title.lineHeight,
      color: display.color,
    },
    
    title: {
      fontSize: title.fontSize + 4,
      fontWeight: title.fontWeight,
      fontFamily: sansSerif(title.fontFamily),
      letterSpacing: title.letterSpacing,
      lineHeight: title.lineHeight,
      color: display.color,
    },
    
    subheading: {
      fontSize: title.fontSize,
      fontWeight: title.fontWeight,
      fontFamily: sansSerif(title.fontFamily),
      letterSpacing: title.letterSpacing,
      lineHeight: title.lineHeight,
      color: body.fontColorRegular,
    },
    
    body2: {
      fontSize: body.fontSize,
      fontWeight: body.fontWeightMedium,
      fontFamily: sansSerif(body.fontFamily),
      lineHeight: '24px',
      color: body.fontColorRegular,
      marginBottom: '12px',
    },
    
    body1: {
      fontSize: body.fontSize,
      fontWeight: body.fontWeightRegular,
      fontFamily: sansSerif(body.fontFamily),
      lineHeight: '24px',
      color: body.fontColorRegular,
      marginBottom: '12px',
    },
    
    caption: {
      fontSize: 12,
      fontWeight: body.fontWeightMedium,
      fontFamily: sansSerif(body.fontFamily),
      lineHeight: 1,
      color: body.fontColorLight,
    },
    
    button: {
      fontSize: 14,
      textTransform: 'uppercase',
      fontWeight: body.fontWeightMedium,
      fontFamily: sansSerif(body.fontFamily),
    }
    
  },
  
});


registerTheme('Sample', theme);
