/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import { MyPackages, PackageDeleteURL } from "../../../services/api_service";

export default function PackageModal({
  open,
  handleClose,
  onPackageAdded,
  selectedPackage,
}) {
  const [title, setTitle] = useState("");
  const [ticket_limit, setTicketLimit] = useState("");
  const [unit_price, setUnitPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (selectedPackage) {
      setTitle(selectedPackage.title || "");
      setTicketLimit(selectedPackage.ticket_limit || "");
      setUnitPrice(selectedPackage.unit_price || "");
      setDescription(selectedPackage.description || "");
    } else {
      setTitle("");
      setTicketLimit("");
      setUnitPrice("");
      setDescription("");
    }
  }, [selectedPackage]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const requestData = { title, ticket_limit, unit_price, description };
      let response;

      if (selectedPackage) {
        response = await axios.put(
          PackageDeleteURL(selectedPackage.id),
          requestData
        );
      } else {
        response = await axios.post(MyPackages, requestData);
      }

      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setTitle("");
        // setUnit("");
        setTicketLimit("");
        setUnitPrice("");
        setDescription("");
        onPackageAdded();
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
        aria-labelledby="package-title"
        aria-describedby="package-description"
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
                Create Package
              </Typography>
              <form onSubmit={handleSubmit} className="create_event_form">
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Package Title
                  </Typography>
                  <TextField
                    placeholder="Write Here"
                    name="title"
                    className="common_field_text"
                    variant="outlined"
                    value={title}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Sponsorship Package In Price
                  </Typography>
                  <TextField
                    placeholder="0.00"
                    name="unit_price"
                    className="common_field_text"
                    variant="outlined"
                    value={unit_price}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setUnitPrice(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Ticker Include In Package
                  </Typography>
                  <TextField
                    placeholder="0"
                    name="ticket_limit"
                    className="common_field_text"
                    variant="outlined"
                    value={ticket_limit}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setTicketLimit(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Description
                  </Typography>
                  <TextField
                    placeholder="Write here"
                    name="description"
                    className="common_field_text"
                    variant="outlined"
                    rows={4}
                    multiline
                    value={description}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
                >
                  {selectedPackage ? "Submit" : "Submit"}
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
