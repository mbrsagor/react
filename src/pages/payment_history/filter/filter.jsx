import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import { FormControl, MenuItem, Select } from "@mui/material";

import PhoneNumber from "../../../components/phoneNumber";

export default function Filter() {
  // Model
  // eslint-disable-next-line no-unused-vars
  const [phone, setPhone] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [amount, setAmount] = useState("");
  const [transID, setTransactionID] = useState("");
  const [transaction_type, setTransactionType] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="transaction_filter_area">
        <form className="create_event_form">
          <Box>
            <Typography className="event_form_label">Phone</Typography>
            <PhoneNumber onChange={(newPhone) => setPhone(newPhone)} />
          </Box>
          <Box className="transaction_column2">
            <Box className="mt6">
              <Typography className="event_form_label">Date</Typography>
              <TextField
                placeholder="Write Here"
                type="date"
                className="common_field_text"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                }}
                onChange={(e) => setCreatedAt(e.target.value)}
                value={created_at}
              />
            </Box>
            <Box>
              <Typography className="event_form_label">Amount</Typography>
              <TextField
                placeholder="Write Here"
                type="number"
                className="common_field_text"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                }}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </Box>
            <Box>
              <Typography className="event_form_label">
                Transaction ID
              </Typography>
              <TextField
                placeholder="Write Here"
                className="common_field_text"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                }}
                onChange={(e) => setTransactionID(e.target.value)}
                value={transID}
              />
            </Box>
          </Box>
          <Box>
            <Typography className="event_form_label">
              Transaction Type
            </Typography>
            <FormControl fullWidth>
              <Select
                value={transaction_type}
                className="custom-select common_field_text"
                displayEmpty
                renderValue={(selected) =>
                  selected ? selected : "Tap Here to select"
                }
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <MenuItem value="">Tap Here to select</MenuItem>
                <MenuItem value="sponsor">Sponsor</MenuItem>
                <MenuItem value="ticket">Ticket</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" className="modal_submit_btn mt6">
            Filter Transaction
          </Button>
        </form>
      </Box>
    </React.Fragment>
  );
}
