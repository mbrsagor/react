import React, { useState, useEffect, useRef } from "react";
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


const MAPBOX_ACCESS_TOKEN =
  "sk.eyJ1IjoiZ2xvYmFsZHluYW1pY3NvbHV0aW9ucyIsImEiOiJjbTM3aHp6OGgwYTJwMm5yMXF6b3B0ZzJkIn0.F1aio-ONR5p9FJaun1PU_g"; 

export default function EventUpdateForm() {
  const { id } = useParams(); // Get event ID from URL
  const [category, setCategory] = useState([]); // Initialize as an array
  const [priceOptions, setPriceOptions] = useState([]); // To store fetched packages
  const [packageOptions, setPackageOptions] = useState([]); // To store fetched packages
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

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
    const { name, value } = e.target;

    if (name === "tags") {
      setEventData((prevData) => ({
        ...prevData,
        tags: value
          .split(",") // Split by comma
          .map((tag) => tag.trim()) // Remove spaces
          .filter((tag) => tag.length > 0), // Remove empty values
      }));
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
      .get(EventDetailURL(id))
      .then((response) => {
        if (response) {
          const event = response.data.data;
          setEventData({
            ...event,
            start_date: event.start_date,
            end_date: event.end_date,
            packages: event.packages.map((pkg) => pkg.id),
            prices: event.prices.map((price) => price.id),
          });
          setQuery(event.location || ""); // ✅ Set query state to fetched location
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

    // Only include thumbnail if a new one is selected
    if (selectedThumbnail) {
      updatedData.thumbnail = selectedThumbnail;
    } else {
      delete updatedData.thumbnail; // Remove it from the update request
    }

    try {
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

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features) {
        setSuggestions(data.features.map((place) => place.place_name));
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleLocationInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion); // ✅ Updates input field
    setLocation(suggestion); // ✅ Ensures location is set for API submission
    setEventData((prevData) => ({
      ...prevData,
      location: suggestion, // ✅ Updates eventData for form submission
    }));
    setSuggestions([]); // ✅ Clears suggestions after selection

    if (inputRef.current) {
      inputRef.current.focus(); // ✅ Keeps focus on input
    }
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
              placeholder="Write Here"
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
              placeholder="Write Here"
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
              placeholder="Write Here"
              name="tags"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={handleInputChange}
              value={eventData.tags.join(", ")} // Convert array to comma-separated string
            />
            <Typography className="event_tag_label" variant="body2">
              Event Tags Separated by Comma. E.G: Food, Travel
            </Typography>
            <Typography className="event_form_label" variant="p">
              Add Event Venue
            </Typography>
            <TextField
              placeholder="Write Here"
              name="location"
              className="common_field_text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              onChange={handleLocationInputChange}
              value={query} // ✅ Ensures input field reflects current location
              inputRef={inputRef}
            />

            {suggestions.length > 0 && (
              <ul className="location_list">
                {suggestions.map((suggestion, index) => (
                  <li
                    className="single_location"
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#f2f2f2")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#fff")
                    }
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <Typography className="event_form_label" variant="p">
              Add Event Capacity
            </Typography>
            <TextField
              placeholder="Write Here"
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
                placeholder="Event Starting From"
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
                placeholder="Event Ending From"
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
