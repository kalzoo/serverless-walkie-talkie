const playSoundData = (dataUrl: string) => {
  console.log("Playing sound:", dataUrl);
  new Audio(dataUrl).play().catch(err => {
    console.error(
      `[PlaySoundData] Error playing sound:`,
      err,
      err.message,
      dataUrl
    );
    // debugger;
  });
};

export default playSoundData;
