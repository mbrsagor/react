import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

// Custom icons
import HomeIcon from "../assets/menus/home_icon.svg";
import GuardIcon from "../assets/menus/guard_icon.svg";
import ProfileIcon from "../assets/menus/profile_icon.svg";
import SponsorIcon from "../assets/menus/sponsor_icon.svg";
import EventIcon from "../assets/menus/event_icon.svg";


export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (path, newValue) => {
    setValue(newValue);
    navigate(path); // Navigate to the selected route
  };

  return (
    //<Container className="bottom_app_bar_sec">
    <Container className="content">
      <CssBaseline />
      <Paper
        className="paper_border"
        // className="content"
        // sx={{
        //   // position: "fixed",
        //   // bottom: 0,
        //   zIndex: 999,
        //   //left: "50%",
        //   //transform: "translateX(-50%)",
        //   padding: "5px",
        //   //maxWidth: "375px", // Ensures the max width is 375px
        //   width: "100%", // Ensures it spans full width of the container
        //   boxSizing: "border-box", // Ensures padding is included in the width calculation
        // }}
        elevation={0}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels // Ensures labels are always shown
          sx={{
            padding: "0",
            "& .MuiBottomNavigationAction-root": {
              minWidth: "auto",
              padding: "50px 8px",
            },
          }}
        >
          <BottomNavigationAction
            className="navigation_bar_sec"
            label="Home"
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: "bold", // Set the desired font-weight
              },
            }}
            icon={
              <img
                src={HomeIcon}
                alt="Home Icon"
                style={{ width: 24, height: 24 }}
              />
            }
            onClick={() => handleNavigation("/home", 0)}
          />
          <BottomNavigationAction
            className="navigation_bar_sec"
            label="Event"
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: "bold", // Set the desired font-weight
              },
            }}
            icon={
              <img
                src={EventIcon}
                alt="Home Icon"
                style={{ width: 24, height: 24 }}
              />
            }
            onClick={() => handleNavigation("/events", 1)}
          />
          <BottomNavigationAction
            className="navigation_bar_sec"
            label="Sponsor"
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: "bold", // Set the desired font-weight
              },
            }}
            icon={
              <img
                src={SponsorIcon}
                alt="Home Icon"
                style={{ width: 24, height: 24 }}
              />
            }
            onClick={() => handleNavigation("/sponsor", 2)}
          />
          <BottomNavigationAction
            className="navigation_bar_sec"
            label="Guard"
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: "bold", // Set the desired font-weight
              },
            }}
            icon={
              <img
                src={GuardIcon}
                alt="Home Icon"
                style={{ width: 24, height: 24 }}
              />
            }
            onClick={() => handleNavigation("/guard", 3)}
          />
          <BottomNavigationAction
            className="navigation_bar_sec"
            label="Profile"
            sx={{
              "& .MuiBottomNavigationAction-label": {
                fontWeight: "bold", // Set the desired font-weight
              },
            }}
            icon={
              <img
                src={ProfileIcon}
                alt="Home Icon"
                style={{ width: 24, height: 24 }}
              />
            }
            onClick={() => handleNavigation("/profile", 4)}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
