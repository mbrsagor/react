import React, { useState, useEffect, useRef } from "react";
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
import { MyEvents, MyCategories, MyPackages, MyTicketPrice} from "../../../services/api_service";

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

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState([]); // Initialize as an array
  const [selectedCategory, setSelectedCategory] = useState(""); // For the selected value
  const [prices, setPrices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]); // To store fetched packages
  const [packageOptions, setPackageOptions] = useState([]); // To store fetched packages
  const [thumbnail, setThumbnail] = useState([]);
  const [tags, setTags] = useState([]);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setSEndDate] = useState(null);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

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
      .then((response) => {
        setPackageOptions(response.data.data || []);
      })
      .catch(() => setPackageOptions([]));
    // Get my all price options
    axios
      .get(MyTicketPrice)
      .then((response) => {
        setPriceOptions(response.data.data || []);
      })
      .catch(() => setPriceOptions([]));
  }, []);

  // Create new event handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formattedTags = tags.map(String); // Ensures all tags are strings
      // Format the date when submitting
      const formattedStartDate = start_date
        ? dayjs(start_date).format("YYYY-MM-DD hh:mm A")
        : null;
      const formattedEndDate = end_date
        ? dayjs(end_date).format("YYYY-MM-DD hh:mm A")
        : null;
      const response = await axios.post(MyEvents, {
        title: title,
        tags: formattedTags,
        prices: prices,
        location: location,
        capacity: capacity,
        category: selectedCategory,
        packages: packages,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        thumbnail: thumbnail,
        description: description,
      });
      if (response.status == 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        // **Reset Form Fields After Successful Submission**
        setTitle("");
        setDescription("");
        setLocation("");
        setCapacity("");
        setSelectedCategory("");
        setPrices([]);
        setPackages([]);
        setThumbnail([]);
        setTags([]);
        setStartDate(null);
        setSEndDate(null);
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

  // package handle change
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPackages(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const priceHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPrices(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion); // ✅ Updates input field
    setLocation(suggestion); // ✅ Ensures location is set for API submission
    setSuggestions([]); // ✅ Clears suggestions after selection

    if (inputRef.current) {
      inputRef.current.focus(); // ✅ Keeps focus on input
    }
  };


  return (
    <React.Fragment>
      <Box className="create_event_form">
        <form onSubmit={handleSubmit}>
          <FileDropZone onFilesChange={(base64) => setThumbnail(base64)} />
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
              onChange={(event) => setTitle(event.target.value)}
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
              onChange={(event) => setDescription(event.target.value)}
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
              onChange={(event) =>
                setTags(
                  event.target.value
                    .split(",") // Split input by commas
                    .map((tag) => tag.trim()) // Remove spaces
                    .filter((tag) => tag.length > 0) // Remove empty tags
                    .map(String) // Ensure each item is a string
                )
              }
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
              // onChange={(location) => setLocation(location.target.value)}
              onChange={handleInputChange}
              inputRef={inputRef}
              value={query}
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
              onChange={(capacity) => setCapacity(capacity.target.value)}
            />
            <Typography className="event_form_label" variant="p">
              Event Category
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Tab Here</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                className="custom-select common_field_text"
                value={selectedCategory}
                placeholder="Tab Here"
                onChange={(event) => setSelectedCategory(event.target.value)}
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
              <InputLabel id="multiple-package-label">Tab Here</InputLabel>
              <Select
                labelId="multiple-package-label"
                id="multiple-package"
                className="custom-select common_field_text"
                multiple
                value={packages}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
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
                value={prices}
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
                placeholder="Tab Here"
                value={start_date}
                className="common_field_text"
                onChange={(end_date) => setStartDate(end_date)}
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
                placeholder="Tab Here"
                value={end_date}
                className="common_field_text"
                onChange={(end_date) => setSEndDate(end_date)}
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
              Submit
            </Button>
          </Box>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        </form>
      </Box>
    </React.Fragment>
  );
}
