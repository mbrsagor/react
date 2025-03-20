import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import ToolsBar from "../../../components/tools_bar";
import CustomSnackbar from "../../../components/snackbar";
import CustomLoader from "../../../components/customLoader";
import { DownloadReportURL } from "../../../services/api_service";
import axios from "axios";
import dayjs from "dayjs";

export default function Report() {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Month dropdown options
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Define filters
  const [filters, setFilters] = useState({
    company_id: "",
    today: "",
    week: "",
    month: "",
    year: "",
    start_date: "",
    end_date: "",
    phone: "",
  });

  const [selectedOption, setSelectedOption] = useState(""); // Store selected option (Today, Week, Month, Year)

  // Fetch user data when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setFilters((prev) => ({
        ...prev,
        company_id: parsedUser.user_id,
        phone: parsedUser.phone,
      }));
    }
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Select Option Change (Today, Week, Month, Year)
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    // Reset the filters based on the selected option
    if (selectedValue === "today") {
      setFilters({
        ...filters,
        today: dayjs().format("YYYY-MM-DD"), // Set today’s date
        week: "",
        month: "",
        year: "",
        start_date: "",
        end_date: "",
      });
    } else if (selectedValue === "week") {
      setFilters({
        ...filters,
        today: "",
        week: "7", // Default to Last 7 Days
        month: "",
        year: "",
        start_date: "",
        end_date: "",
      });
    } else if (selectedValue === "month") {
      setFilters({
        ...filters,
        today: "",
        week: "",
        month: "",
        year: "",
        start_date: "",
        end_date: "",
      });
    } else if (selectedValue === "year") {
      setFilters({
        ...filters,
        today: "",
        week: "",
        month: "",
        year: "",
        start_date: "",
        end_date: "",
      });
    } else {
      setFilters({
        ...filters,
        today: "",
        week: "",
        month: "",
        year: "",
        start_date: "",
        end_date: "",
      });
    }
  };

  // Handle PDF Download
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(DownloadReportURL, {
        params: filters,
        responseType: "blob",
      });

      // Create a Blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Transaction_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSnackbar({
        open: true,
        message: "Successfully downloaded.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to download the report.",
        severity: "error",
      });
      console.error("Download error:", error);
    }
    setLoading(false);
  };

  // Handle Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/payment-history" title="Generate Report" />
        <Box className="parent_sec">
          <Box className="generate_report">
            <Typography variant="h5" className="report_title">
              Generate Report
            </Typography>

            {/* Select filter type */}
            <FormControl fullWidth>
              <Select
                name="filter_type"
                value={selectedOption}
                className="custom-select common_field_text mb10"
                displayEmpty
                onChange={handleOptionChange}
              >
                <MenuItem value="">Choice an option</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">Weekly</MenuItem>
                <MenuItem value="month">Monthly</MenuItem>
                <MenuItem value="year">Yearly</MenuItem>
                <MenuItem value="date_range">Set Date Range</MenuItem>
              </Select>
            </FormControl>

            {/* Display Today filter */}
            {selectedOption === "today" && (
              <FormControl fullWidth>
                <Typography variant="body1">
                  Today&apos;s Date: {filters.today}
                </Typography>
              </FormControl>
            )}

            {/* Display Weekly filter */}
            {selectedOption === "week" && (
              <FormControl fullWidth>
                <Select
                  name="week"
                  value={filters.week}
                  className="custom-select common_field_text mb10"
                  displayEmpty
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Select Week Range</MenuItem>
                  <MenuItem value="7">Last 7 Days</MenuItem>
                  <MenuItem value="14">Last 14 Days</MenuItem>
                  <MenuItem value="30">Last 30 Days</MenuItem>
                </Select>
              </FormControl>
            )}

            {/* Display Month filter */}
            {selectedOption === "month" && (
              <FormControl fullWidth>
                <Select
                  name="month"
                  value={filters.month}
                  className="custom-select common_field_text mb10"
                  displayEmpty
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Select Month</MenuItem>
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Display Year filter */}
            {selectedOption === "year" && (
              <TextField
                fullWidth
                name="year"
                placeholder="Enter Year"
                type="number"
                value={filters.year}
                onChange={handleFilterChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                    marginBottom: "10px",
                  },
                }}
              />
            )}

            {/* Display Set Date Range filter */}
            {selectedOption === "date_range" && (
              <Box>
                <TextField
                  fullWidth
                  name="start_date"
                  type="date"
                  value={filters.start_date}
                  onChange={handleFilterChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                      marginBottom: "10px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  name="end_date"
                  type="date"
                  value={filters.end_date}
                  onChange={handleFilterChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                      marginBottom: "10px",
                    },
                  }}
                />
              </Box>
            )}

            {/* Download Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="modal_submit_btn mt6 download_report_btn"
              disabled={
                selectedOption === "" ||
                (selectedOption === "month" && filters.month === "") ||
                (selectedOption === "year" && filters.year === "") ||
                (selectedOption === "date_range" &&
                  (filters.start_date === "" || filters.end_date === ""))
              } // Disable until both month & year are selected if needed
            >
              Download
            </Button>

            {/* Loader */}
            {loading && <CustomLoader />}
          </Box>
        </Box>

        {/* Snackbar for Success/Error Messages */}
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Container>
    </React.Fragment>
  );
}
