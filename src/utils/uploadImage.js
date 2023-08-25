//cloudinary inicia

const uploadImage = async (e) => {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "vflfbjvo");
  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyeknjnsi/image/upload",
      {
        method: "POST",
        body: data,
      }
    ).then(res => res.json())

    return res
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
//cloudinary acaba
