import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import getUserMedia from "utilities/getUserMedia";

const binaryToBase64 = (data: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // console.log("File reader completed");
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
      getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream, options);
          mediaRecorder.addEventListener("dataavailable", e => {
            console.log("Data available");
            //@ts-ignore (data method is unknown)
            binaryToBase64(e.data).then(data => onRecordAudio(data));
          });
          mediaRecorder.addEventListener("error", error =>
            console.error(`[MediaRecorder] Error`, error)
          );
          mediaRecorder.addEventListener("stop", e =>
            stream.getTracks().forEach(track => track.stop())
          );
          setMediaRecorderObject(mediaRecorder);
          mediaRecorder.start(1000); // Slice into 1-second chunks
        })
        .catch(err => {
          console.error(`[RecordButton] Error getting audio device`, err);
          alert(`[RecordButton] Error getting audio device: ${err}`);
        });
    } else {
      console.error(`[RecordButton] getUserMedia not supported!`);
    }
  };

  const endRecording = () => {
    setRecording(false);
    mediaRecorderObject && mediaRecorderObject.state !== "inactive"
      ? mediaRecorderObject.stop()
      : console.error(
          `[RecordButton] Unable to stop MediaRecorder: is undefined`
        );
  };

  return (
    <Button
      fluid
      size="huge"
      circular
      primary={recording ? true : undefined}
      icon
      onClick={() => console.log("click")}
      onMouseDown={startRecording}
      onMouseUp={endRecording}
      onMouseLeave={endRecording}
      onTouchStart={startRecording}
      onTouchEnd={endRecording}
      onBlur={endRecording}
    >
      <Icon name="record" />
      &nbsp; Record
    </Button>
  );
};

export default RecordButton;
