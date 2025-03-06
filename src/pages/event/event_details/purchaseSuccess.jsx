import React from "react";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";

import ToolsBar from "../../../components/tools_bar";

export default function PurchaseSuccess() {
  // Model
  const location = useLocation();
  const purchaseData = location.state?.purchaseData;
  const currentDate = new Date().toLocaleString(); // Get current date and time

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/sponsor-purchase-events" title="Purchase Success" />
        <Box className="parent_sec">
          <Box className="payment_success_header mt5">
            <VerifiedIcon />
            <Typography className="purchase_title" variant="h6">
              Payment Successful
            </Typography>
            <Typography className="purchase_subtitle" variant="p">
              Your payment was successfully processed
            </Typography>
          </Box>
          <Box className="payment_success_body">
            <Typography className="title" variant="h6">
              Transaction Details
            </Typography>
          </Box>
          <Box className="purchase_invoice_sec">
            <Typography className="details_lv" variant="p">
              Paid Amount
            </Typography>
            <Typography className="details_lv" variant="p">
              ${purchaseData.paid_amount}
            </Typography>
          </Box>
          <Box className="purchase_invoice_sec">
            <Typography className="details_lv" variant="p">
              Transaction ID
            </Typography>
            <Typography className="details_lv" variant="p">
              {purchaseData.transaction_id}
            </Typography>
          </Box>
          <Box className="purchase_invoice_sec">
            <Typography className="details_lv" variant="p">
              Date
            </Typography>
            <Typography className="details_lv" variant="p">
              {currentDate}
            </Typography>
          </Box>
          <Box className="purchase_invoice_sec">
            <Typography className="details_lv" variant="p">
              Status
            </Typography>
            <Typography className="details_lv" variant="p">
              {purchaseData.status}
            </Typography>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
