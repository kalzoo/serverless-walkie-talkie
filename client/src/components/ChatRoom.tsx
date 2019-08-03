import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import { string } from "prop-types";
import { AudioSegment } from "types";
import { Loader } from "semantic-ui-react";

const ChatRoom: React.FC = () => (
  <Subscription<Data, {}>
    subscription={ON_CREATE_AUDIO_SEGMENT}
    variables={{ roomId: "abc123" }}
  >
    {({ data, error, loading }) => {
      if (error) {
        console.error("[OnCreateAudioSegment] Error: ", error);
        return "Error";
      }
      if (!data) {
        console.error("[OnCreateAudioSegment] No Data");
        return ":(";
      }
      if (loading) return <Loader active />;

      const { onCreateAudioSegment } = data;

      return <div>{onCreateAudioSegment.data}</div>;
    }}
  </Subscription>
);

export default ChatRoom;

const ON_CREATE_AUDIO_SEGMENT = gql`
  subscription OnCreateAudioSegment($roomId: ID!) {
    onCreateAudioSegment(roomId: $roomId) {
      roomId
      data
      timestamp
      userId
    }
  }
`;

interface Data {
  onCreateAudioSegment: AudioSegment;
}
