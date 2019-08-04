import React from "react";
import { ApolloError } from "apollo-client";
import { Header, Icon, Segment } from "semantic-ui-react";

interface Props {
  error?: Error | ApolloError;
}

const ErrorMessage: React.FC<Props> = ({ error }) => (
  <Segment placeholder>
    <Header icon>
      <Icon name="thumbs down outline" />
      There was an error. Check the console for more details.
    </Header>
  </Segment>
);

export default ErrorMessage;
