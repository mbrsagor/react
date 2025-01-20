/* eslint-disable react/prop-types */
import React from 'react';
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";

export default function Events(props) {
  return (
    <React.Fragment>
      <Box className="events_card">
        <img src={props.banner} alt="" />
        <Box className="event_list_column">
          <Box className="event_info">
            <Typography className="event_title" variant="h6">
              {props.title}
            </Typography>
            <Typography className="event_duration" variant="p">
              Event Duration
            </Typography>
            <Box className="event_time">
              <Typography className="start_time" variant="p">
                Start: {props.start_date}
              </Typography>
              <Typography className="start_time" variant="p">
                End: {props.end_date}
              </Typography>
            </Box>
            <Typography className="event_duration" variant="p">
              Event Venue
            </Typography>
            <Typography className="start_time" variant="p">
              {props.venue}
            </Typography>
            <Box className="tag_sec">
              {props.tags && props.tags.length > 0 ? (
                props.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <Typography className="tags" variant="p">
                      {tag}
                    </Typography>
                  </span>
                ))
              ) : (
                <Typography className="tags" variant="p">
                  No tags available
                </Typography>
              )}
            </Box>
          </Box>
          <Box className="event_icons">
            <Box>
              <Link to={props.update_link}>
                <EditIcon />
              </Link>
            </Box>
            <Box>
              <Link to={props.delete_link}>
                <DeleteIcon />
              </Link>
            </Box>
            <Box>
              <Link to={props.detail_link}>
                <VisibilityIcon />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
