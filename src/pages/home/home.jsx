import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { SponsorHome } from "./../../services/api_service";
import axios from "../../services/axiosConfig";
import CardCounter from "./cardCounter";
import CarouselSlider from "./slider";
import ResponsiveAppBar from '../../components/app_bar';

export default function Homepage() {
  const [event, setEvent] = useState(); // total sold events
  const [ticket, setTicket] = useState(); // total sold tickets
  const [income, setIncome] = useState(); // total earning
  const [member, setMember] = useState(); // total members
  const [sponsor, setSponsor] = useState(); // total sponsors
  const [guard, setGuard] = useState(); // total guards

  useEffect(() => {
    // Fetch data from an API
    axios
      .get(SponsorHome) // Actual API endpoint
      .then((response) => {
        setEvent(response.data.total_sales_event); // Set total sales event
        setTicket(response.data.total_sales_ticket); // Set total sales ticket
        setIncome(response.data.total_income); // Set total earing/income
        setMember(response.data.total_members); // Set total members
        setSponsor(response.data.total_sponsor); // Set total sponsors
        setGuard(response.data.total_guard); // Set total guards
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container className="content">
        <Box className="parent_sec">
          <Box className="card_column1">
            <CarouselSlider />
          </Box>
          <Box className="card_column2">
            <CardCounter counter={event} sub_title="Events Sold" />
            <CardCounter counter={ticket} sub_title="Tickets Sold" />
            <CardCounter counter={`$${income}`} sub_title="Total Earing" />
            <CardCounter counter={member} sub_title="Total Members" />
            <CardCounter counter={sponsor} sub_title="Total Sponsors" />
            <CardCounter counter={guard} sub_title="Total Guard" />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
