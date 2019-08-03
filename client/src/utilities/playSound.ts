// @ts-ignore
// const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioCtx = new AudioContext();

const playSoundData = (dataUrl: string) => {
  console.log("Playing sound:", dataUrl);
  const sound = new Audio(dataUrl);
  sound
    .play()
    .catch(err => console.error(`[PlaySoundData] Error playing sound:`, err));
};

export default playSoundData;
