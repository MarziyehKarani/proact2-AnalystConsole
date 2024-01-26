import PropTypes from 'prop-types';
import React from "react";

import { setupApiConfiguration } from "../src/infrastructure/services/network/networkApiConfig";

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

import { MsalProvider, useMsal } from "@azure/msal-react";
import { EventType, InteractionType } from "@azure/msal-browser";
//import UserSession from './infrastructure/session/UserSession';
import { ReactSession } from 'react-client-session';

import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { authRequest } from "./infrastructure/azure/azureB2cConfig";
import languages from './common/languages';

// Import scss
import "./assets/scss/theme.scss";

setupApiConfiguration(languages.en.tag);

const App = ({ instance }) => {

  function getLayout() {
    let layoutCls = HorizontalLayout;
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <MsalProvider instance={instance}>
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
          >
            <Switch>
              {authRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={NonAuthLayout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={false}
                />
              ))}

              {userRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={false}
                  exact
                />
              ))}
            </Switch>
          </MsalAuthenticationTemplate>
        </MsalProvider>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);