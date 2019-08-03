import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Loader, Segment } from "semantic-ui-react";

import { Room } from "types";

const RoomList: React.FC = () => (
  <Query<Data, {}> query={GET_ROOMS}>
    {({ data, error, loading }) => {
      console.log(data);
      if (loading) return <Loader active message="Loading rooms..." />;
      if (error || !data) {
        console.error(`[GetRooms] ${error ? error : "No data returned"}`);
        return <Segment placeholder>Error :(</Segment>;
      }
      const { rooms } = data;
      return (
        <Segment.Group>
          {rooms.map(room => (
            <Segment>{room.id}</Segment>
          ))}
        </Segment.Group>
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
