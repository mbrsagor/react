import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import ToolsBar from "../../../components/tools_bar";
import Avatar from "../../../assets/avatar.png";
import axios from "../../../services/axiosConfig";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";
import { profileURL, ProfileUpdateURL } from "../../../services/api_service";

export default function ProfileUpdate() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Form State
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    dob: "",
    gender: "",
    company_name: "",
    office_address: "",
    // avatar: Avatar, // Default Avatar
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch profile data
  useEffect(() => {
    axios
      .get(profileURL)
      .then((response) => {
        if (response) {
          const profile_data = response.data.data;
          setFormData({
            ...profile_data,
          });
        }
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: "Error fetching events:",
          error,
          severity: "error",
        });
        setFormData([]);
      });
  }, []);

  // Handle Profile Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(ProfileUpdateURL(formData.id), formData);

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.message,
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/profile" title="Update Profile" />
        <Box className="parent_sec">
          <Box className="update_profile_sec">
            <Box className="profile_update_avatar">
              <img
                src={formData.avatar ? formData.avatar : Avatar}
                alt="User"
              />
            </Box>
            <Box className="create_event_form mt5">
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography className="event_form_label">
                    Full Name
                  </Typography>
                  <TextField
                    name="fullname"
                    value={formData.fullname}
                    className="common_field_text"
                    variant="outlined"
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">Email</Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    className="common_field_text"
                    variant="outlined"
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">Address</Typography>
                  <TextField
                    name="address"
                    value={formData.address}
                    className="common_field_text"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </Box>
                <Box className="one_half">
                  <Box>
                    <Typography className="event_form_label">City</Typography>
                    <TextField
                      name="city"
                      value={formData.city}
                      className="common_field_text"
                      variant="outlined"
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography className="event_form_label">State</Typography>
                    <TextField
                      name="state"
                      value={formData.state}
                      className="common_field_text"
                      variant="outlined"
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography className="event_form_label">Zip</Typography>
                    <TextField
                      name="zip"
                      value={formData.zip}
                      className="common_field_text"
                      variant="outlined"
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography className="event_form_label">Gender</Typography>
                    <FormControl fullWidth>
                      <InputLabel>Select Gender</InputLabel>
                      <Select
                        name="gender"
                        className="custom-select"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                        <MenuItem value={3}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box>
                  <Typography className="event_form_label">
                    Date Of Birth
                  </Typography>
                  <TextField
                    name="dob"
                    value={formData.dob}
                    className="common_field_text"
                    variant="outlined"
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">
                    Company Name
                  </Typography>
                  <TextField
                    name="company_name"
                    value={formData.company_name}
                    className="common_field_text"
                    variant="outlined"
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label">
                    Office Address
                  </Typography>
                  <TextField
                    name="office_address"
                    value={formData.office_address}
                    className="common_field_text"
                    variant="outlined"
                    multiline
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                  />
                </Box>
                {loading && <CustomLoader />}
                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
                >
                  Update Profile
                </Button>
                <CustomSnackbar
                  open={snackbar.open}
                  message={snackbar.message}
                  severity={snackbar.severity}
                  onClose={handleSnackbarClose}
                />
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
