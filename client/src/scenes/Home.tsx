import React from "react";
import { Container } from "semantic-ui-react";

import ChatRoom from "components/ChatRoom";
import RoomList from "components/RoomList";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{ roomId: string }> {}

const HomeScene: React.FC<Props> = ({ match }) => {
  const { params } = match;
  const { roomId } = params;

  return (
    <Container>
      {roomId ? <ChatRoom roomId={roomId} /> : <RoomList />}
    </Container>
  );
};

export default HomeScene;
