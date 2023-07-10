import { useState } from "react";
import axios from "axios";

const url = "http://localhost:3000/img/";

function UploadImg() {
  const [postImage, setPostImage] = useState({ Base64Img: "" });
  const [postPrompt, setPostPrompt] = useState({ prompt: "" });

  const createPost = async () => {
    try {
      const postData = {
        Base64Img: postImage.Base64Img,
        prompt: postPrompt.prompt,
      };
      await axios.post(url, postData);
      console.log(postImage.Base64Img,postPrompt.prompt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    console.log("updated");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, Base64Img: base64 ,});
  };

  const handleUploadPrompt = (e) => {
    const prompt = e.target.value;
    console.log(prompt);
    setPostPrompt({ ...postPrompt, prompt: prompt });
  };

  return (
    <form>
      <input
        type="file"
        name="Base64Img"
        accept=".jpeg,.png,.jpg"
        onChange={handleFileUpload}
      />
      <input type="text" placeholder="Prompt" onChange={handleUploadPrompt} />

      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </form>
  );
}

export default UploadImg;

// Convert uploaded image to base64 format
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
