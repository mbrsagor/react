/* eslint-disable react/prop-types */
import React from 'react';
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

export default function ToolsBar(props) {
  return (
    <React.Fragment>
      <Box className="tools_bar">
        <Box className="tool_top_bar">
          <Link to={props.link}>
            <ArrowBackIosNewSharpIcon />
          </Link>
          <Typography className="tool_title" variant="p">
            {props.title}
          </Typography>
        </Box>
        {props.handleOpen && (
          <Button onClick={props.handleOpen}>
            <MoreVertSharpIcon />
          </Button>
        )}
      </Box>
    </React.Fragment>
  );
}
