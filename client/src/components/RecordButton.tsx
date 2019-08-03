import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

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
  const [audioContextObject, setAudioContextObject] = useState();
  const [mediaRecorderObject, setMediaRecorderObject] = useState();

  const options = {
    mimeType: "audio/webm"
  };

  const startRecording = () => {
    setRecording(true);
    if (navigator.mediaDevices) {
      console.log("[RecordButton] getUserMedia supported");
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const audioCtx = new AudioContext();
        setAudioContextObject(audioCtx);

        // This works, but I don't know what to do with the data within the onaudioprocess callback
        // const audioProcessor = audioCtx.createScriptProcessor(256, 1, 1);
        // audioProcessor.connect(audioCtx.destination);
        // const source = audioCtx.createMediaStreamSource(stream);
        // source.connect(audioProcessor);
        // audioProcessor.onaudioprocess = e => console.log(e.inputBuffer.getChannelData());

        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.addEventListener("dataavailable", e => {
          console.log("Data available");
          //@ts-ignore (data method is unknown)
          binaryToBase64(e.data).then(data => onRecordAudio(data));
        });
        mediaRecorder.addEventListener("stop", e => console.log("stopped"));
        setMediaRecorderObject(mediaRecorder);
        mediaRecorder.start(1000); // Slice into 1-second chunks
      });
    }
  };

  const endRecording = () => {
    setRecording(false);
    audioContextObject.close();
    mediaRecorderObject.stop();
  };

  return (
    <Button
      primary={recording ? true : undefined}
      icon
      onMouseDown={startRecording}
      onMouseUp={endRecording}
      onTouchStart={startRecording}
      onTouchEnd={endRecording}
    >
      <Icon name="record" />
      Record
    </Button>
  );
};

export default RecordButton;
