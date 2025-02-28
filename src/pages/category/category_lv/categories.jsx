import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CreateCategoryModal from "./createCategoryModal";
import CustomSnackbar from "../../../components/snackbar";
import { MyCategories, CategoryDeleteURL } from "../../../services/api_service";

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDialogOpen = (categoryId) => {
    setSelectedEventId(categoryId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEventId(null);
  };

  const fetchCategories = () => {
    axios
      .get(MyCategories)
      .then((response) => {
        if (response.data.status === "success") {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(CategoryDeleteURL(selectedEventId));
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setCategories(
          categories.filter((category) => category.id !== selectedEventId)
        );
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      handleDialogClose();
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    handleOpen();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryAdded = () => {
    fetchCategories();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/categories"
          title="Event Category"
          handleOpen={handleOpen}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec pb80">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Box key={category.id} className="category_lv_sec">
                <Box className="cat_icon_with_txt">
                  <WidgetsIcon />
                  <Typography className="menu_item_text" variant="p">
                    {category.name}
                  </Typography>
                </Box>
                <Box className="actions">
                  <Button onClick={() => handleEditCategory(category)}>
                    <CreateIcon />
                  </Button>
                  <Button onClick={() => handleDialogOpen(category.id)}>
                    <DeleteRoundedIcon />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body">
              No Data Available
            </Typography>
          )}
        </Box>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this category?
          </DialogContent>
          <DialogActions>
            <Button className="custom_dialog_btn" onClick={handleDeleteEvent}>
              Yes
            </Button>
            <Button className="custom_dialog_btn" onClick={handleDialogClose}>
              Not Now
            </Button>
          </DialogActions>
        </Dialog>
        <CreateCategoryModal
          open={open}
          handleClose={handleClose}
          onCategoryAdded={handleCategoryAdded}
          selectedCategory={selectedCategory}
        />
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
