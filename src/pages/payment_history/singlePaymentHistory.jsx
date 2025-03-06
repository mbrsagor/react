/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import CustomSnackbar from "../../components/snackbar";

export default function SinglePaymentHistory(props) {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // copy transaction ID
  const handleCopy = () => {
    navigator.clipboard
      .writeText(props.transactionID)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Transaction ID copied!",
          severity: "success",
        });
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="single_transaction_box">
        <Box className="tranID_row" display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">
            TranxID#: {props.transactionID}
          </Typography>
          <Tooltip title="Copy Transaction ID">
            <IconButton onClick={handleCopy} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className="transaction_info">
          <Typography className="customer_name" variant="body1">
            {props.name}
          </Typography>
          <Box>
            <Typography className="amount" variant="body1">
              Card Type: Visa (US) ... {props.last4}
            </Typography>
            <Typography className="payment_type" variant="body1">
              Payment for {props.transaction_type}
            </Typography>
            <Typography className="date" variant="body1">
              {props.date}
            </Typography>
          </Box>
        </Box>
        <Box className="tran_calculation_box">
          <Box>
            <Typography variant="body1">Paid Amount:</Typography>
            <Typography variant="body1">Deduction (-%15):</Typography>
            <Typography variant="body1">Fee Deduction (-):</Typography>
            <Typography variant="body1">Admin Payable(-):</Typography>
          </Box>
          <Box>
            <Typography variant="body1">${props.amount}</Typography>
            <Typography variant="body1">${props.deduction}</Typography>
            <Typography variant="body1">${props.fee_deduction}</Typography>
            <Typography variant="body1">${props.admin_payout}</Typography>
          </Box>
        </Box>
        <Box className="final_result_sec">
          <Typography className="text_final_result" variant="body1">
            Net Payable
          </Typography>
          <Typography className="text_final_result" variant="body1">
            ${props.net_payout}
          </Typography>
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
