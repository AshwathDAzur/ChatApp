import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const AddFeedback = ({ squadId }) => {
  console.log("squadSquadId prop:", squadId);

  const loggedUser = localStorage.getItem("loggeduser");
  console.log("localStorage loggeduser:", loggedUser);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    feedBack1: "",
    squadSquadId: squadId,
    userUserId: loggedUser ? JSON.parse(loggedUser).userId : null,
  });

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    try {
      // Send POST request here with the formData
      const response = await axios.post(
        "https://localhost:7105/api/FeedBacks",
        formData
      );
      console.log("Feedback submitted:", response.data);

      // Clear the form after successful submission
      setFormData({
        date: new Date().toISOString().split("T")[0],
        feedBack1: "",
        squadSquadId: squadId,
        userUserId: loggedUser ? JSON.parse(loggedUser).userId : null,
      });

      // Show the Snackbar after successful submission
      setShowSnackbar(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          name="date"
          sx={{ marginTop: 1 }}
          value={formData.date}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          fullWidth
          label="Feedback"
          sx={{ marginTop: 2 }}
          multiline
          rows={4}
          name="feedBack1"
          value={formData.feedBack1}
          onChange={handleInputChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Submit Feedback
        </Button>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
        >
          Feedback submitted successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddFeedback;
