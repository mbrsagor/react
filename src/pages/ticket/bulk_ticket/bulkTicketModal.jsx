/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import PhoneNumber from "../../../components/phoneNumber";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import {
  MyEvents,
  PremiumBulkTicketURL,
  ComplementaryBulkTicketURL,
  VerifyComplementaryBulkTicketURL,
} from "../../../services/api_service";

const ENV = import.meta.env.MODE; // Vite automatically sets this

const API_URLS = {
  development: import.meta.env.VITE_DEVELOPMENT_PUBLIC_KEY,
  production: import.meta.env.VITE_PRODUCTION_PUBLIC_KEY,
};

const publicKey = API_URLS[ENV] || API_URLS.development;
const stripePromise = loadStripe(publicKey);

// Stripe Checkout Form (No Submit Button)
function CheckoutForm({ onPaymentSuccess, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.");
      return;
    }
    if (!clientSecret) {
      console.log("Missing clientSecret:", clientSecret);
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    // Extract user full name
    const customerName = user ? user.fullname : "Anonymous"; // Adjust this key if needed

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerName,
            },
          },
        }
      );

      if (error) {
        setError(error.message);
      } else {
        console.log("Payment successful!", paymentIntent);
        onPaymentSuccess();
      }
    } catch (err) {
      setError("Payment failed. Try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box className="stripe_ui_styling">
        <CardElement
          options={{
            style: { base: { fontSize: "18px" } },
          }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={handlePayment}
        disabled={loading}
        className="mt5 modal_submit_btn"
      >
        {loading ? "Processing..." : "Submit"}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default function BulkTicketModal({
  open,
  handleClose,
  onPriceAdded,
  selectedPrice,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [single_ticket_price, setSingleTicketPrice] = useState(0.0);
  const [quantity, setQuantity] = useState();
  const [type, setType] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentID] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    axios
      .get(MyEvents)
      .then((response) => setEvents(response.data.data || []))
      .catch(() => setEvents([]));
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Generate client secret and set client secret
  const handleTypeChange = async (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    if (selectedType === "Complementary") {
      try {
        const resp = await axios.post(ComplementaryBulkTicketURL, { quantity });
        if (resp.status === 201) {
          setPaymentID(resp.data.payment_intent_id);
          setClientSecret(resp.data.client_secret);
          console.log("Received clientSecret:", resp.data.client_secret);
        }
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
        setClientSecret(""); // Reset clientSecret on error
      }
    } else {
      setClientSecret(""); // Reset when switching to another type
    }
  };

  // Submit data to server
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // If the single ticket price is 0, make the VerifyComplementaryBulkTicketURL API call
      if (single_ticket_price === 0) {
        console.log("Calling VerifyComplementaryBulkTicketURL API for price 0");

        const resp = await axios.post(VerifyComplementaryBulkTicketURL, {
          name: name,
          phone: phone,
          quantity: quantity,
          event: selectedEvent,
          single_ticket_price: 0,
          payment_id: paymentId, // Assuming paymentId is valid
        });

        if (resp.status === 201) {
          setClientSecret(resp.data.client_secret);
          console.log("Received clientSecret:", resp.data.client_secret);
          setSnackbar({
            open: true,
            message: resp.data.message,
            severity: "success",
          });
          // Navigate to purchase-success route after successful purchase
          navigate("/purchase-success", {
            state: { purchaseData: resp.data }, // Pass response.data as state
          });
        }

        // Prevent the PremiumBulkTicketURL API call when price is 0
        return; // Early exit if the price is 0
      }

      // If the price is not 0, proceed with the PremiumBulkTicketURL API call
      console.log(
        "Calling PremiumBulkTicketURL API for price",
        single_ticket_price
      );

      const requestData = {
        name,
        phone,
        quantity,
        event: selectedEvent,
        single_ticket_price: single_ticket_price,
      };

      const response = await axios.post(PremiumBulkTicketURL, requestData);
      if (response.status === 201) {
        setClientSecret(response.data.client_secret);
        console.log("Received clientSecret:", response.data.client_secret);
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setName("");
        setPhone("");
        setQuantity("");
        setSelectedEvent("");
        setType("");
        onPriceAdded();
        handleClose();
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err); // More detailed error logging
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
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
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box className="package_modal">
            <Box className="mt15">
              <Typography className="create_package_title" variant="h6">
                Create Bulk Ticket
              </Typography>
              <form className="create_event_form">
                <Box>
                  <Typography className="event_form_label">
                    Full Name
                  </Typography>
                  <TextField
                    placeholder="Write Here"
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">Phone</Typography>
                  <PhoneNumber onChange={(newPhone) => setPhone(newPhone)} />
                </Box>
                <Box className="mt6">
                  <Typography className="event_form_label">Quantity</Typography>
                  <TextField
                    placeholder="Write Here"
                    type="number"
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                    }}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value, 10) || 0)
                    }
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">
                    Ticket Type
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={type}
                      className="custom-select common_field_text"
                      onChange={handleTypeChange} // Call function when ticket type changes
                      displayEmpty
                      renderValue={(selected) =>
                        selected ? selected : "Tap Here to select"
                      }
                    >
                      <MenuItem value="">Tap Here to select</MenuItem>
                      <MenuItem value="Premium">Premium</MenuItem>
                      <MenuItem value="Complementary">Complementary</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Typography className="event_form_label">
                    Select Event
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="event-select-label">Tap Here</InputLabel>
                    <Select
                      labelId="event-select-label"
                      className="custom-select common_field_text"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                      {events.length > 0 ? (
                        events.map((ev) => (
                          <MenuItem key={ev.id} value={ev.id}>
                            {ev.title}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Event Available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>

                {type === "Premium" && (
                  <>
                    <Box className="mt6">
                      <Typography className="event_form_label">
                        Single ticket price
                      </Typography>
                      <TextField
                        placeholder="Write Here"
                        type="number"
                        className="common_field_text"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                        }}
                        value={single_ticket_price}
                        onChange={(e) =>
                          setSingleTicketPrice(parseFloat(e.target.value) || 0)
                        }
                      />
                    </Box>
                  </>
                )}
                {/* Show Stripe Payment if 'Complementary' is selected */}
                {type === "Complementary" && (
                  <>
                    <Typography className="event_form_label">
                      Add card information
                    </Typography>
                    <Box className="mt6">
                      <Elements stripe={stripePromise}>
                        {type === "Complementary" && (
                          <CheckoutForm
                            onPaymentSuccess={handleSubmit}
                            clientSecret={clientSecret}
                          />
                        )}
                      </Elements>
                    </Box>
                  </>
                )}

                {type !== "Complementary" && (
                  <Button
                    variant="contained"
                    className="modal_submit_btn mt5"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {selectedPrice ? "Update" : "Submit"}
                  </Button>
                )}

                {loading && <CustomLoader />}
              </form>
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
