import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import axios from "../../../services/axiosConfig";
import { FollowersURL } from "../../../services/api_service";

// eslint-disable-next-line react/prop-types
export default function SingleHost({ photo, name, followers, btn_text, hostId, link }) {
  // State for follow status & followers count
  const [isFollowed, setIsFollowed] = useState(btn_text === "Following");
  const [followerCount, setFollowerCount] = useState(followers);


  // Handle follow/unfollow action
  const handleFollow = async () => {
    try {
      if (!hostId) {
        console.log("Host ID is missing.");
        return;
      }

      const response = await axios.post(FollowersURL, { host: hostId });
      if (response.status === 201) {
        console.log(response.data.message);
        // Toggle follow state and update follower count
        setIsFollowed((prev) => !prev);
        setFollowerCount((prev) => (isFollowed ? prev - 1 : prev + 1));
        console.log(response.data)
      } else {
        console.log(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Box className="single_host_section">
        <Box>
          <Link to={link}>
            <Avatar alt={name} src={photo} sx={{ width: 90, height: 90 }} />
          </Link>
        </Box>
        <Box>
          <Typography className="name" variant="body1">
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography className="name" variant="body1">
            {followerCount} followed
          </Typography>
        </Box>
        <Box>
          <Button type="button" onClick={handleFollow} className="follow_btn">
            {isFollowed ? "Following" : "Follow"}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
