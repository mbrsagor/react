import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// eslint-disable-next-line react/prop-types
const FileDropZone = ({ onFilesChange }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const fileReaders = acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result); // Full Data URL
          };
          reader.onerror = reject;
          reader.readAsDataURL(file); // Read as Data URL
        });
      });

      Promise.all(fileReaders)
        .then((base64Files) => {
          onFilesChange(base64Files); // Pass the Base64 files
        })
        .catch((error) =>
          console.error("Error reading files as Base64:", error)
        );
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileDropZone;
