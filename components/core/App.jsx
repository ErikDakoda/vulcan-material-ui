import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, intlShape } from 'meteor/vulcan:i18n';
import {
  Components,
  replaceComponent,
  withCurrentUser,
  getSetting,
  Strings,
} from 'meteor/vulcan:core';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';
import createJssContext from '../../modules/createJssContext';


class App extends PureComponent {
  
  constructor () {
    super();
    
    this.getChildContext = this.getChildContext.bind(this);
  }
  
  componentDidMount () {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  
  
  getLocale () {
    return getSetting('locale', 'en');
  }
  
  getChildContext () {
    const messages = Strings[this.getLocale()] || {};
    const intlProvider = new IntlProvider({ locale: this.getLocale() }, messages);
    const { intl } = intlProvider.getChildContext();
    return {
      intl: intl
    };
  }
  
  render () {
    const jssContext = createJssContext();
    const currentRoute = _.last(this.props.routes);
    const LayoutComponent = currentRoute.layoutName ?
      Components[currentRoute.layoutName] :
      Components.Layout;
    
    return (
      <JssProvider registry={jssContext.sheetsRegistry} jss={jssContext.jss}>
        <MuiThemeProvider theme={jssContext.theme} sheetsManager={jssContext.sheetsManager}>
          <IntlProvider locale={this.getLocale()} messages={Strings[this.getLocale()]}>
            <div>
              
              <Components.HeadTags/>
              
              <LayoutComponent {...this.props} currentRoute={currentRoute}>
                {
                  this.props.currentUserLoading
                    ?
                    <Components.Loading/>
                    :
                    this.props.children
                      ?
                      this.props.children
                      :
                      <Components.Welcome/>
                }
              </LayoutComponent>
              
              <style id="jss-server-side">{jssContext.sheetsRegistry.toString()}</style>
            
            </div>
          </IntlProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
  
}


App.propTypes = {
  currentUserLoading: PropTypes.bool,
};


App.childContextTypes = {
  intl: intlShape,
};


App.displayName = 'App';


replaceComponent('App', App, withCurrentUser);

