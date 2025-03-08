/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import Avatar from "@mui/material/Avatar";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

import { motion } from "framer-motion";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import CustomSnackbar from "../../../components/snackbar";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";
import { EventDetailURL, CreatePaymentIntent, PurchaseEventPackageURL } from "../../../services/api_service";

const ENV = import.meta.env.MODE; // Vite automatically sets this

const API_URLS = {
  development: import.meta.env.VITE_DEVELOPMENT_PUBLIC_KEY,
  production: import.meta.env.VITE_PRODUCTION_PUBLIC_KEY,
};

const publicKey = API_URLS[ENV] || API_URLS.development;

console.log("Current Environment:", ENV);
console.log("API Key:", publicKey);

// Load Stripe public key
const stripePromise = loadStripe(publicKey);

// CheckoutForm Component
// eslint-disable-next-line react/prop-types
const CheckoutForm = ({selectedPackage, quantity, setSnackbar, onPaymentSuccess}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  useEffect(() => {
    if (selectedPackage) {
      const fetchClientSecret = async () => {
        try {
          const response = await axios.post(CreatePaymentIntent, {
            // eslint-disable-next-line react/prop-types
            amount: Math.floor(selectedPackage.unit_price * 100) * quantity, // Amount in cents
          });

          if (response.status === 201) {
            setClientSecret(response.data.client_secret);
          } else {
            setSnackbar({
              open: true,
              message: "Failed to create payment intent.",
              severity: "error",
            });
          }
        } catch (error) {
          console.error("API Error:", error);
          setSnackbar({
            open: true,
            message: "Something went wrong.",
            severity: "error",
          });
        }
      };

      fetchClientSecret();
    }
  }, [selectedPackage, quantity, setSnackbar]);

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
    if (!stripe || !elements || !clientSecret) {
      console.log("Stripe.js hasn't loaded yet or missing clientSecret.");
      return;
    }

    setLoading(true); // ✅ Start loading

    const cardElement = elements.getElement(CardElement);
    // Extract user full name
    const customerName = user ? user.fullname : "Anonymous"; // Adjust this key if needed

    // Confirm the payment
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
      setSnackbar({
        open: true,
        message: `Payment failed: ${error.message}`,
        severity: "error",
      });
    } else if (paymentIntent.status === "succeeded") {
      setSnackbar({
        open: true,
        message: "Payment successful!",
        severity: "success",
      });

      // ✅ Call the success handler (e.g., show a message, redirect, etc.)
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentIntent.id);
      }
      setLoading(false); // ✅ Stop loading after success
    }
  };

  return (
    <Box className="payment_form">
      <Box className="payment_content">
        <Typography className="select_card_number" variant="p">
          Add card number
        </Typography>
        <Box className="stripe_ui_styling">
          <CardElement options={{ style: { base: { fontSize: "20px" } } }} />
        </Box>
        <Button
          className="get_ticket_btn"
          onClick={handlePayment}
          disabled={!stripe || loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Get Tickets"
          )}
        </Button>
      </Box>
    </Box>
  );
};

// SponsorEventDetails Component
export default function SponsorEventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // This handles will be called when purchase event package API with redirect to purchase success page.
  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const requestData = {
        unit: quantity,
        event: parseInt(id),
        amount: quantity * pricePerUnit * 100, // Convert to cents
        package: selectedPackage.id,
        payment_id: paymentIntentId,
      };

      const response = await axios.post(PurchaseEventPackageURL, requestData); // ✅ Await the API call

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          // message: "Payment was successful! 🎉",
          severity: "success",
        });
        // Navigate to purchase-success route after successful purchase
        navigate("/purchase-success", {
          state: { purchaseData: response.data }, // Pass response.data as state
        });
      } else {
        setSnackbar({
          open: true,
          message: response.data?.message || "Unexpected response received",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("API Error:", error); // ✅ Log any API errors
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    }
  };

  // Fetch event details
  useEffect(() => {
    setLoading(true);
    axios
      .get(EventDetailURL(id))
      .then((response) => {
        if (response?.data?.data?.packages) {
          const fetchedPackages = response.data.data.packages;
          setPackages(fetchedPackages);
          setEvent(response.data.data);

          if (fetchedPackages.length > 0) {
            setSelectedPackage(fetchedPackages[0]);
            setPricePerUnit(fetchedPackages[0].unit_price);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvent([]);
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Failed to fetch event details.",
          severity: "error",
        });
      });
  }, [id]);

  // Handle package selection
  const handlePackageSelection = (pack) => {
    setSelectedPackage(pack);
    setPricePerUnit(pack.unit_price);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        // Calculate new position and loop back when reaching the end
        const newOffset = (prev - 220) % (packages.length * 220);
        return newOffset;
      });
    }, 200);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [packages.length]); // Re-run when package list changes

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content parent_purchase">
        <ToolsBar link="/sponsor-home/" title="Event Details" />
        <Box className="parent_sec">
          <Box className="event_details_sec sponsor_purchase_event_details">
            {loading && <CircularProgress />}
            <Box className="thumbnail-sec">
              <img
                src={event.thumbnail || DefaultThumbnail}
                alt={event.title}
              />
            </Box>
            <Box className="event_info">
              <Typography className="event_title" variant="h6">
                {event.title}
              </Typography>
              <Box className="company_info">
                <Avatar
                  alt={event.company_name}
                  src="/static/images/avatar/1.jpg"
                />
                <Typography className="company_name">
                  {event.company_name}
                </Typography>
              </Box>
              <Box className="venue">
                <Typography className="about_event_text" variant="h5">
                  Event Venue
                </Typography>
                <Box className="venue_child">
                  <PlaceIcon />
                  <Typography className="event_venue">
                    {event.location}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="event_description">
              <Typography className="about_event_text" variant="h5">
                About this Event
              </Typography>
              <Typography className="event_content">
                {event.description}
              </Typography>
            </Box>
            <Box className="mt6">
              <Typography className="about_event_text" variant="h5">
                Select Package
              </Typography>
            </Box>

            <Box
              sx={{
                overflow: "hidden", // Hides overflow for clean scrolling
                width: "100%", // Ensures it fits the screen width
              }}
            >
              <motion.div
                className="sponsor_detail_package_sec"
                drag="x"
                dragConstraints={{
                  left: -(packages.length * 220 - window.innerWidth + 40),
                  right: 0,
                }} // Auto adjusts for items
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "max-content", // Ensures all items are inline
                  cursor: "grab",
                }}
                whileTap={{ cursor: "grabbing" }}
              >
                {packages.map((pack) => (
                  <motion.div
                    key={pack.id}
                    className={`single_package ${selectedPackage?.id === pack.id ? "selected" : ""}`}
                    onClick={() => handlePackageSelection(pack)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      cursor: "pointer",
                      border:
                        selectedPackage?.id === pack.id
                          ? "2px solid blue"
                          : "1px solid gray",
                      padding: "10px",
                      margin: "5px",
                      borderRadius: "5px",
                      minWidth: "200px", // Ensure each card is visible
                    }}
                  >
                    <Typography>{pack.title}</Typography>
                    <Typography>${pack.unit_price}</Typography>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </Box>
          <Box className="purchase_event_sec">
            <Box className="purchase_event_main">
              <Box className="qnt_price_sec">
                <Box className="qnt_btn">
                  <Button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    <RemoveOutlinedIcon />
                  </Button>
                  <Typography className="qnt" variant="p">
                    {quantity} unit{quantity > 1 ? "s" : ""}
                  </Typography>
                  <Button onClick={() => setQuantity((prev) => prev + 1)}>
                    <ControlPointOutlinedIcon />
                  </Button>
                </Box>
              </Box>
              <Box className="get_ticket_sec">
                <Typography className="price" variant="p">
                  ${(quantity * pricePerUnit).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                selectedPackage={selectedPackage}
                quantity={quantity}
                setSnackbar={setSnackbar}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
          </Box>
        </Box>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Container>
    </React.Fragment>
  );
}
