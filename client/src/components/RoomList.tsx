import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { Room } from "types";

const RoomList: React.FC = () => (
  <Query<Data, {}> query={GET_ROOMS}>
    {({ data }) => {
      console.log(data);
      return ":)";
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
  getRooms: Room[];
}
