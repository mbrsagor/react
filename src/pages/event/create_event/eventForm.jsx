import React, { useState, useEffect } from "react";
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
  },  []);

  // Create new event handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Format the date when submitting
      const formattedStartDate = start_date
        ? dayjs(start_date).format("YYYY-MM-DD hh:mm A")
        : null;
      const formattedEndDate = end_date
        ? dayjs(end_date).format("YYYY-MM-DD hh:mm A")
        : null;
      const response = await axios.post(MyEvents, {
        title: title,
        tags: [tags],
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

  // Upload thumbnail/image
  const handleFilesChange = (files) => {
    // Assuming you need only the first file's Base64 string
    setThumbnail(files[0]); // Set the first Base64 string as the thumbnail
    //console.log("Received Base64 files:", files[0]);
  };

  return (
    <React.Fragment>
      <Box className="create_event_form">
        <form onSubmit={handleSubmit}>
          <FileDropZone onFilesChange={handleFilesChange} />
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
              onChange={(tags) => setTags(tags.target.value)}
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
              onChange={(location) => setLocation(location.target.value)}
            />
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
              <InputLabel id="demo-multiple-name-label">Tab Here</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
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
              Create Event
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
