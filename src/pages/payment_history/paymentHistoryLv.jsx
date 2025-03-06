import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ToolsBar from "../../components/tools_bar";
import SinglePaymentHistory from "./singlePaymentHistory";
import PaymentHistoryModal from "../../components/payment_history_modal";

import axios from "../../services/axiosConfig";
import { TransactionURL } from "../../services/api_service";

export default function PaymentHistoryLv() {
  // modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const [transactionsHistory, setTransactionHistory] = useState([]);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  // Fetch translations data
  useEffect(() => {
    axios.get(TransactionURL).then((response) => {
      if (response) {
        const transactions = response.data.data;
        setTransactionHistory(transactions); // Ensure it's stored as an array
      }
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          open={modalOpen}
          onClose={handleClose}
          handleOpen={handleOpen}
          link="/profile"
          title="Payment History"
        />
        <Box className="parent_sec pb80">
          <Box>
            {transactionsHistory && transactionsHistory.length > 0 ? (
              transactionsHistory.map((transaction) => (
                <SinglePaymentHistory
                  transactionID={transaction.transID}
                  name={transaction.name}
                  last4={transaction.last4}
                  date={transaction.created_at}
                  amount={transaction.amount}
                  deduction={transaction.deduction_amount}
                  fee_deduction={transaction.fee_deduction}
                  admin_payout={transaction.admin_payout}
                  net_payout={transaction.net_payout}
                  transaction_type={transaction.transaction_type_name}
                  key={transaction.id}
                />
              ))
            ) : (
              <Typography className="no_data_text" variant="body1">
                No Data Available
              </Typography>
            )}
          </Box>
          <PaymentHistoryModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
