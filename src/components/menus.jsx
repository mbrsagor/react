import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// eslint-disable-next-line react/prop-types
export default function Menus({ label, icon, link, ordering, setValue }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    setValue(ordering); // Update selected value
    navigate(link);
  };

  return (
    <BottomNavigationAction
      className="navigation_bar_sec"
      label={label} // ✅ Always pass label
      sx={{
        "& .MuiBottomNavigationAction-label": {
          fontWeight: "bold",
        },
      }}
      icon={
        <img
          src={icon}
          alt={`${label} Icon`}
          style={{ width: 24, height: 24 }}
        />
      }
      onClick={handleNavigation}
    />
  );
}
