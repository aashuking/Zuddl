import React, { useState, useRef } from "react";
import "./TaskCard.css";

const TaskCard = ({ title, description, onDelete }) => {
  const [items, setItems] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImageSrc = e.target.result;
        setImageSrc(uploadedImageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target.result;
          setImageSrc(imageSrc);
        };
        reader.readAsDataURL(blob);

        e.preventDefault();
        break;
      }
    }
  };

  const handleTextEnter = (e) => {
    if (e.key === "Enter" && textValue.trim() !== "") {
      e.preventDefault();
      setItems([...items, textValue]); // Add the text to the list of items
      setTextValue(""); // Clear the text input
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input's click event
  };

  return (
    <div className="card">
      <h4>{description}</h4>
      <button onClick={handleDeleteClick}>Delete</button>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          style={{ width: "5rem", height: "4rem" }}
        />
      )}
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <textarea
        className="input"
        placeholder="text"
        value={textValue}
        onChange={handleTextChange}
        onKeyPress={handleTextEnter}
        onPaste={handlePaste}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <button className="upload-button" onClick={handleUploadButtonClick}>
        Upload Image
      </button>
    </div>
  );
};

export default TaskCard;
