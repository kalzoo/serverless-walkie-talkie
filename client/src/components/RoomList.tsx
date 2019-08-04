import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { Header, Loader, Segment } from "semantic-ui-react";

import ErrorMessage from "components/ErrorMessage";
import { Room } from "types";

const RoomList: React.FC = () => (
  <Query<Data, {}> query={GET_ROOMS}>
    {({ data, error, loading }) => {
      if (loading) return <Loader active message="Loading rooms..." />;
      if (error || !data) {
        console.error(`[GetRooms] ${error ? error : "No data returned"}`);
        return <ErrorMessage error={error} />;
      }

      const { rooms } = data;

      return (
        <React.Fragment>
          <Header as="h1">Chat Rooms</Header>
          <Segment.Group>
            {rooms.map(room => (
              <Segment key={room.id}>
                <Link to={`/${room.id}`}>{room.id}</Link>
              </Segment>
            ))}
          </Segment.Group>
        </React.Fragment>
      );
    }}
  </Query>
);

export default RoomList;

const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
    }
  }
`;

interface Data {
  rooms: Room[];
}
