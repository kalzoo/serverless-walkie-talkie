const binaryToBase64 = (data: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(data);
  });

export default binaryToBase64;
