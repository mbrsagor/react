import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import { SponsorPaymentHistoryURL } from "../../../services/api_service";
import PaymentList from "./PaymentList";
import PaymentHistoryModal from "../../../components/payment_history_modal";

export default function HostPaymentHistory() {
  // modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const [transactionsHistory, setTransactionHistory] = useState([]);


  // Fetch translations data
    useEffect(() => {
      axios.get(SponsorPaymentHistoryURL).then((response) => {
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
          link="/profile"
          title="Payment History"
        />
        <Box className="parent_sec pb80">
          <Box>
            {transactionsHistory && transactionsHistory.length > 0 ? (
              transactionsHistory.map((transaction) => (
                <PaymentList
                  transactionID={transaction.transaction_id}
                  name={transaction.user_name}
                  date={transaction.created_at}
                  amount={transaction.amount}
                  cardType={transaction.payment_method_types}
                  country={transaction.payment_from_country}
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
        <PaymentHistoryModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Container>
    </React.Fragment>
  );
}
