let generatorCounter = 0;

export default function createGenerateClassName(options = {}) {
  const escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
  let ruleCounter = 0;
  
  return (rule, styleSheet) => {
    ruleCounter += 1;

    if (styleSheet && styleSheet.options.classNamePrefix) {
      let prefix = styleSheet.options.classNamePrefix;
      prefix = prefix.replace(escapeRegex, '-');
      
      return `${prefix}-${rule.key}-${ruleCounter}`;
    }
    
    return `${rule.key}-${ruleCounter}`;
  };
}
