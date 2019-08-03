// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const playSoundData = (base64: string) => {
  // const data = atob(base64);
  const sound = new Audio("data:audio/mpeg;base64," + base64);
  sound.play();
};

export default playSoundData;
