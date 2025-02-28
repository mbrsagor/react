import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import { FeedBackURL } from "../../../services/api_service";
import FileUploadIcon from "../../../assets/uploader.png";

export default function Feedback() {
  // modal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, SetAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  //  Submit handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("message", message);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      let response = await axios.post(FeedBackURL, formData);
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        SetAttachment(null);
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
      <Container className="content">
        <ToolsBar link="/settings" title="Feedback" />
        <Box className="parent_sec pb80">
          <Box className="feedback">
            <form
              onSubmit={handleSubmit}
              className="create_event_form"
              encType="multipart/form-data"
            >
              <Box>
                <Typography className="event_form_label" variant="p">
                  Your Name
                </Typography>
                <TextField
                  placeholder="Write Here"
                  name="name"
                  className="common_field_text"
                  variant="outlined"
                  value={name}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                  onChange={(event) => setName(event.target.value)}
                />
              </Box>
              <Box>
                <Typography className="event_form_label" variant="p">
                  Your Phone Number
                </Typography>
                <TextField
                  placeholder="Write Here"
                  name="phone"
                  className="common_field_text"
                  variant="outlined"
                  value={phone}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Box>
              <Box>
                <Typography className="event_form_label" variant="p">
                  Your Email
                </Typography>
                <TextField
                  placeholder="Write Here"
                  name="email"
                  type="email"
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
              <Box>
                <Typography className="event_form_label" variant="p">
                  Your Feedback/Message/Complain/Issue
                </Typography>
                <TextField
                  multiline
                  placeholder="Write Here"
                  name="message"
                  className="common_field_text"
                  variant="outlined"
                  rows={3}
                  value={message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </Box>
              <Box>
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Attachment (Image Only)
                  </Typography>
                </Box>
                <input
                  accept="image/*,application/pdf" // You can specify multiple file types
                  style={{ display: "none" }}
                  id="upload-file"
                  type="file"
                  onChange={(event) => SetAttachment(event.target.files[0])}
                />

                <label htmlFor="upload-file">
                  <Button
                    className="file_upload_btn"
                    variant="contained"
                    component="span"
                  >
                    <img src={FileUploadIcon} alt="file_upload" height={100} />
                    {attachment && <Typography>{attachment.name}</Typography>}
                  </Button>
                </label>
              </Box>
              <Button
                variant="contained"
                className="modal_submit_btn"
                type="submit"
                disabled={loading} // Disable while loading
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
              {loading && <CustomLoader />}
            </form>
          </Box>
        </Box>
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
