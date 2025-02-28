/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
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
                <AddCircleOutlineTwoToneIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Create Event </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/categories">
              <Box>
                <CategoryOutlinedIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Manage Category </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/packages">
              <Box>
                <CardGiftcardOutlinedIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Manage Package </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/prices">
              <Box>
                <LocalAtmIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p">Ticket Price </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/bulk-ticket">
              <Box>
                <ConfirmationNumberIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Bulk Ticket </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/bulk-reg">
              <Box>
                <CasesOutlinedIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Bulk Registration </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
