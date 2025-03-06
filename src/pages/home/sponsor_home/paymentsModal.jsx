import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types"; // Import PropTypes
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Typography, CircularProgress } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MasterCard from "../../../assets/account/masterCard.png"; // Ensure this path is correct

// eslint-disable-next-line react/prop-types
export default function PaymentsModal({ open, handleClose, eventPackagePurchaseHandel, cards, banks, setPaymentMethodId, paymentMethodId}) {
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  useEffect(() => {
    // Reset the payment method when the modal is closed
    if (!open) {
      setSelectedPaymentId(null);
    }
  }, [open]);

  useEffect(() => {
    // Watch for changes to paymentMethodId and log it
    console.log("paymentMethodId has changed to:", paymentMethodId);
  }, [paymentMethodId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePaymentMethodClick = async (paymentId) => {
    if (selectedPaymentId === paymentId) {
      // If the payment method is already selected, trigger the purchase API call
      if (!paymentMethodId) {
        console.warn("No payment method selected yet");
        return; // Early exit if no payment method selected
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to show loading indicator
      await eventPackagePurchaseHandel();
      setLoading(false);
      handleClose();
      return;
    }

    // Otherwise, select the payment method
    setSelectedPaymentId(paymentId);
    const selectedPayment = [...cards, ...banks].find(
      (item) => item.id === paymentId
    );
    if (selectedPayment) {
      // Set payment method ID only if it's a valid selection
      setPaymentMethodId(selectedPayment.payment_method_id);
      console.log("Payment Method ID set:", selectedPayment.payment_method_id);
    } else {
      console.warn("No payment method found for ID:", paymentId);
    }
  };

  return (
    <Box>
      <Modal
        aria-labelledby="payment modal"
        aria-describedby="payment method modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box className="payment_method_selected_modal">
            <Box>
              <TabContext value={value}>
                <Box className="account_tab_sec">
                  <TabList
                    className="account_tab_list_sec"
                    onChange={handleChange}
                  >
                    <Tab label="Card" value="1" />
                    <Tab label="Bank" value="2" />
                  </TabList>
                </Box>

                {/* Card List */}
                <TabPanel className="account_tab_panel" value="1">
                  {loading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CircularProgress />
                    </Box>
                  // eslint-disable-next-line react/prop-types
                  ) : cards.length > 0 ? (
                    // eslint-disable-next-line react/prop-types
                    cards.map((card) => (
                      <Box
                        key={card.id}
                        className={`card_list_section ${selectedPaymentId === card.id ? "selected" : ""}`}
                        onClick={() => handlePaymentMethodClick(card.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <Box className="card_info">
                          <Box className="card_with_icon">
                            <Box className="card_icon">
                              <img src={MasterCard} alt={card.card_name} />
                            </Box>
                            <Box className="card">
                              <Typography className="name" variant="h6">
                                {card.card_name}
                              </Typography>
                              <Typography className="phone" variant="body1">
                                *********** {card.last4}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1">No Data Available</Typography>
                  )}
                </TabPanel>

                {/* Bank List */}
                <TabPanel className="account_tab_panel" value="2">
                  {loading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CircularProgress />
                    </Box>
                  // eslint-disable-next-line react/prop-types
                  ) : banks.length > 0 ? (
                    // eslint-disable-next-line react/prop-types
                    banks.map((bank) => (
                      <Box
                        key={bank.id}
                        className={`card_list_section ${selectedPaymentId === bank.id ? "selected" : ""}`}
                        onClick={() => handlePaymentMethodClick(bank.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <Box className="card_info">
                          <Box className="card_with_icon">
                            <Box className="card_icon">
                              <AccountBalanceOutlinedIcon />
                            </Box>
                            <Box className="card">
                              <Typography className="name" variant="h6">
                                {bank.bank_name}
                              </Typography>
                              <Typography className="phone" variant="body1">
                                *********** {bank.last4}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1">No Data Available</Typography>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
