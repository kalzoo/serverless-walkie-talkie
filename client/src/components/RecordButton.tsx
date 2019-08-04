import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import getUserMedia from "utilities/getUserMedia";

const binaryToBase64 = (data: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(data);
  });

interface Props {
  onRecordAudio: (base64: string) => void;
}

const RecordButton: React.FC<Props> = ({ onRecordAudio }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorderObject, setMediaRecorderObject] = useState();

  const options = {
    mimeType: "audio/webm"
  };

  const startRecording = () => {
    setRecording(true);

    if (getUserMedia) {
      console.log("[RecordButton] getUserMedia supported");
      getUserMedia(
        { audio: true },
        stream => {
          const mediaRecorder = new MediaRecorder(stream, options);
          mediaRecorder.addEventListener("dataavailable", e => {
            console.log("data available:", e);
            //@ts-ignore (data property is unknown)
            binaryToBase64(e.data).then(data => onRecordAudio(data));
          });
          mediaRecorder.addEventListener("error", error =>
            console.error(`[MediaRecorder] Error`, error)
          );

          // Without this, the browser continues to believe that the application is "listening",
          //   and displays a warning banner to the user
          mediaRecorder.addEventListener("stop", e => {
            stream.getTracks().forEach((track: any) => track.stop());
          });

          setMediaRecorderObject(mediaRecorder);
          mediaRecorder.start(250); // Slice into 0.5-second chunks for processing
        },
        err => {
          console.error(`[RecordButton] Error getting audio device`, err);
          alert(`[RecordButton] Error getting audio device: ${err}`);
        }
      );
    } else {
      console.error(`[RecordButton] getUserMedia not supported!`);
    }
  };

  const endRecording = () => {
    setRecording(false);
    try {
      mediaRecorderObject.stop();
    } catch (_) {}
  };

  return (
    <Button
      fluid
      size="huge"
      circular
      color={recording ? "red" : undefined}
      icon
      onClick={recording ? endRecording : startRecording}
    >
      <Icon
        name={recording ? "circle notched" : "microphone"}
        loading={recording}
      />
      &nbsp; {recording ? "Transmitting..." : "Push to Talk"}
    </Button>
  );
};

export default RecordButton;
