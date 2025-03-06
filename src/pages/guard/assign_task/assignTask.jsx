import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ToolsBar from "../../../components/tools_bar";
import AssignEvents from "./assignEvents";
import GuardUpdate from "../guards/guardUpdate";
import AddAssignEvent from "../assign_task/addAssignEvent";

export default function GuardAssignEvent() {
  //  Model
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/guard" title="Guard Details" />
        <Box className="parent_sec">
          <Box className="section_assign_event mb5">
            <Box>
              <TabContext value={value}>
                <Box className="tab_box">
                  <TabList className="custom_tab_list" onChange={handleChange} aria-label="Assign Event">
                    <Tab className="custom_tab_item" label="Assigned Events" value="1" />
                    <Tab className="custom_tab_item" label="Add New Event" value="2" />
                    <Tab className="custom_tab_item" label="Update Guard" value="3" />
                  </TabList>
                </Box>
                <TabPanel className="custom_tab_panel" value="1">
                  <Box>
                    <AssignEvents />
                  </Box>
                </TabPanel>
                <TabPanel className="custom_tab_panel" value="2">
                  <Box>
                    <AddAssignEvent />
                  </Box>
                </TabPanel>
                <TabPanel className="custom_tab_panel" value="3">
                  <Box>
                    <GuardUpdate />
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
