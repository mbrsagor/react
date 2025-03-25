/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";

import CustomSnackbar from "../../../components/snackbar";

export default function PaymentList(props) {
  const [snackbar, setSnackbar] = React.useState({
      open: false,
      message: "",
      severity: "error",
    });
  
    const handleSnackbarClose = () => {
      setSnackbar({ ...snackbar, open: false });
    };
  
    // copy transaction ID
    // const handleCopy = () => {
    //   navigator.clipboard
    //     .writeText(props.transactionID)
    //     .then(() => {
    //       setSnackbar({
    //         open: true,
    //         message: "Transaction ID copied!",
    //         severity: "success",
    //       });
    //     })
    //     .catch((err) => console.error("Failed to copy:", err));
    // };
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="single_transaction_box">
        <Box className="net_amount">
          <Typography className="amount" variant="body1">
            ${props.amount}
          </Typography>
        </Box>
        <Box>
          <Typography className="tranID" variant="p">
            TranxID#: {props.transactionID}
          </Typography>
          {/* <Box className="tranID_copy">
            <Typography className="tran_text" variant="body1">
              {props.transactionID}
            </Typography>
            <Tooltip title="Copy Transaction ID">
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box> */}
          <Box>
            <Typography className="card_type" variant="body1">
              Card Type: {props.cardType}
            </Typography>
          </Box>
          <Box>
            <Typography className="country" variant="body1">
              Purchase event package
            </Typography>
          </Box>
          <Box>
            <Typography className="date" variant="body1">
              Date: {props.date}
            </Typography>
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </React.Fragment>
  );
}
