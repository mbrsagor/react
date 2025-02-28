import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import EventTicketModal from "./eventTicketModal";
import { SponsorGetTicketURL } from "../../../services/api_service";

export default function EventTicket() {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const data = location.state?.data;

  const event_id = data.event_id;
  const package_id = data.package_id;

  // Load last page from localStorage
  useEffect(() => {
    const savedPage = localStorage.getItem("event_ticket_page");
    if (savedPage) {
      setPage(parseInt(savedPage));
    }
  }, []);

  useEffect(() => {
    axios
      .get(SponsorGetTicketURL(event_id, package_id), { params: { page } })
      .then((response) => {
        if (response?.data) {
          setTickets(response.data.data);
          setTotalPages(response.data.total_pages || 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setTickets([]);
      });
  }, [event_id, package_id, page]);

  useEffect(() => {
    if (tickets.length === 10) {
      const nextPage = page + 1 > totalPages ? 1 : page + 1;
      setPage(nextPage);
      localStorage.setItem("event_ticket_page", nextPage);
    }
  }, [tickets, page, totalPages]);

  const handleOpen = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/sponsor-purchase-events" title="Event Tickets" />
        <Box className="parent_sec pb80">
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <Box
                key={index}
                className="single_ticket_sec"
                onClick={() => handleOpen(ticket)}
              >
                <Box className="ticket">
                  <Box className="qr_code">
                    <QRCode value={ticket.link} />
                  </Box>
                  <Box className="ticket_info">
                    <Typography className="ticket_number" variant="body1">
                      {ticket.ticket_number}
                    </Typography>
                    <Typography className="ticket_link" variant="body1">
                      {ticket.link}
                    </Typography>
                    <Box className="ticket_bottom">
                      <Typography className="ticket_status" variant="body1">
                        Ready For Scan
                      </Typography>
                      <Typography className="ticket_status" variant="body1">
                        {ticket.is_active ? "Occupied" : "Not Occupied"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body">
              No Data Available
            </Typography>
          )}
        </Box>
        <EventTicketModal
          ticket_number={selectedTicket?.ticket_number}
          qr={selectedTicket?.link}
          link={selectedTicket?.link}
          open={open}
          handleClose={handleClose}
        />
      </Container>
    </React.Fragment>
  );
}
