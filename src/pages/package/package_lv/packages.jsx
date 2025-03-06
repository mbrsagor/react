import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import PackageModal from "./packageModel";
import { MyPackages, PackageDeleteURL } from "../../../services/api_service";

export default function PackageList() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setselectedPackage] = useState(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setselectedPackage(null); // Correctly reset the selected package
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDialogOpen = (packageId) => {
    setselectedPackage(packageId); // Correctly set the selected package ID
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setselectedPackage(null); // Reset the selected package when dialog closes
  };

  const fetchPackages = () => {
    axios
      .get(MyPackages)
      .then((response) => {
        if (response.data.status === "success") {
          setPackages(response.data.data);
        }
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error,
          severity: "error",
        });
        setPackages([]);
      });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(PackageDeleteURL(selectedPackage));
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setPackages(packages.filter((pack) => pack.id !== selectedPackage));
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

  const handleEditPackage = (pack) => {
    setselectedPackage(pack); // Pass the full package object for editing
    handleOpen();
  };

  const handlePackageAdded = () => {
    fetchPackages();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/events"
          title="Event Package"
          handleOpen={handleOpen}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec pb80">
          {packages && packages.length > 0 ? (
            packages.map((pack) => (
              <Box key={pack.id} className="package_lv_sec">
                <Box className="package_left_text">
                  <Box>
                    <Typography className="menu_item_text" variant="body1">
                      Name: {pack.title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="menu_item_text" variant="body1">
                      Ticket limit: {pack.ticket_limit}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="menu_item_text" variant="body1">
                      Unit price: {pack.unit_price}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="menu_item_text" variant="body1">
                    {pack.description}
                    </Typography>
                  </Box>
                </Box>
                <Box className="actions">
                  <Button onClick={() => handleEditPackage(pack)}>
                    <CreateIcon />
                  </Button>
                  <Button onClick={() => handleDialogOpen(pack.id)}>
                    <DeleteRoundedIcon />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body1">
              No Data Available
            </Typography>
          )}
        </Box>
        <PackageModal
          open={open}
          handleClose={handleClose}
          onPackageAdded={handlePackageAdded}
          selectedPackage={selectedPackage}
        />
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this package?
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
      </Container>
    </React.Fragment>
  );
}
