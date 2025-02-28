import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DefaultThumbnail from "../assets/DefaultThumbnail.jpg";

// eslint-disable-next-line react/prop-types
const FileDropZone = ({ onFilesChange, existingThumbnail }) => {
  const [preview, setPreview] = useState(existingThumbnail || DefaultThumbnail); // Default to DefaultThumbnail

  useEffect(() => {
    setPreview(existingThumbnail || DefaultThumbnail); // Ensure default is applied
  }, [existingThumbnail]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          setPreview(base64String); // Show uploaded preview
          onFilesChange(base64String); // Pass Base64 to parent component
        };
        reader.readAsDataURL(file);
      }
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          backgroundImage: `url(${preview})`, // Always set background
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Upload the file here ...</p> : null}
      </div>
    </div>
  );
};

export default FileDropZone;
