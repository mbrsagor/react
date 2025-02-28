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
import { GuardSignUp } from "../../../services/api_service";
import PasswordField from "../../../components/password"
import PhoneNumber from "../../../components/phoneNumber";

export default function GuardModal({
  open,
  handleClose,
  onGuardAdded,
  selectedGuard,
}) {
  const [userData, setUserData] = React.useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const requestData = {
        fullname : fullname,
        email : email,
        phone : phone,
        role: 5,
        host: userData.user_id,
        password: password,
      };
      let response;
      response = await axios.post(GuardSignUp, requestData);
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        onGuardAdded();
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
          <Box className="package_modal guard_generic">
            <Box className="mt15">
              <Typography className="create_package_title" variant="h6">
                Create Guard
              </Typography>
              <form onSubmit={handleSubmit} className="create_event_form">
                <Box className="mb10">
                  <Typography className="event_form_label" variant="p">
                    Phone Number
                  </Typography>
                  <PhoneNumber
                    value={phone}
                    onChange={(newPhone) => setPhone(newPhone)} // Correct onChange usage
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Enter Fullname
                  </Typography>
                  <TextField
                    placeholder="Fullname"
                    name="fullname"
                    className="common_field_text"
                    variant="outlined"
                    value={fullname}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Enter Email
                  </Typography>
                  <TextField
                    placeholder="email"
                    name="email"
                    className="common_field_text"
                    variant="outlined"
                    value={email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Box>
                <Box className="mb10">
                  <Typography className="event_form_label" variant="p">
                    PassWord
                  </Typography>
                  <PasswordField
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
                >
                  {selectedGuard ? "Update" : "Submit"}
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
