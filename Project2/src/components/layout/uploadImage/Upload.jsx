import React, { useState } from 'react'
import axios from 'axios';
export default function Upload() {
    const [preview, setPreview] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const handleAddMedia = (event) => {
      setSelectedMedia(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    };
    const handleAdd = async () => {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project3");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dcmrlgyyd/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      console.log(media);
    };
    return (
      <>
        <h1>Upload</h1>
        <div>
          <input type="file" onChange={handleAddMedia} />
          <img src={preview} alt="" width={100} />
          <button onClick={handleAdd}>Add</button>
        </div>
      </>
    );
  }


