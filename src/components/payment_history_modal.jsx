import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
export default function PaymentHistoryModal({ open, onClose }) {
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onClose} // Call onClose when modal is closed
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="payment_bottom_modal_sec">
          <Box className="modal_menus">
            <Link className="menu_item" to="/filter-transaction">
              <Box>
                <TuneOutlinedIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Filter Transaction </Typography>
              </Box>
            </Link>
            <Link className="menu_item" to="/generate-report">
              <Box>
                <PictureAsPdfOutlinedIcon />
              </Box>
              <Box>
                <Typography className="menu_item_text" variant="p"> Generate Report </Typography>
              </Box>
            </Link>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
