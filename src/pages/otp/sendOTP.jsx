import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import PhoneNumber from "../../components/phoneNumber";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomSnackbar from "../../components/snackbar";
import CustomLoader from "../../components/customLoader";
import { sentOTP } from "./../../services/api_service";

import axios from "axios";

const SendOTP = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can send the OTP to the entered phone number here
    try {
      const response = await axios.post(sentOTP, {
        phone: phone, // Payload sent to the backend
      });
      if (response.status == 200) {
        navigate("/verify-otp", { state: phone });
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
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
    <React.Fragment>
      <CssBaseline />
      <Container className="outer_content">
        <Box>
          <Typography className="header_headline" fontWeight={700} variant="p">
            Hi! Welcome to E-pass
          </Typography>
        </Box>
        <Box>
          <Typography className="phn_num_otp_text" variant="p">
            Create your account
          </Typography>
        </Box>
        <Box fontStyle={{ marginTop: "10px" }}>
          <Box className="mb10">
            <Typography fontSize={13} variant="p">
              Enter your phone number
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <PhoneNumber
              value={phone}
              onChange={(newPhone) => setPhone(newPhone)} // Correct onChange usage
            />
            <Box className="mt10 trams_condition_sec_checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    className="marginCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I agree to ePass"
              />
              <Link
                className="trams_condition_link"
                href="https://epassdonations.com/terms-conditions/"
              >
                Terms & Conditions
              </Link>
            </Box>
            {loading && <CustomLoader />}
            <Button
              type="submit"
              className="auth_btn w100"
              variant="contained"
              disabled={!isChecked}
              sx={{
                backgroundColor: isChecked ? "primary.main" : "#E4E3E4",
                color: isChecked ? "white" : "black",
                "&:hover": {
                  backgroundColor: isChecked ? "primary.dark" : "#E4E3E4",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E4E3E4 !important",
                  color: "#ffffff",
                },
              }}
            >
              Continue
            </Button>
          </form>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SendOTP
