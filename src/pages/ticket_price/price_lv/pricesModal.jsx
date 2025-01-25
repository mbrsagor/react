/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import { MyTicketPrice, PriceDeleteURL } from "../../../services/api_service";

export default function PriceModel({
  open,
  handleClose,
  onPriceAdded,
  selectedPrice,
}) {
  const [price, setPrice] = useState("");
  const [start_date, setStartDate] = useState(null);
  const [end_date, setSEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedPrice) {
      setPrice(selectedPrice.price || "");
      setStartDate(selectedPrice.start_date || "");
      setSEndDate(selectedPrice.end_date || "");
    } else {
      setPrice("");
      setStartDate("");
      setSEndDate("");
    }
  }, [selectedPrice]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
      try {
      // Format the date when submitting
      const formattedStartDate = start_date ? dayjs(start_date).format("YYYY-MM-DD hh:mm A") : null;
      const formattedEndDate = end_date ? dayjs(end_date).format("YYYY-MM-DD hh:mm A") : null;
      const requestData = { price, formattedStartDate, formattedEndDate };
      let response;

      if (selectedPrice) {
        response = await axios.put(
          PriceDeleteURL(selectedPrice.id),
          requestData
        );
      } else {
        response = await axios.post(MyTicketPrice, requestData);
      }

      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setPrice("");
        setStartDate("");
        setSEndDate("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
                Create Single Ticket Price
              </Typography>
              <form onSubmit={handleSubmit} className="create_event_form">
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Single ticket price
                  </Typography>
                  <TextField
                    label="0.00"
                    name="price"
                    className="common_field_text"
                    variant="outlined"
                    value={price}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">Start Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Tab Here"
                      value={start_date}
                      className="common_field_text"
                      onChange={(event) => setSEndDate(event)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">End Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Tab Here"
                      value={end_date}
                      className="common_field_text"
                      onChange={(event) => setSEndDate(event)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Box>

                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
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
