/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import PhoneNumber from "../../../components/phoneNumber";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import {
  BulkTicketURL,
  MyEvents,
  MyAccountsURL,
} from "../../../services/api_service";

export default function BulkTicketModal({
  open,
  handleClose,
  onPriceAdded,
  selectedPrice,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(""); //
  // eslint-disable-next-line no-unused-vars
  const [banks, setBanks] = useState([]);
  const [single_ticket_price, setSingleTicketPrice] = useState(0.0);
  const [quantity, setQuantity] = useState();
  const [type, setType] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(""); // Renamed from 'event'
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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

  // Get all of accounts data loaded
  useEffect(() => {
    if (!user?.stripe_customer_id) return;

    axios
      .get(MyAccountsURL(user.stripe_customer_id))
      .then((response) => {
        if (response.data.status === "success") {
          setCards(response.data.card_info || []);
          setBanks(response.data.bank_info || []);
        } else {
          setCards([]); // Ensure it's always an array
          setBanks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
        setCards([]); // Ensure it's always an array
        setBanks([]);
        setSnackbar({
          open: true,
          message: "Error fetching payment data",
          severity: "error",
        });
      });
  }, [user]);

  // Fetch all events data loaded

  // Create and update new single ticket price.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        name: name,
        phone: phone,
        quantity: quantity,
        currency: "usd", // currency field will be static
        // payment_method_id: "pm_1Qry9vLuP0b1226kMRP77RRn",
        payment_method_id: selectedCard ? selectedCard : "",
        event: selectedEvent, // Use the updated state
        single_ticket_price: single_ticket_price ? single_ticket_price : 0.0,
      };
      let response = await axios.post(BulkTicketURL, requestData);
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setName("");
        setPhone("");
        setQuantity("");
        setSelectedEvent(""); // Reset selected event
        setSelectedCard(""); // Reset selected event
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
      console.error("API Error:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(MyEvents)
      .then((response) => {
        setEvents(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  }, []);

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
          <Box className="package_modal">
            <Box className="mt15">
              <Typography className="create_package_title" variant="h6">
                Create Bulk Ticket
              </Typography>
              <form onSubmit={handleSubmit} className="create_event_form">
                <Box>
                  <Typography className="event_form_label">
                    Full Name
                  </Typography>
                  <TextField
                    placeholder="Write Here"
                    name="name"
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">Phone</Typography>
                  <PhoneNumber
                    onChange={(newPhone) => setPhone(newPhone)} // Ensure it's getting a string
                  />
                </Box>
                <Box className="mt5">
                  <Typography className="event_form_label">
                    Ticket Type
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="ticket-type"
                      value={type}
                      className="custom-select common_field_text"
                      onChange={(e) => setType(e.target.value)}
                      displayEmpty
                      renderValue={(selected) =>
                        selected ? selected : "Tab Here to select"
                      }
                    >
                      <MenuItem value="">Tab Here to select</MenuItem>
                      <MenuItem value="Premium">Premium</MenuItem>
                      <MenuItem value="Complementary">Complementary</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Show Single Ticket Price only if 'Premium' is selected */}
                {type === "Premium" && (
                  <>
                  <Box className="mt6">
                    <Typography className="event_form_label">
                      Single ticket price
                    </Typography>
                    <TextField
                      placeholder="Write Here"
                      name="single_ticket_price"
                      // type="number"
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      value={single_ticket_price}
                      onChange={(e) =>
                        setSingleTicketPrice(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </Box>
                  <Box>
                  <Typography className="event_form_label">
                    Select Payment Method
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="event-payment-label">Tap Here</InputLabel>
                    <Select
                      labelId="event-payment-label"
                      id="event-select"
                      className="custom-select common_field_text"
                      value={selectedCard}
                      onChange={(e) => setSelectedCard(e.target.value)}
                    >
                      {cards.length > 0 ? (
                        cards.map((card) => (
                          <MenuItem
                            key={card.payment_method_id}
                            value={card.payment_method_id}
                          >
                            {card.card_name} (****{card.last4})
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          No Payment Method Available
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                  </>
                )}

                <Box className="mt6">
                  <Typography className="event_form_label">Quantity</Typography>
                  <TextField
                    placeholder="Write Here"
                    name="quantity"
                    type="number"
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value, 10) || 0)
                    }
                  />
                </Box>

                <Box>
                  <Typography className="event_form_label">
                    Select Event
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="event-select-label">Tap Here</InputLabel>
                    <Select
                      labelId="event-select-label"
                      id="event-select"
                      className="custom-select common_field_text"
                      value={selectedEvent} // Updated variable
                      onChange={(e) => setSelectedEvent(e.target.value)} // Updated setter
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
                <Button
                  variant="contained"
                  className="modal_submit_btn mt5"
                  type="submit"
                  disabled={loading}
                >
                  {selectedPrice ? "Update" : "Submit"}
                </Button>
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
