import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";
import { string } from "prop-types";
import { AudioSegment } from "types";
import { Loader } from "semantic-ui-react";

import RecordButton from "components/RecordButton";
import playSoundData from "utilities/playSound";

const ChatRoom: React.FC = () => (
  <Subscription<Data, {}>
    subscription={ON_CREATE_AUDIO_SEGMENT}
    onSubscriptionData={({ subscriptionData: { data } }) =>
      data && playSoundData(data.onCreateAudioSegment.data)
    }
    variables={{ roomId: "abc123" }}
  >
    {({ error, loading }) => {
      if (error) {
        console.error("[OnCreateAudioSegment] Error: ", error);
        return "Error";
      }

      return (
        <div>
          <RecordButton onRecordAudio={console.log} />
        </div>
      );
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
