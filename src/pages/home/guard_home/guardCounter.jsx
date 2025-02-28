import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
export default function GuardCounter({ title, counter }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="gard_dashboard_card">
        <Box className="single_card">
          <Box>
            <Typography className="counter" variant="h6">
              {title}
            </Typography>
          </Box>
          <Box>
            <Typography className="counter" variant="h6">
              {counter}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
