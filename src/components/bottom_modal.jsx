/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

export default function BottomMenuModal({ open, onClose }) {
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onClose} // Call onClose when modal is closed
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bottom_modal_sec">
          <Box className="modal_menus">
            <Link className="menu_item" to="/create-event">
              <Box>
                <AddIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Create Event </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/">
              <Box>
                <AddIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Manage Category </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/">
              <Box>
                <AddIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Manage Package </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/">
              <Box>
                <AddIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Manage Ticket Price </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
