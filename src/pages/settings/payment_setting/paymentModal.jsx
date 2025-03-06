/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import { AddAccountURL } from "../../../services/api_service";

export default function PaymentModal({ open, handleClose, onAccountAdded }) {
  const [card_number, setCardNumber] = useState("");
  const [user, setUser] = useState(null);
  // For card information
  const [exp_month, SetEXPMonth] = useState("");
  const [exp_year, SetEXPYear] = useState("");
  const [cvv, setCVV] = useState("");
  // For bank information
  const [bank_account_holder_name, setBankAccountHolderName] = useState("");
  const [bank_account_number, setBankAccountNumber] = useState("");
  const [bank_routing_number, setBankRoutingNumber] = useState("");

  // Loading, message, and tab model
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch user data from localStorage (Runs only once)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // console.log("User Data:", parsedUser); // Debugging
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Add new card account.
  const cardHandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.stripe_customer_id) return; // Prevent running if user is not set
    const stripe_cus_id = user.stripe_customer_id;

    try {
      const cardRequestData = {
        payment_type: 2, // bank=1, card=2,
        payment_env: 2, // production=2, development=1
        stripe_customer_id: stripe_cus_id,
        card_number: card_number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvv: cvv,
      };
      let response = await axios.post(AddAccountURL, cardRequestData);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setCardNumber("");
        SetEXPMonth("");
        SetEXPYear("");
        setCVV("");
        handleClose();
        onAccountAdded(); // Refresh the list
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      console.error("API Error:", err);
      setSnackbar({
        open: true,
        message: err.response.data.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const bankHandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.stripe_customer_id) return; // Prevent running if user is not set
    const stripe_cus_id = user.stripe_customer_id;

    try {
      const bankRequestData = {
        payment_type: 1, // bank=1, card=2,
        payment_env: 2, // production=2, development=1
        stripe_customer_id: stripe_cus_id,
        bank_account_holder_name: bank_account_holder_name,
        bank_account_number: bank_account_number,
        bank_routing_number: bank_routing_number,
      };
      let response = await axios.post(AddAccountURL, bankRequestData);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setCardNumber("");
        SetEXPMonth("");
        SetEXPYear("");
        setCVV("");
        handleClose();
        onAccountAdded(); // Refresh the list
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      console.error("API Error:", err);
      setSnackbar({
        open: true,
        message: err.response.data.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Modal
        aria-labelledby="price-title"
        aria-describedby="price-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="payment_add_modal">
            <Box>
              <TabContext value={value}>
                <Box className="account_tab_sec">
                  <TabList
                    className="account_tab_list_sec"
                    onChange={handleChange}
                    aria-label="account_tab_list"
                  >
                    <Tab label="Card" value="1" />
                    <Tab label="Bank" value="2" />
                  </TabList>
                </Box>
                <TabPanel className="account_tab_panel" value="1">
                  <form
                    onSubmit={cardHandleSubmit}
                    className="create_event_form"
                  >
                    <Box>
                      <Typography className="event_form_label">
                        Card Number
                      </Typography>
                      <TextField
                        placeholder="0000000"
                        name="name"
                        className="common_field_text"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "15px",
                          },
                        }}
                        value={card_number}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </Box>
                    <Box className="card_info">
                      <Box>
                        <Typography className="event_form_label">
                          Expiration Month
                        </Typography>
                        <TextField
                          placeholder="00"
                          name="exp_month"
                          type="number"
                          className="common_field_text"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                            },
                          }}
                          value={exp_month}
                          onChange={(e) => SetEXPMonth(e.target.value)}
                        />
                      </Box>
                      <Box>
                        <Typography className="event_form_label">
                          Expiration Year
                        </Typography>
                        <TextField
                          placeholder="00"
                          name="exp_year"
                          type="number"
                          className="common_field_text"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
                            },
                          }}
                          value={exp_year}
                          onChange={(e) => SetEXPYear(e.target.value)}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Typography className="event_form_label">CVV</Typography>
                      <TextField
                        placeholder="000"
                        name="cvv"
                        type="number"
                        className="common_field_text"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "15px",
                          },
                        }}
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      className="modal_submit_btn mt5"
                      type="submit"
                      disabled={loading}
                    >
                      Submit
                    </Button>
                    {loading && <CustomLoader />}
                  </form>
                </TabPanel>
                <TabPanel className="account_tab_panel" value="2">
                  <form
                    onSubmit={bankHandleSubmit}
                    className="create_event_form"
                  >
                    <Box>
                      <Typography className="event_form_label">
                        Account Holder Name
                      </Typography>
                      <TextField
                        placeholder="Write Here"
                        name="bank_account_holder_name"
                        className="common_field_text"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "15px",
                          },
                        }}
                        value={bank_account_holder_name}
                        onChange={(e) =>
                          setBankAccountHolderName(e.target.value)
                        }
                      />
                    </Box>
                    <Box>
                      <Typography className="event_form_label">
                        Account Number
                      </Typography>
                      <TextField
                        placeholder="Write Here"
                        name="bank_account_number"
                        type="number"
                        className="common_field_text"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "15px",
                          },
                        }}
                        value={bank_account_number}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                      />
                    </Box>
                    <Box>
                      <Typography className="event_form_label">
                        Routing Number
                      </Typography>
                      <TextField
                        placeholder="Write Here"
                        name="bank_routing_number"
                        type="number"
                        className="common_field_text"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "15px",
                          },
                        }}
                        value={bank_routing_number}
                        onChange={(e) => setBankRoutingNumber(e.target.value)}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      className="modal_submit_btn mt5"
                      type="submit"
                      disabled={loading}
                    >
                      Submit
                    </Button>
                    {loading && <CustomLoader />}
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
