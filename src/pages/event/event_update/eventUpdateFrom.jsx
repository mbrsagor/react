import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For getting URL parameters and navigation
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import axios from "../../../services/axiosConfig";
import FileDropZone from "../../../components/dropzone";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";
import {
  EventDetailURL,
  MyCategories,
  MyPackages,
  MyTicketPrice,
} from "../../../services/api_service";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EventUpdateForm() {
  const { id } = useParams(); // Get event ID from URL
  const [category, setCategory] = useState([]); // Initialize as an array
  const [priceOptions, setPriceOptions] = useState([]); // To store fetched packages
  const [packageOptions, setPackageOptions] = useState([]); // To store fetched packages
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    tags: [],
    start_date: "",
    end_date: "",
    location: "",
    category: "",
    category_name: "",
    event_capacity: "",
    thumbnail: "",
    packages: [],
    prices: [],
  });

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // messages
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    // Get my all categories options
    axios
      .get(MyCategories)
      .then((response) => {
        setCategory(response.data.data || []);
      })
      .catch(() => setCategory([]));
    // Get my all packages options
    axios
      .get(MyPackages)
      .then((response) => setPackageOptions(response.data.data || []))
      .catch(() => setPackageOptions([]));
    // Get my all price options
    axios
      .get(MyTicketPrice)
      .then((response) => setPriceOptions(response.data.data || []))
      .catch(() => setPriceOptions([]));
  }, []);

  // Fetch event data
  useEffect(() => {
    axios
      .get(EventDetailURL(id)) // Pass id to EventDetailURL
      .then((response) => {
        if (response) {
          //console.log(response.data.data);
          const event = response.data.data;
          setEventData({
            ...event,
            start_date: event.start_date,
            end_date: event.end_date,
            packages: event.packages.map((pkg) => pkg.id), // Pre-select existing packages
            prices: event.prices.map((price) => price.id),
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEventData([]);
      });
  }, [id]);

  // Update event data
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Create a copy of eventData
    const updatedData = { ...eventData };
    // If no new thumbnail is uploaded, keep the existing one
    if (!updatedData.thumbnail.startsWith("data:thumbnail")) {
      delete updatedData.thumbnail; // Prevent overriding the existing image with empty data
    }

    try {
      const updatedData = { ...eventData };
      if (selectedThumbnail) {
        updatedData.thumbnail = selectedThumbnail;
      }
      const response = await axios.put(EventDetailURL(id), updatedData);
      if (response.data.status === "success") {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
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

  // package handle change
  const handlePackagesChange = (event) => {
    const {
      target: { value },
    } = event;
    setEventData({
      ...eventData,
      packages: typeof value === "string" ? value.split(",") : value,
    });
  };

  const priceHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEventData({
      ...eventData,
      prices: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <React.Fragment>
      <Box className="create_event_form">
        <form onSubmit={handleSubmit}>
          <FileDropZone
            onFilesChange={(base64) => setSelectedThumbnail(base64)}
            existingThumbnail={eventData.thumbnail} // Pass existing thumbnail to FileDropZone
          />
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
              onChange={handleInputChange}
              value={eventData.title}
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
              onChange={handleInputChange}
              value={eventData.description}
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
              onChange={handleInputChange}
              value={eventData.tags}
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
              onChange={handleInputChange}
              value={eventData.location}
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
              onChange={handleInputChange}
              value={eventData.dashboard?.event_capacity ?? "0"}
            />
            <Typography className="event_form_label" variant="p">
              Event Category
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Tab Here</InputLabel>
              <Select
                labelId="category-select-label"
                className="custom-select common_field_text"
                id="category-select"
                name="category" // Ensure this name matches the state field
                value={eventData.category}
                onChange={handleInputChange}
              >
                {category.length > 0 ? (
                  category.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Categories Available</MenuItem>
                )}
              </Select>
            </FormControl>
            <Typography className="event_form_label" variant="p">
              Select Package/Add
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="packages-label">Packages</InputLabel>
              <Select
                labelId="packages-label"
                id="packages-select"
                className="custom-select common_field_text"
                multiple
                value={eventData.packages}
                onChange={handlePackagesChange}
                input={<OutlinedInput label="Packages" />}
                MenuProps={MenuProps}
              >
                {packageOptions.map((pkg) => (
                  <MenuItem key={pkg.id} value={pkg.id}>
                    {pkg.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography className="event_form_label" variant="p">
              Select Ticker Price/Add
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="ticket-price-label">Tab Here</InputLabel>
              <Select
                labelId="ticket-price-label"
                id="ticket-price"
                className="custom-select common_field_text"
                multiple
                value={eventData.prices}
                onChange={priceHandleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {priceOptions.map((price) => (
                  <MenuItem key={price.id} value={price.id}>
                    {price.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography className="event_form_label" variant="p">
              Event Staring From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Event Starting From"
                value={
                  eventData.start_date ? dayjs(eventData.start_date) : null
                }
                onChange={(newValue) => {
                  setEventData((prevData) => ({
                    ...prevData,
                    start_date: newValue
                      ? dayjs(newValue).format("YYYY-MM-DD hh:mm A")
                      : null,
                  }));
                }}
                className="common_field_text"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <Typography className="event_form_label" variant="p">
              Event Ending From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Event Ending From"
                value={eventData.start_date ? dayjs(eventData.end_date) : null}
                onChange={(newValue) => {
                  setEventData((prevData) => ({
                    ...prevData,
                    end_date: newValue
                      ? dayjs(newValue).format("YYYY-MM-DD hh:mm A")
                      : null,
                  }));
                }}
                className="common_field_text"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            {loading && <CustomLoader />}
          </Box>
          <Box>
            <Button variant="contained" className="app_btn" type="submit">
              Update Event
            </Button>
          </Box>
        </form>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Box>
    </React.Fragment>
  );
}
