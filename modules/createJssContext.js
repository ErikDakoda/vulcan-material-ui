import jss from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { getCurrentTheme } from './themes';
import warning from 'warning';


let ruleCounter = 0;


//based on 'material-ui/styles/createGenerateClassName'
const  generateClassName = (rule, sheet) => {
  ruleCounter += 1;
  warning(
    ruleCounter < 1e10,
    [
      'Material-UI (keybee): you might have a memory leak.',
      'The ruleCounter is not supposed to grow that much.',
    ].join(''),
  );
  
  if (process.env.NODE_ENV === 'production') {
    return `c${ruleCounter}`;
  }
  
  if (sheet && sheet.options.meta) {
    let meta = sheet.options.meta;
    // Sanitize the string as will be used in development to prefix the generated
    // class name.
    meta = meta.replace(new RegExp(/[!"#$%&'()*+,./:; <=>?@[\\\]^`{|}~]/g), '-');
  
    return `${meta}-${rule.key}-${ruleCounter}`;
  }
  
  return `${rule.key}-${ruleCounter}`;
};




//const jss = create(preset());
jss.setup(preset());
jss.options.createGenerateClassName = () => generateClassName;


const sheetsManager = new Map();
const sheetsRegistry = new SheetsRegistry();


export default function createJssContext() {
  return {
    jss,
    theme: getCurrentTheme(),
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry,
  };
}
