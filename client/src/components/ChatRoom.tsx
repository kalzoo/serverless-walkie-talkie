import React from "react";
import { Mutation, Subscription } from "react-apollo";
import gql from "graphql-tag";
import { string } from "prop-types";
import { AudioSegment } from "types";
import { Loader } from "semantic-ui-react";

import RecordButton from "components/RecordButton";
import playSoundData from "utilities/playSound";

interface Props {
  roomId: string;
}

const ChatRoom: React.FC<Props> = ({ roomId }) => (
  <Mutation<MutationData, any> mutation={CREATE_AUDIO_SEGMENT}>
    {mutate => {
      const handleReceiveData = (data: string) => {
        mutate({ variables: { roomId, data } });
      };

      return (
        <Subscription<Data, {}>
          subscription={ON_CREATE_AUDIO_SEGMENT}
          onSubscriptionData={({ subscriptionData: { data } }) =>
            data && playSoundData(data.onCreateAudioSegment.data)
          }
          variables={{ roomId }}
        >
          {({ error, loading }) => {
            if (error) {
              console.error("[OnCreateAudioSegment] Error: ", error);
              return "Error";
            }

            return (
              <div>
                <RecordButton onRecordAudio={handleReceiveData} />
              </div>
            );
          }}
        </Subscription>
      );
    }}
  </Mutation>
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

const CREATE_AUDIO_SEGMENT = gql`
  mutation CreateAudioSegment($roomId: ID!, $data: String!) {
    createAudioSegment(roomId: $roomId, data: $data) {
      data
      roomId
      timestamp
      userId
    }
  }
`;

interface MutationData {
  createAudioSegment: {
    data: string;
    roomId: string;
    timestamp: string;
    userId: string;
  };
}
