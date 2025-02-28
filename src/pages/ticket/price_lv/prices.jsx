import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import PriceModel from './pricesModal';
import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { MyTicketPrice, PriceDeleteURL } from "../../../services/api_service";

export default function Prices() {
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
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

    const handleDialogOpen = (priceId) => {
      setSelectPrice(priceId);
      setDialogOpen(true);
    };

    const handleDialogClose = () => {
      setDialogOpen(false);
      setSelectPrice(null);
    };

    // Fetch all prices
    const fetchPrices = () => {
      axios
        .get(MyTicketPrice)
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

    const handleDeletePrice = async () => {
      try {
        const response = await axios.delete(PriceDeleteURL(selectedPrice));
        if (response.status === 200) {
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: "success",
          });
          setPrices(prices.filter((price) => price.id !== selectedPrice));
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      } finally {
        handleDialogClose();
      }
    };

    const handleEditPackage = (price) => {
      setSelectPrice(price);
      handleOpen();
    };

    useEffect(() => {
        fetchPrices();
    }, []);
    
    const handleCategoryAdded = () => {
      fetchPrices();
    };


  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/events"
          title="Ticker Prices"
          handleOpen={handleOpen}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec">
          {prices && prices.length > 0 ? (
            prices.map((price) => (
              <Box key={price.id} className="prices_lv_sec">
                <Box className="price_left">
                  <Box>
                    <Typography className="price_text" variant="body1">
                      ${price.price}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="menu_item_text" variant="body1">
                      Start Date: {price.start_date}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="menu_item_text" variant="body1">
                      End Date: {price.end_date}
                    </Typography>
                  </Box>
                </Box>
                <Box className="actions">
                  <Button onClick={() => handleEditPackage(price)}>
                    <CreateIcon />
                  </Button>
                  <Button onClick={() => handleDialogOpen(price.id)}>
                    <DeleteRoundedIcon />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body1">
              No Data Available
            </Typography>
          )}
        </Box>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this category?
          </DialogContent>
          <DialogActions>
            <Button className="custom_dialog_btn" onClick={handleDeletePrice}>
              Yes
            </Button>
            <Button className="custom_dialog_btn" onClick={handleDialogClose}>
              Not Now
            </Button>
          </DialogActions>
        </Dialog>
        <PriceModel
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
