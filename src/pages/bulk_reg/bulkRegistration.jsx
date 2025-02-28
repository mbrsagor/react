import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"; // For converting QR code to image

import ToolsBar from "../../components/tools_bar";
import { BASE_URL } from "../../services/api_service";

export default function BulkRegistration() {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);
  const qrRef = useRef(null); // Ref for QR code container

  // open camera
  const openCamera = () => {
    fileInputRef.current.click();
  };

  // Camera handlers
  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Captured file:", file);
      // You can process the file or display it
    }
  };

  useEffect(() => {
    // Get the token and user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user object
    }
  }, []);

  // Generate QR code link
  const user_id = user ? user.user_id : 0;
  const link = `${BASE_URL}/bulk-registration/${user_id}/`;

  // Function to save QR code as an image
  const saveQRCode = async () => {
    if (!qrRef.current) return;

    try {
      const canvas = await html2canvas(qrRef.current);
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = "qr_code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error saving QR Code:", error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events/" title="Bulk Registration" />
        <Box className="parent_sec">
          <Box className="bulk_reg_sec">
            {/* QR Code Box */}
            <Box className="bulk_reg_qr_code" ref={qrRef}>
              <QRCode value={link} />
            </Box>

            {/* Hidden file input for camera */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleCapture}
              style={{ display: "none" }}
            />

            {/* Save QR Code Button */}
            <Box>
              <Button
                type="submit"
                className="app_btn w100"
                variant="contained"
                onClick={saveQRCode} // Call save function on click
              >
                Save QR Code
              </Button>
            </Box>

            {/* Verify Member QR Code Button */}
            <Box className="mt10">
              <Button
                type="submit"
                className="app_btn w100"
                variant="contained"
                onClick={openCamera}
              >
                Verify Member QR Code
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
