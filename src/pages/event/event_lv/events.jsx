/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";

export default function Events(props) {
  return (
    <React.Fragment>
      <Box className="events_card">
        <Link to={props.detail_link}>
          <img src={props.banner || DefaultThumbnail} alt="" />
        </Link>
        <Box className="event_list_column">
          <Link to={props.detail_link}>
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
          </Link>
          <Box className="event_icons">
            {props.update_event && (
              <Box>
                <Button onClick={props.update_event}>
                  <EditIcon />
                </Button>
              </Box>
            )}
            {props.delete_event && (
              <Box>
                <Button onClick={props.delete_event}>
                  <DeleteIcon />
                </Button>
              </Box>
            )}
            {props.scan_qr_code && (
              <Box>
                <Button onClick={props.scan_qr_code}>
                  <QrCodeScannerIcon />
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
