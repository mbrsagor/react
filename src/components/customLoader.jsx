import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/joy/CircularProgress";

export default function CustomLoader() { 
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box>
                <Box position="relative" display="inline-block">
                    <div style={{ width: "32px", height: "32px" }}>
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#1A434E",
                            borderRadius: "50%",
                            animation: "loading 1s linear infinite"
                        }}>
                            <CircularProgress />
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}
