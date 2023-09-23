import React, { useState } from "react";
import ImageUploader from "./ImageUpLoader";
import TextRecognition from "./TextRecognition";
import "../Styles/OcrApp.css"; 

const OcrApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container">
      {" "}
      <div className="header">
        <h1>OCR App</h1>
      </div>
      <div className="ocr-app">
        {" "}
        <ImageUploader onImageUpload={handleImageUpload} />
        <TextRecognition selectedImage={selectedImage} />
      </div>
    </div>
  );
};

export default OcrApp;
