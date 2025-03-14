/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import axios from "../../services/axiosConfig";
import SingleEvent from "../home/sponsor_home/singleEvent";
import DefaultThumbnail from "../../assets/DefaultThumbnail.jpg";
import { EventFilterByHost } from "../../services/api_service";

export default function HostDetailTab({name, email, phone, gender, city, zip, address, state}) {
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState("1");
  const { id } = useParams(); // Extract id from route parameters
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // var id = parseInt(user_id, 10); // convert to number

  // Fetching my events data
  useEffect(() => {
    const endpoint = `${EventFilterByHost}?host_id=${id}`;
    axios
      .get(endpoint)
      .then((response) => {
        if (response) {
          setEvents(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  }, [id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="host_tab">
        <TabContext value={value}>
          <Box className="tab_divider">
            <TabList className="tab_list" onChange={handleChange}>
              <Tab label="Events" value="1" />
              <Tab label="About" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <SingleEvent
                    key={index}
                    link={`/sponsor-event/${event.id}`}
                    eventId={event.id}
                    thumbnail={
                      event.thumbnail ? event.thumbnail : DefaultThumbnail
                    }
                    title={event.title}
                    date={event.start_date}
                    company_name={event.company_name}
                  />
                ))
              ) : (
                <Typography variant="body">No Data Available</Typography>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box className="host_detail_sec">
              <Typography className="user_info" variant="body2">
                Name: {name}
              </Typography>
              <Typography className="user_info" variant="body2">
                Email: {email}
              </Typography>
              <Typography className="user_info" variant="body2">
                Phone: {phone}
              </Typography>
              <Typography className="user_info" variant="body2">
                Address: {address}
              </Typography>
              <Typography className="user_info" variant="body2">
                Gender: {gender}
              </Typography>
              <Typography className="user_info" variant="body2">
                City: {city}
              </Typography>
              <Typography className="user_info" variant="body2">
                Zip: {zip}
              </Typography>
              <Typography className="user_info" variant="body2">
                State: {state}
              </Typography>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </React.Fragment>
  );
}
