import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import FileDropZone from "../../components/dropzone";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [packages, setPackages] = useState("");
  const [dob, setDob] = useState(null);

  const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(title);
      console.log(description);
      console.log(location);
      console.log(capacity);
  };

  return (
    <React.Fragment>
      <Box className="create_event_form">
        <form onSubmit={handleSubmit}>
          <FileDropZone />
          <Box className="mt15">
            <Typography className="event_form_label" variant="p">
              Event Title
            </Typography>
            <TextField
              label="Write Here"
              name="title"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Typography className="event_form_label" variant="p">
              Event Description
            </Typography>
            <TextField
              label="Write Here"
              name="description"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Typography className="event_form_label" variant="p">
              Event Tag
            </Typography>
            <TextField
              label="Write Here"
              name="tags"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Typography className="event_tag_label" variant="body2">
              Event Tags Separated by Comma. E.G: Food, Travel
            </Typography>
            <Typography className="event_form_label" variant="p">
              Add Event Venue
            </Typography>
            <TextField
              label="Write Here"
              name="location"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setLocation(event.target.value)}
            />
            <Typography className="event_form_label" variant="p">
              Add Event Capacity
            </Typography>
            <TextField
              label="Write Here"
              name="capacity"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event) => setCapacity(event.target.value)}
            />
            <Typography className="event_form_label" variant="p">
              Event Category
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="event-select">Tab Here</InputLabel>
              <Select
                labelId="event-select"
                className="custom-select common_field_text"
                id="event-select"
                value={category}
                label="Event Category"
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <MenuItem value={3}>Other</MenuItem>
              </Select>
            </FormControl>
            <Typography className="event_form_label" variant="p">
              Select Package/Add
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="event-select">Tab Here</InputLabel>
              <Select
                labelId="event-select"
                className="custom-select common_field_text"
                id="event-select"
                value={packages}
                label="Event Category"
                onChange={(event) => setPackages(event.target.value)}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <MenuItem value={3}>Other</MenuItem>
              </Select>
            </FormControl>
            <Typography className="event_form_label" variant="p">
              Event Staring From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tab Here"
                value={dob}
                className="common_field_text"
                onChange={(newDate) => setDob(newDate)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Typography className="event_form_label" variant="p">
              Event Ending From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tab Here"
                value={dob}
                className="common_field_text"
                onChange={(newDate) => setDob(newDate)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <Button variant="contained" className="app_btn" type="submit">
              Create Event
            </Button>
          </Box>
        </form>
      </Box>
    </React.Fragment>
  );
}
