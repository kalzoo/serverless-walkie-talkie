// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const playSoundData = (dataUrl: string) => {
  console.log("Playing sound:", dataUrl);
  const sound = new Audio(dataUrl);
  sound.play();
};

export default playSoundData;
