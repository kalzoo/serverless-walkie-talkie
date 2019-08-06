import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { Mutation, Subscription } from "react-apollo";
import gql from "graphql-tag";
import { AudioSegment } from "types";

import ErrorMessage from "components/ErrorMessage";
import RecordButton from "components/RecordButton";
import playSoundData from "utilities/playSoundData";

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
              return <ErrorMessage error={error} />;
            }

            return (
              <React.Fragment>
                <Header textAlign="center" as="h1">
                  <Header.Content>
                    <Icon name="chat" />
                    {roomId}
                  </Header.Content>
                  <Header.Subheader>
                    <Link to="/">Back to Room List</Link>
                  </Header.Subheader>
                </Header>
                <RecordButton onRecordAudio={handleReceiveData} />
              </React.Fragment>
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
