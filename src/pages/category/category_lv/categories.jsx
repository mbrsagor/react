import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CreateCategoryModal from "./createCategoryModal";
import { MyCategories } from "../../../services/api_service";

export default function Categories() {
    // Data model
   const [open, setOpen] = useState(false);
   const handleOpen2 = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    axios
      .get(MyCategories)
      .then((response) => {
        if (response.data.status === 'success') {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setCategories([]);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/events"
          title="Event Category"
          handleOpen={handleOpen2}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Box key={category.id} className="category_lv_sec">
                <Box className="cat_icon_with_txt">
                  <WidgetsIcon />
                  <Typography className="menu_item_text" variant="p">
                    {category.name}
                  </Typography>
                </Box>
                <Box className="actions">
                  <Button onClick={() => console.log("Updated")}>
                    <CreateIcon />
                  </Button>
                  <Button onClick={() => console.log("Deleted")}>
                    <DeleteRoundedIcon />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body">
              No Data Available
            </Typography>
          )}
        </Box>
        <CreateCategoryModal open={open} handleClose={handleClose} />
      </Container>
    </React.Fragment>
  );
}
