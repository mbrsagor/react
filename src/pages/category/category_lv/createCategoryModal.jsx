import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField, Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function CreateCategoryModal({ open, handleClose }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
          <Box className="category_modal">
            <Box className="mt15">
              <form onSubmit={handleSubmit} className="create_event_form">
                <Box>
                  <Typography className="event_form_label" variant="p">
                    Event Category Name
                  </Typography>
                  <TextField
                    label="Write Here"
                    name="name"
                    className="common_field_text"
                    variant="outlined"
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
                    Upload Icon (Optional)
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    className="file_sample_upload_btn"
                    startIcon={<CloudUploadIcon sx={{ color: "#000" }} />}
                  >
                    Tab Here to select
                    <input
                      type="file"
                      hidden
                      onChange={(event) => setIcon(event.target.value)}
                    />
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
