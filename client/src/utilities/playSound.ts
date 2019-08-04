const playSoundData = (dataUrl: string) => {
  new Audio(dataUrl).play().catch(err => {
    console.error(
      `[PlaySoundData] Error playing sound:`,
      err,
      err.message,
      dataUrl
    );
  });
};

export default playSoundData;
