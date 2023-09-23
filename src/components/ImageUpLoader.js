import React, { useState } from "react";
import "../Styles/ImageUploader.css"; 

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
    onImageUpload(image);
  };

  return (
    <div className="image-uploader-container">
      {" "}
      <label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        {!selectedImage && <p>Click to upload an image</p>}
      </label>
    </div>
  );
};

export default ImageUploader;
