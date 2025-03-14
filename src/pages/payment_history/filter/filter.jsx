import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";

import PhoneNumber from "../../../components/phoneNumber";
import axios from "../../../services/axiosConfig";
import { TransactionFilterURL } from "../../../services/api_service";
import SinglePaymentHistory from "../singlePaymentHistory";

export default function Filter() {
  const [userData, setUserData] = useState("");
  // Filter parameters state
  const [filters, setFilters] = useState({
    company_id: userData.user_id,
    amount: "",
    transaction_type: "",
    transID: "",
    created_at: "",
    phone: "",
  });

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser); // Update userData
        setFilters((prev) => ({
          ...prev,
          company_id: parsedUser.user_id, // Set company_id dynamically
        }));
      }
    }, []);

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(TransactionFilterURL, {
        params: filters,
      });

      // console.log("API Response:", response.data); // Debugging
      if (response.data && Array.isArray(response.data.data)) {
        setTransactions(response.data.data); // Extracting "data" key
      } else {
        setTransactions([]); // Handle unexpected response
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

 const handleFilterChange = (e) => {
   const { name, value } = e.target;

   setFilters((prev) => ({
     ...prev,
     [name]: name === "transaction_type" ? Number(value) || "" : value,
   }));
 };


  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="transaction_filter_area">
        <form className="create_event_form">
          <Box>
            <Typography className="event_form_label">Phone</Typography>
            <PhoneNumber
              onChange={(newPhone) =>
                setFilters((prev) => ({ ...prev, phone: newPhone }))
              }
            />
          </Box>
          <Box className="transaction_column2">
            <Box>
              <Typography className="event_form_label">Date</Typography>
              <TextField
                name="created_at"
                type="date"
                className="common_field_text"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "15px" } }}
                onChange={handleFilterChange}
                value={filters.created_at}
              />
            </Box>
            <Box>
              <Typography className="event_form_label">Amount</Typography>
              <TextField
                name="amount"
                type="number"
                placeholder="Type Here"
                className="common_field_text"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "15px" } }}
                onChange={handleFilterChange}
                value={filters.amount}
              />
            </Box>
            <Box>
              <Typography className="event_form_label">
                Transaction ID
              </Typography>
              <TextField
                name="transID"
                placeholder="Type Here"
                className="common_field_text"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "15px" } }}
                onChange={handleFilterChange}
                value={filters.transID}
              />
            </Box>
            <Box>
              <Typography className="event_form_label">
                Transaction Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  name="transaction_type"
                  value={filters.transaction_type}
                  className="custom-select common_field_text"
                  displayEmpty
                  renderValue={(selected) => {
                    return selected === 1 ? "Sponsor" : "Ticket";
                  }}
                  onChange={handleFilterChange}
                >
                  <MenuItem value={1}>Sponsor</MenuItem>
                  <MenuItem value={2}>Ticket</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Button
            onClick={fetchTransactions}
            variant="contained"
            className="modal_submit_btn mt6"
          >
            Filter Transaction
          </Button>
        </form>
      </Box>
      {/* Display transaction data */}
      <Box className="mt5 transaction_filter_lv">
        {
          transactions.map((transaction) => (
            <SinglePaymentHistory
              key={transaction.id} // Ensure key is correctly set
              transactionID={transaction.transID || "N/A"}
              name={transaction.name || "Unknown"}
              last4={transaction.last4 || "0000"}
              date={transaction.created_at || "No Date"}
              amount={transaction.amount || 0}
              deduction={transaction.deduction_amount || 0}
              fee_deduction={transaction.fee_deduction || 0}
              admin_payout={transaction.admin_payout || 0}
              net_payout={transaction.net_payout || 0}
              transaction_type={transaction.transaction_type_name || "N/A"}
            />
          ))}
      </Box>
    </React.Fragment>
  );
}
