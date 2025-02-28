/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function FavoriteEventModal({ open, onClose }) {
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onClose} // Call onClose when modal is closed
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="favoriteEventModal">
          <Box className="fav_event">
            <Link className="menu_item" to="/favorite-event">
              <Box>
                <Typography className="menu_item_text" variant="p"> Favorite Event </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
