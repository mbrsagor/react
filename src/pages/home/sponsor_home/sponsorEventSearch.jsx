import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FilterListIcon from "@mui/icons-material/FilterList";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import {
  EventSearchFilterURL,
  EventFilterUtilsURL,
} from "../../../services/api_service";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";
import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import SingleEvent from "./singleEvent";
import PlaceModal from "./modals/placeModal";
import FilterModal from "./modals/filterModal";
import DateModal from "./modals/dateModal";

export default function SponsorEventSearch() {
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    tags: "",
    location: "",
    start_date: "",
    end_date: "",
    packages: "",
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for opening modals
  const [openPlaceModal, setOpenPlaceModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  // Dynamic data fetched from API
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [tags, setTags] = useState([]);

  // Handle opening modals
  const handleOpenPlaceModal = () => setOpenPlaceModal(true);
  const handleClosePlaceModal = () => setOpenPlaceModal(false);

  const handleOpenFilterModal = () => setOpenFilterModal(true);
  const handleCloseFilterModal = () => setOpenFilterModal(false);

  const handleOpenDateModal = () => setOpenDateModal(true);
  const handleCloseDateModal = () => setOpenDateModal(false);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents(); // Fetch all events initially
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dynamically handle category, tags, and package only one API endpoint here
  const fetchData = async () => {
    try {
      const response = await axios.get(EventFilterUtilsURL); // Replace with the actual API URL
      setCategories(response.data.categories);
      setPackages(response.data.packages);
      setTags(response.data.tag_serializer);
      //   console.log(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch events
  const fetchEvents = async (updatedFilters = null) => {
    setLoading(true);

    // Use the latest filters if no new updates are provided
    const activeFilters = updatedFilters || filters;

    const queryParams = new URLSearchParams({
      title: activeFilters.title || "",
      category: activeFilters.category || "",
      tags: activeFilters.tags || "",
      location: activeFilters.location || "",
      start_date: activeFilters.start_date || "",
      end_date: activeFilters.end_date || "",
      packages: activeFilters.packages || "",
    }).toString();

    const apiUrl = `${EventSearchFilterURL}?${queryParams}`;

    try {
      const response = await axios.get(apiUrl);
      setEvents(response.data.data || response.data.results || response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Update filters dynamically
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      fetchEvents(newFilters); // ✅ Trigger search dynamically
      return newFilters;
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/sponsor-home" title="Search Event" />
        <Box className="parent_sec">
          <Box className="sponsor_custom_search_sec">
            <Box>
              <TextField
                className="sponsor_search_bar"
                variant="outlined"
                placeholder="Search Here"
                rows={1.5}
                multiline
                size="small"
                fullWidth
                type="search"
                name="title"
                value={filters.title}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    paddingTop: "12px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box className="one_third">
              <Box
                className="modal_item"
                onClick={handleOpenPlaceModal} // Open Place Modal
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body1">Venue Search</Typography>
                <LocationOnOutlinedIcon />
              </Box>
              <Box
                className="modal_item"
                onClick={handleOpenFilterModal} // Open Filter Modal
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body1">Filter</Typography>
                <FilterListIcon />
              </Box>
              <Box
                className="modal_item"
                onClick={handleOpenDateModal} // Open Date Filter Modal
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body1">Date Search</Typography>
                <DateRangeIcon />
              </Box>
            </Box>
          </Box>

          {/* Show Loading Spinner */}
          {loading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          )}

          <Box className="mt5">
            {events.length > 0
              ? events.map((event, index) => (
                  <SingleEvent
                    key={index}
                    link={`/sponsor-event/${event.id}`}
                    eventId={event.id}
                    thumbnail={event.thumbnail || DefaultThumbnail}
                    title={event.title}
                    date={event.start_date}
                    company_name={event.company_name}
                  />
                ))
              : !loading && (
                  <Typography className="no_data_text" variant="body1">
                    No Data Available
                  </Typography>
                )}
          </Box>
        </Box>

        {/* Modals */}
        <PlaceModal
          handleClose={handleClosePlaceModal}
          open={openPlaceModal}
          setFilters={setFilters}
          fetchEvents={fetchEvents}
        />
        <DateModal
          handleClose={handleCloseDateModal}
          open={openDateModal}
          setFilters={setFilters} // ✅ Pass setFilters
          fetchEvents={fetchEvents} // ✅ Pass fetchEvents
        />
        <FilterModal
          handleClose={handleCloseFilterModal}
          open={openFilterModal}
          setFilters={setFilters}
          fetchEvents={fetchEvents}
          categories={categories} // ✅ Pass API data
          tags={tags} // ✅ Pass API data
          packages={packages} // ✅ Pass API data
        />
      </Container>
    </React.Fragment>
  );
}
