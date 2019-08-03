import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";
import amplifyConfig from "config/amplify";
import getUserMedia from "utilities/getUserMedia";

import HomeScene from "scenes/Home";

import "semantic-ui-css/semantic.min.css";
import client from "./config/appsyncClient";

Amplify.configure(amplifyConfig);

const App: React.FC = () => {
  if (!getUserMedia || typeof MediaRecorder === "undefined")
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="thumbs down outline" />
          Your device doesn't support this app. Sad.
        </Header>
      </Segment>
    );

  return (
    // @ts-ignore - it doesn't like the appsync client being passed to apollo
    <ApolloProvider client={client}>
      <Rehydrated>
        <Router>
          <Route path="/:roomId?" component={HomeScene} />
        </Router>
      </Rehydrated>
    </ApolloProvider>
  );
};

export default withAuthenticator(App);
