import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../Styles/TextRecognition.css"

const TextRecognition = ({ selectedImage }) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        try {
          const result = await Tesseract.recognize(selectedImage, "eng", {
            logger: (m) => {
              console.log(m);
              setProgress(Math.round(m.progress * 100));
            },
          });
          if (result && result.data && result.data.text) {
            setRecognizedText(result.data.text);
            setEditedText(result.data.text); // Initialize edited text with recognized text
          } else {
            console.error("Recognition result is empty.");
          }
        } catch (error) {
          console.error("Error during recognition:", error);
        }
      }
    };
    recognizeText();
  }, [selectedImage]);

  const handleCopyText = () => {
    // Copy the recognized text or edited text to the clipboard
    const textToCopy = isEditing ? editedText : recognizedText;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditedTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className="text-recognition-container">
      <h2>Recognized Text:</h2>
      {progress > 0 && progress < 100 && (
        <div className="progress-container">
          <div className="progress-text">Progress: {progress}%</div>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {isEditing ? (
        <textarea
          className="edit-textarea"
          value={editedText}
          onChange={handleEditedTextChange}
          rows="10"
          cols="50"
        />
      ) : (
        <p className="recognized-text">{recognizedText}</p>
      )}
      <div className="button-container">
        <button className="button copy-button" onClick={handleCopyText}>
          <FontAwesomeIcon icon={faCopy} /> Copy
        </button>
        <button
          className={`button ${isEditing ? "save-button" : ""}`}
          onClick={handleEditToggle}
        >
          <FontAwesomeIcon icon={faEdit} /> {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default TextRecognition;
