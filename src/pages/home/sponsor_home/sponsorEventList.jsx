import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SingleEvent from "./singleEvent";
import SingleHost from "./singleHost";
import axios from "../../../services/axiosConfig";
import { SponsorHomeURL } from "../../../services/api_service";
import CustomSnackbar from "../../../components/snackbar";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";

export default function SponsorEventList() {
  // Navigation
  const navigate = useNavigate();

  // State variables
  const [newEvent, setNewEvent] = useState([]);
  const [filteredNewEvent, setFilteredNewEvent] = useState([]); // For search
  const [popularEvent, setPopularEvent] = useState([]);
  const [followEvent, setFollowEvent] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Snackbar close function
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetching data from API
  useEffect(() => {
    axios
      .get(SponsorHomeURL) // API call
      .then((response) => {
        const latestEventData = response.data.latest_event?.data || [];
        setNewEvent(latestEventData);
        setFilteredNewEvent(latestEventData); // Initialize filtered list

        setPopularEvent(response.data.popular_event?.data || []);
        setFollowEvent(response.data.because_you_follow?.data || []);
        setHosts(response.data.who_to_follow?.data || []);
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      });
  }, []);

  // Search function (only for latest events)
  useEffect(() => {
    if (!searchQuery) {
      setFilteredNewEvent(newEvent);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredNewEvent(
        newEvent.filter((event) =>
          event.title.toLowerCase().includes(lowercasedQuery)
        )
      );
    }
  }, [searchQuery, newEvent]);

  return (
    <React.Fragment>
      {/* Search Bar (Only for Latest Events) */}
      <Box className="mt5">
        <TextField
          className="sponsor_search_bar"
          variant="outlined"
          placeholder="Search latest events..."
          rows={1.5}
          multiline
          size="small"
          fullWidth
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Latest Events */}
      <Box className="sponsor_event_list">
        <Box className="event_list_area">
          <Typography className="title">Latest Events</Typography>
          <Typography
            onClick={() =>
              navigate("/generic-events", {
                state: { eventCatID: 1, title: "Latest Events" },
              })
            }
            className="more"
          >
            See more
          </Typography>
        </Box>
        {filteredNewEvent.length > 0 ? (
          filteredNewEvent.map((event, index) => (
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
        ) : (
          <Typography>No Data Available</Typography>
        )}
      </Box>

      {/* Popular Events */}
      <Box className="sponsor_event_list">
        <Box className="event_list_area">
          <Typography className="title">Popular Events</Typography>
          <Typography
            onClick={() =>
              navigate("/generic-events", {
                state: { eventCatID: 1, title: "Popular Events" },
              })
            }
            className="more"
          >
            See more
          </Typography>
        </Box>
        {popularEvent.length > 0 ? (
          popularEvent.map((event, index) => (
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
        ) : (
          <Typography>No Data Available</Typography>
        )}
      </Box>

      {/* Because You Follow */}
      <Box className="sponsor_event_list">
        <Box className="event_list_area">
          <Typography className="title">Because You Follow</Typography>
          <Typography
            onClick={() =>
              navigate("/generic-events", {
                state: { eventCatID: 2, title: "Because You Follow" },
              })
            }
            className="more"
          >
            See more
          </Typography>
        </Box>
        {followEvent.length > 0 ? (
          followEvent.map((event, index) => (
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
        ) : (
          <Typography>No Data Available</Typography>
        )}
      </Box>

      {/* Who to Follow */}
      <Box className="sponsor_event_list">
        <Box className="event_list_area">
          <Typography className="title">Who to Follow</Typography>
          <Typography onClick={() => navigate("/all-hosts")} className="more">
            See more
          </Typography>
        </Box>
        {hosts.length > 0 ? (
          <Slider
            {...{
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              arrows: false,
              responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 600, settings: { slidesToShow: 2 } },
              ],
            }}
          >
            {hosts.map((host, index) => (
              <Box className="single_host_area" key={index}>
                <SingleHost
                  photo={host.avatar}
                  hostId={host.id}
                  link={host.id ? `/host/${host.id}` : "#"}
                  btn_text={host.is_followed ? "Following" : "Follow"}
                  name={host.host_name}
                  followers={host.total_follower}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography>No Data Available</Typography>
        )}
      </Box>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </React.Fragment>
  );
}
