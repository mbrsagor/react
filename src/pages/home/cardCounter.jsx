/* eslint-disable react/prop-types */
import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function CardCounter(props) {
  return (
    <React.Fragment>
      <Box className="card_content">
        <Typography variant="h5">{props.counter}</Typography>
        <Typography variant="p">{props.sub_title}</Typography>
      </Box>
    </React.Fragment>
  );
}
