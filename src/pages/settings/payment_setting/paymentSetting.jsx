import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import ToolsBar from "../../../components/tools_bar";
import PaymentModal from "./paymentModal";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { MyAccountsURL, RemoveAccountURL } from "../../../services/api_service";
import MasterCard from "../../../assets/account/masterCard.png";

export default function PaymentSetting() {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleDialogOpen = (paymentMethodId) => {
    setSelectedItemId(paymentMethodId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItemId(null);
  };

  const fetchAccounts = () => {
    if (!user?.stripe_customer_id) return;

    axios
      .get(MyAccountsURL(user.stripe_customer_id))
      .then((response) => {
        if (response.data.status === "success") {
          setCards(response.data.card_info || []);
          setBanks(response.data.bank_info || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
        setSnackbar({
          open: true,
          message: "Error fetching payment data",
          severity: "error",
        });
      });
  };

  useEffect(() => {
    fetchAccounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (paymentMethodId) => {
    if (!user?.stripe_customer_id || !paymentMethodId) {
      setSnackbar({
        open: true,
        message: "Invalid user or payment method ID.",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post(RemoveAccountURL(), {
        stripe_customer_id: user.stripe_customer_id,
        payment_method_id: paymentMethodId,
      });

      setSnackbar({
        open: true,
        message: "Payment method removed successfully",
        severity: "success",
      });

      setCards((prev) =>
        prev.filter((card) => card.payment_method_id !== paymentMethodId)
      );
      setBanks((prev) =>
        prev.filter((bank) => bank.payment_method_id !== paymentMethodId)
      );
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.error || "Failed to remove payment method",
        severity: "error",
      });
    } finally {
      handleDialogClose();
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/profile"
          title="Payment Settings"
          handleOpen={() => setOpen(true)}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec pb80">
          <Box className="card_sec">
            <Typography className="account_title mb5" variant="h6">
              Debit/Credit Cards
            </Typography>
            {cards.length > 0 ? (
              cards.map((card) => (
                <Box key={card.id} className="card_list_section">
                  <Box className="card_info">
                    <Box className="card_with_icon">
                      <Box className="card_icon">
                        <img src={MasterCard} alt={card.card_name} />
                      </Box>
                      <Box className="card">
                        <Typography className="name" variant="h6">
                          {card.card_name}
                        </Typography>
                        <Typography className="phone" variant="body1">
                          *********** {card.last4}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      onClick={() => handleDialogOpen(card.payment_method_id)}
                    >
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

          <Box className="card_sec mt5">
            <Typography className="account_title mb5" variant="h6">
              Payment via Bank
            </Typography>
            {banks.length > 0 ? (
              banks.map((bank) => (
                <Box key={bank.id} className="card_list_section">
                  <Box className="card_info">
                    <Box className="card_with_icon">
                      <Box className="card_icon">
                        <AccountBalanceOutlinedIcon />
                      </Box>
                      <Box className="card">
                        <Typography className="name" variant="h6">
                          {bank.bank_name}
                        </Typography>
                        <Typography className="phone" variant="body1">
                          *********** {bank.last4}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      onClick={() => handleDialogOpen(bank.payment_method_id)}
                    >
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
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this item?
            </DialogContent>
            <DialogActions>
              <Button
                className="custom_dialog_btn"
                onClick={() => handleDelete(selectedItemId)}
              >
                Yes
              </Button>
              <Button className="custom_dialog_btn" onClick={handleDialogClose}>
                Not Now
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <PaymentModal
          open={open}
          handleClose={() => setOpen(false)}
          onAccountAdded={fetchAccounts}
        />
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Container>
    </React.Fragment>
  );
}
