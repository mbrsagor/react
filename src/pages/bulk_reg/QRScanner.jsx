import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Box, Button, Typography } from "@mui/material";

export default function QRScanner() {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10, // Frames per second
      qrbox: { width: 250, height: 250 }, // Scanner box size
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear(); // Stop scanning after a successful scan

        // Open the scanned link in a custom way
        window.open(decodedText, "_blank"); // Opens the scanned link in a new tab
      },
      (error) => console.error("QR Scanner Error:", error)
    );

    return () => {
      scanner.clear(); // Cleanup when component unmounts
    };
  }, []);

  return (
    <Box textAlign="center" p={2}>
      <Typography variant="h5" gutterBottom>
        Scan QR Code
      </Typography>

      {/* QR Scanner Box */}
      <Box
        id="qr-reader"
        sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
      ></Box>

      {/* Display scanned result */}
      {scanResult && (
        <Box mt={2}>
          <Typography variant="subtitle1">Scanned Link:</Typography>
          <Typography variant="body2" color="primary">
            {scanResult}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={() => window.open(scanResult, "_blank")}
          >
            Open Link
          </Button>
        </Box>
      )}
    </Box>
  );
}
