import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import Avatar from "@mui/material/Avatar";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import CustomSnackbar from "../../../components/snackbar";
import PaymentsModal from "./paymentsModal";
import { EventDetailURL, purchaseEventPackageURL, MyAccountsURL } from "../../../services/api_service";

export default function SponsorEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [packages, setPackages] = useState([]);
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  // Fetch cards and banks
  useEffect(() => {
    const fetchData = async () => {
      axios.get(MyAccountsURL(user.stripe_customer_id)).then((response) => {
        if (response.data.status === "success") {
          setCards(response.data.card_info || []);
          setBanks(response.data.bank_info || []);
        }
      });
    };

    if (user) fetchData(); // Ensure user is available before fetching
  }, [user]);

  // Fetch event details and packages
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvent([]);
      });
  }, [id]);

  // Handle package selection
  const handlePackageSelection = (pack) => {
    setSelectedPackage(pack);
    setPricePerUnit(pack.unit_price);
  };

  // Handle purchasing event package
  const eventPackagePurchaseHandel = async () => {
    if (!selectedPackage) {
      setSnackbar({
        open: true,
        message: "Please select a package before purchasing.",
        severity: "error",
      });
      return;
    }

    try {
      const requestData = {
        unit: quantity,
        event: parseInt(id),
        amount: quantity * pricePerUnit * 100, // Convert to cents
        package: selectedPackage.id,
        currency: "usd",
        payment_method_id: paymentMethodId, // Use the selected payment method
      };

      const response = await axios.post(purchaseEventPackageURL, requestData);
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setQuantity(1);
        // Navigate to purchase-success route after successful purchase
        navigate("/purchase-success", {
          state: { purchaseData: response.data }, // Pass response.data as state
        });
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
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content parent_purchase">
        <ToolsBar link="/sponsor-home/" title="Event Details" />
        <Box className="parent_sec pb80">
          <Box className="event_details_sec">
            <Box className="thumbnail-sec">
              <img src={event.thumbnail} alt={event.title} />
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
                <Typography className="company_name" variant="p">
                  {event.company_name}
                </Typography>
              </Box>
              <Box className="venue">
                <Typography className="about_event_text" variant="h5">
                  Event Venue
                </Typography>
                <PlaceIcon />
                <Typography className="event_venue" variant="p">
                  {event.location}
                </Typography>
              </Box>
            </Box>
            <Box className="event_description">
              <Typography className="about_event_text" variant="h5">
                About this Event
              </Typography>
              <Typography className="event_content" variant="p">
                {event.description}
              </Typography>
            </Box>
            <Box className="mt5">
              <Typography className="about_event_text" variant="h5">
                Select Package
              </Typography>
            </Box>
            <Box className="sponsor_detail_package_sec">
              {packages.length > 0 ? (
                packages.map((pack) => (
                  <Box
                    key={pack.id}
                    className={`single_package ${selectedPackage?.id === pack.id ? "selected" : ""}`}
                    onClick={() => handlePackageSelection(pack)}
                    style={{
                      cursor: "pointer",
                      border:
                        selectedPackage?.id === pack.id
                          ? "2px solid blue"
                          : "1px solid gray",
                      padding: "10px",
                      margin: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography className="package_name" variant="body1">
                      {pack.title}
                    </Typography>
                    <Typography className="package_price" variant="body1">
                      ${pack.unit_price}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body">No Package Available</Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box className="purchase_event_sec">
          <Box className="purchase_event_main">
            <Box className="qnt_price_sec">
              <Typography className="price" variant="p">
                ${(quantity * pricePerUnit).toFixed(2)}
              </Typography>
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
              <Button onClick={handleOpen}>Get Tickets</Button>
            </Box>
          </Box>
        </Box>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
        <PaymentsModal
          open={open}
          handleClose={handleClose}
          eventPackagePurchaseHandel={eventPackagePurchaseHandel}
          cards={cards}
          banks={banks}
          setPaymentMethodId={setPaymentMethodId} // pass setter
          paymentMethodId={paymentMethodId} // pass paymentMethodId to modal
        />
      </Container>
    </React.Fragment>
  );
}
