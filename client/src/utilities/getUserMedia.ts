type MediaCallback = (stream: any) => void;

let getUserMediaFn;
let getUserMedia:
  | ((
      constraints: any,
      onSuccess: MediaCallback,
      onError: MediaCallback
    ) => Promise<any> | void)
  | undefined;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  getUserMedia = (constraints, onSuccess, onError) =>
    navigator.mediaDevices.getUserMedia
      .bind(navigator.mediaDevices)(constraints)
      .then(onSuccess)
      .catch(onError);
} else {
  getUserMediaFn =
    navigator.getUserMedia ||
    // @ts-ignore
    navigator.webkitGetUserMedia ||
    // @ts-ignore
    navigator.mozGetUserMedia ||
    // @ts-ignore
    navigator.msGetUserMedia;
  getUserMedia = getUserMediaFn ? getUserMediaFn.bind(navigator) : undefined;
}

export default getUserMedia;
