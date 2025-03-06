import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import ToolsBar from "../../../components/tools_bar";
import BulkTicketModal from "./bulkTicketModal";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { BulkTicketURL } from "../../../services/api_service";

export default function BulkTicket() {
  // Model
  const [open, setOpen] = useState(false);
  const [prices, setPrices] = useState([]);
  const [selectedPrice, setSelectPrice] = useState(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectPrice(null);
  };
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch all bulk ticket
  const fetchBulkTickets = () => {
    axios
      .get(BulkTicketURL)
      .then((response) => {
        if (response.data.status === "success") {
          setPrices(response.data.data);
        }
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error,
          severity: "error",
        });
        setPrices([]);
      });
  };

  useEffect(() => {
    fetchBulkTickets();
  }, []);

  const handleCategoryAdded = () => {
    fetchBulkTickets();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/events"
          title="Bulk Tickers"
          handleOpen={handleOpen}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec pb80">
          {prices && prices.length > 0 ? (
            prices.map((price) => (
              <Box key={price.id} className="single_bulk_ticket_sec">
                <Typography className="ticket_type" variant="body">
                  {price.single_ticket_price === 0
                    ? "Complementary"
                    : "Premium"}
                </Typography>
                <Box className="info">
                  <Typography className="name" variant="h6">
                    {price.name}
                  </Typography>
                  <Typography className="phone" variant="p">
                    Phone: {price.phone}
                  </Typography>
                  <Box className="ticket_detail">
                    <Box className="ticket_variant">
                      <Typography className="single_pice" variant="p">
                        Single ticket price:
                      </Typography>
                      <Typography className="single_pice" variant="p">
                        Ticket Quantity:
                      </Typography>
                    </Box>
                    <Box className="ticket_variant">
                      <Typography className="price" variant="p">
                        ${price.single_ticket_price}
                      </Typography>
                      <Typography className="price" variant="p">
                        ${price.quantity}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="total_price">
                    <Typography className="total_ticket_price" variant="p">
                      Total
                    </Typography>
                    <Typography className="total_ticket_price" variant="p">
                      ${price.total_amount}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body1">
              No Data Available
            </Typography>
          )}
        </Box>
        <BulkTicketModal
          open={open}
          handleClose={handleClose}
          onPriceAdded={handleCategoryAdded}
          selectedPrice={selectedPrice}
        />
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
