import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import ChatRoom from "components/ChatRoom";
import RoomList from "components/RoomList";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{ roomId: string }> {}

const HomeScene: React.FC<Props> = ({ match }) => {
  const { params } = match;
  const { roomId } = params;

  return (
    <Grid container>
      <Grid.Row columns={2}>
        <Grid.Column>
          <RoomList />
        </Grid.Column>
        <Grid.Column>{roomId && <ChatRoom roomId={roomId} />}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HomeScene;
