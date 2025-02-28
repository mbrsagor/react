import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";

import Menus from "./menus";

// Custom icons
import HomeIcon from "../assets/menus/home_icon.svg";
import GuardIcon from "../assets/menus/guard_icon.svg";
import ProfileIcon from "../assets/menus/profile_icon.svg";
import SponsorIcon from "../assets/menus/sponsor_icon.svg";
import EventIcon from "../assets/menus/event_icon.svg";
import Settings from "../assets/menus/settings_icon.svg";

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // The method is called for get user role and set menu state.
  useEffect(() => {
    // Get the token and user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // console.log(JSON.parse(storedUser));
      setUser(JSON.parse(storedUser)); // Parse and set the user object
    }
  }, []);

  // Get user role
  const user_role = user ? user.role : 0;

  return (
    <Container className="content main_bottom_bar_sec">
      <CssBaseline />
      <Paper className="paper_border" elevation={0}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels // ✅ This ensures labels are allowed to show
          sx={{
            "& .MuiBottomNavigationAction-root": {
              minWidth: "auto",
              padding: "50px 8px",
            },
          }}
        >
          {user_role === 3 && (
            <>
              <Menus
                label="Home"
                icon={HomeIcon}
                link="/home"
                ordering={0}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Events"
                icon={EventIcon}
                link="/events"
                ordering={1}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Sponsor"
                icon={SponsorIcon}
                link="/sponsor"
                ordering={2}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Guard"
                icon={GuardIcon}
                link="/guard"
                ordering={3}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Profile"
                icon={ProfileIcon}
                link="/profile"
                ordering={4}
                value={value}
                setValue={setValue}
              />
            </>
          )}
          {user_role === 4 && (
            <>
              <Menus
                label="Home"
                icon={HomeIcon}
                link="/sponsor-home"
                ordering={0}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="My Event"
                icon={EventIcon}
                link="/sponsor-purchase-events"
                ordering={1}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Profile"
                icon={ProfileIcon}
                link="/profile"
                ordering={2}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Settings"
                icon={Settings}
                link="/settings"
                ordering={3}
                value={value}
                setValue={setValue}
              />
            </>
          )}
          {user_role === 5 && (
            <>
              <Menus
                label="Home"
                icon={HomeIcon}
                link="/guard-home"
                ordering={0}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="My Event"
                icon={EventIcon}
                link="/assign-events"
                ordering={1}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Profile"
                icon={ProfileIcon}
                link="/profile"
                ordering={2}
                value={value}
                setValue={setValue}
              />
              <Menus
                label="Settings"
                icon={Settings}
                link="/settings"
                ordering={3}
                value={value}
                setValue={setValue}
              />
            </>
          )}
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
