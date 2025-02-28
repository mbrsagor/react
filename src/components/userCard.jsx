import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
const UserCard = ({ label }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: "2px solid black",
        borderRadius: "16px",
        padding: 2,
        width: "300px",
        marginBottom: 2,
      }}
    >
      <Avatar
        sx={{ bgcolor: "grey.400", width: 56, height: 56, marginRight: 2 }}
      />
      <Typography variant="h6" fontWeight="bold">
        {label}
      </Typography>
    </Box>
  );
};

const App = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <UserCard label="Host" />
      <UserCard label="Sponsor" />
    </Box>
  );
};

export default App;
