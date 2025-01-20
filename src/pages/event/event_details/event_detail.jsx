import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";

import ToolsBar from "../../../components/tools_bar";

export default function EventDetails() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events/" title="Event Details" />
        <Box className="event_details_sec">
          <Box className="thumbnail-sec">
            <img
              src="https://epassadminbucket.s3.amazonaws.com/event/01/25/banner_common.png?AWSAccessKeyId=AKIA4EZC3GL2HN5XRMPD&Signature=4JPf023FqKXEo64UDEOiQLksIfo%3D&Expires=1737381343"
              alt=""
            />
          </Box>
          <Box className="capacity_sec">
            <Box className="single_capacity_box">
              <Typography className="capacity_counter" variant="h6">
                100
              </Typography>
              <Typography variant="p">Event Capacity</Typography>
            </Box>
            <Box className="single_capacity_box">
              <Typography className="capacity_counter" variant="h6">
                100
              </Typography>
              <Typography variant="p">Current Attendees</Typography>
            </Box>
            <Box className="single_capacity_box">
              <Typography className="capacity_counter" variant="h6">
                100
              </Typography>
              <Typography variant="p">Total Attendees</Typography>
            </Box>
          </Box>
          <Box className="capacity_bottom_sec">
            <Typography className="event_time" variant="p">
              2025-01-01 02:33 PM
            </Typography>
            <Typography className="category_text" variant="p">
              Education
            </Typography>
          </Box>
          <Box className="event_info">
            <Typography className="event_title" variant="h6">
              Almiron High School Festival
            </Typography>
            <Box className="venue">
              <PlaceIcon />
              <Typography className="event_venue" variant="p">
                4401 Social Alley, North Charleston, South Carolina 29405,
                United States
              </Typography>
            </Box>
          </Box>
          <Box className="event_description">
            <Typography className="about_event_text" variant="h5">
              About this Event
            </Typography>
            <Typography className="event_content" variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Distinctively unleash client-based schemas and alternative
              outsourcing. Competently reintermediate multidisciplinary
              alignments vis-a-vis frictionless opportunities. Conveniently
              seize cross-platform ROI for economically sound benefits. Credibly
              simplify virtual infomediaries with fully tested web-readiness.
              Credibly maximize distinctive best practices.
            </Typography>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
