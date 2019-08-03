import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import ChatRoom from "components/ChatRoom";
import RoomList from "components/RoomList";

const HomeScene: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState();

  return (
    <Grid container>
      <Grid.Row columns={2}>
        <Grid.Column>
          <RoomList />
        </Grid.Column>
        <Grid.Column>
          <ChatRoom />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HomeScene;
