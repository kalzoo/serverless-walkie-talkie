import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import amplifyConfig from "./config/amplify";

import HomeScene from "scenes/Home";

import logo from "./logo.svg";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import client from "./config/appsyncClient";

Amplify.configure(amplifyConfig);

const App: React.FC = () => (
  // @ts-ignore - it doesn't like the appsync client being passed to apollo
  <ApolloProvider client={client}>
    <Rehydrated>
      <HomeScene />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(App);
