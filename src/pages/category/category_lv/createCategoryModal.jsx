/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField, Button } from "@mui/material";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import { MyCategories, CategoryDeleteURL } from "../../../services/api_service";
 
export default function CreateCategoryModal({open, handleClose, onCategoryAdded,selectedCategory}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name || "");
      setIcon(selectedCategory.icon || "");
    } else {
      setName("");
      setIcon("");
    }
  }, [selectedCategory]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setIcon(base64);
      } catch (err) {
        console.error("Error converting file to Base64:", err);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const requestData = { name, icon, types: 2 };
      let response;

      if (selectedCategory) {
        response = await axios.put(
          CategoryDeleteURL(selectedCategory.id),
          requestData
        );
      } else {
        response = await axios.post(MyCategories, requestData);
      }

      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setName("");
        setIcon("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onCategoryAdded();
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
        aria-labelledby="category-title"
        aria-describedby="category-description"
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
                    {selectedCategory
                      ? "Edit Category Name"
                      : "Event Category Name"}
                  </Typography>
                  <TextField
                    label="Write Here"
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
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  className="modal_submit_btn"
                  type="submit"
                >
                  {selectedCategory ? "Update" : "Submit"}
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
