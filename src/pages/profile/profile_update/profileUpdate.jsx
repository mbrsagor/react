import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, Stack, Button } from "@mui/material";
import DefaultAvatar from "../../../assets/avatar.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TextField, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import ToolsBar from "../../../components/tools_bar";
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
    avatar: "", // Store Base64 image here
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
          console.log(response.data.data.role);
          const profile_data = response.data.data;
          setFormData({
            ...profile_data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setSnackbar({
          open: true,
          message: "Error fetching profile data",
          error,
          severity: "error",
        });
      });
  }, []);

  // Handle Profile Picture Upload (Base64)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This will store the base64 image string in formData.avatar
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: reader.result, // Base64 encoded image
        }));
      };
      reader.readAsDataURL(file); // Convert image to base64
    } else {
      setSnackbar({
        open: true,
        message: "Please select a valid image file.",
        severity: "error",
      });
    }
  };

  // Handle Profile Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(ProfileUpdateURL(formData.id), formData);
      console.log(response);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.message || "Profile updated successfully",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Profile update failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/profile" title="Update Profile" />
        <Box className="parent_sec pb80">
          <Box className="update_profile_sec">
            <Box className="create_event_form">
              <form onSubmit={handleSubmit}>
                <Box className="profile_update_avatar">
                  <Stack
                    className="profile_avatar"
                    spacing={2}
                    alignItems="center"
                  >
                    {/* Profile Picture Preview */}
                    <Avatar
                      src={formData.avatar || DefaultAvatar}
                      sx={{ width: 120, height: 120 }}
                    />

                    {/* Upload Button */}
                    <Button
                      className="avatar_btn"
                      variant="contained"
                      component="label"
                      startIcon={<CameraAltIcon />}
                    >
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Stack>
                </Box>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
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
                    type="date"
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
                {formData.role === 3 && (
                  <>
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
                  </>
                )}
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
