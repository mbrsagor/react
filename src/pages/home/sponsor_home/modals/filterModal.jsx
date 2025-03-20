/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { Typography, Box, CssBaseline } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function FilterModal({ open, handleClose, setFilters, fetchEvents, categories, tags, packages }) {
  // State for selected values
  const [category, setCategory] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [tag, setTag] = useState("");

  // Handle category selection
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, category: selectedCategory };
      fetchEvents(newFilters);
      return newFilters;
    });
    handleClose(); // ✅ Close modal after selection
  };

  // Handle package selection
  const handlePackageSelect = (selectedPackage) => {
    setSelectedPackage(selectedPackage);
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, packages: selectedPackage };
      fetchEvents(newFilters);
      return newFilters;
    });
    handleClose(); // ✅ Close modal after selection
  };

  // Handle tag selection
  const handleTagSelect = (selectedTag) => {
    setTag(selectedTag);
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, tags: selectedTag };
      fetchEvents(newFilters);
      return newFilters;
    });
    handleClose(); // ✅ Close modal after selection
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <Modal
          aria-labelledby="location-title"
          aria-describedby="location-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={open}>
            <Box className="venue_search_modal scroll_modal">
              <Box className="mt15">
                <Box className="filter_header_sec">
                  <Typography className="title" variant="body1">
                    Filter
                  </Typography>
                  <Link to="#" onClick={() => window.location.reload()}>
                    <RestartAltIcon />
                  </Link>
                </Box>

                {/* Category Section */}
                <Box className="main_filter_sec">
                  <Typography className="title" variant="body1">
                    Category
                  </Typography>
                  <Box className="custom_list_item">
                    {categories.map((categoryItem) => (
                      <Typography
                        key={categoryItem.id} // ✅ Use dynamic key
                        className="item"
                        variant="body1"
                        onClick={() => handleCategorySelect(categoryItem.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {categoryItem.name}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Package Section */}
                <Box className="main_filter_sec">
                  <Typography className="title" variant="body1">
                    Package
                  </Typography>
                  <Box className="custom_list_item">
                    {packages.map((packageItem) => (
                      <Typography
                        key={packageItem.id} // ✅ Use dynamic key
                        className="item"
                        variant="body1"
                        onClick={() => handlePackageSelect(packageItem.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {packageItem.title}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Tags Section */}
                <Box className="main_filter_sec">
                  <Typography className="title" variant="body1">
                    Tags
                  </Typography>
                  <Box className="custom_list_item">
                    {tags.map((tagItem) => (
                      <Typography
                        key={tagItem.id} // ✅ Use dynamic key
                        className="item"
                        variant="body1"
                        onClick={() => handleTagSelect(tagItem.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {tagItem.name}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </React.Fragment>
  );
}
