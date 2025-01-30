import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";

import ToolsBar from "../../../components/tools_bar";
import Avatar from "../../../assets/avatar.png";
import axios from "../../../services/axiosConfig";
import { profileURL } from "../../../services/api_service";

export default function ProfileUpdate() {
  const [userData, setUserData] = useState("");
  const [profile, setProfile] = useState(null);
  // Form data
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
  useEffect(() => {
    // Get user from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(profileURL);
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/profile" title="Update Profile" />
        <Box className="parent_sec">
          <Box className="update_profile_sec">
            <Box className="profile_update_avatar">
              <img
                src={profile?.data?.avatar || Avatar} // Fallback for API profile
                alt={userData?.fullname || "User"}
              />
            </Box>
            <Box className="create_event_form mt5">
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Full Name
                  </Typography>
                  <TextField
                    placeholder="Write Here"
                    name="fullname"
                    value={userData.fullname}
                    className="common_field_text"
                    variant="outlined"
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
                    Email
                  </Typography>
                  <TextField
                    placeholder="brsagor.cse@gmail.com"
                    name="email"
                    value={userData.email}
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    //   onChange={(event) => setTitle(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Address
                  </Typography>
                  <TextField
                    placeholder="Address"
                    name="address"
                    value={address}
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    //   onChange={(event) => setTitle(event.target.value)}
                  />
                </Box>
                <Box className="one_half">
                  <Box>
                    <Typography className="event_form_label" variant="p">
                      City
                    </Typography>
                    <TextField
                      placeholder="City"
                      name="city"
                      value={city}
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      //   onChange={(event) => setTitle(event.target.value)}
                    />
                  </Box>
                  <Box>
                    <Typography className="event_form_label" variant="p">
                      State
                    </Typography>
                    <TextField
                      placeholder="State"
                      name="state"
                      value={state}
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      //   onChange={(event) => setTitle(event.target.value)}
                    />
                  </Box>
                  <Box>
                    <Typography className="event_form_label" variant="p">
                      Zip
                    </Typography>
                    <TextField
                      placeholder="Zip"
                      name="zip"
                      value={zip}
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      //   onChange={(event) => setTitle(event.target.value)}
                    />
                  </Box>
                  <Box>
                    <Typography className="event_form_label" variant="p">
                      Gender
                    </Typography>
                    <TextField
                      placeholder="Male"
                      name="state"
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "15px",
                        },
                      }}
                      //   onChange={(event) => setTitle(event.target.value)}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Date Of Birth
                  </Typography>
                  <TextField
                    placeholder="City"
                    name="dob"
                    value={dob}
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    //   onChange={(event) => setTitle(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Company Name
                  </Typography>
                  <TextField
                    placeholder="City"
                    name="company_name"
                    // value={profile.data.company_name || ""}
                    className="common_field_text"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    //   onChange={(event) => setTitle(event.target.value)}
                  />
                </Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Office Address
                  </Typography>
                  <TextField
                    placeholder="Write here"
                    // value={profile.data.office_address || ""}
                    name="office_address"
                    className="common_field_text"
                    variant="outlined"
                    rows={2}
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "15px",
                      },
                    }}
                    //   onChange={(event) => setDescription(event.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
                >
                  Update Profile
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
