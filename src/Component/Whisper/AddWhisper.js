import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const mostUsedEmojis = ["😀", "👍", "❤️", "😂", "🎉", "🙌", "🔥"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddWhisper = ({ squadId }) => {
  const [userdata, setUserData] = useState({});
  const [formData, setFormData] = useState({
    whisperId: "",
    squadId: squadId,
    userId: "",
    whisperContent: "",
    whisperTopicWtopicId: 1, // Set default value to 1
    whisperTypeWtypeId: 1, // Set default value to 1
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("none");

  const handleFormatChange = (event, newFormat) => {
    setFormat(newFormat);
  };

  const handleEmojiClick = (emoji) => {
    setFormData({
      ...formData,
      whisperContent: formData.whisperContent + emoji,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("loggeduser");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: parsedData.userId,
      }));
    }
  }, []);

  useEffect(() => {
    calculateWhispId();
  }, [squadId]);

  const calculateWhispId = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/Other/LastWhisper`
      );
      const lastWhisperId = response.data;
      const nextWhisperId = lastWhisperId + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        whisperId: nextWhisperId,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  const resetForm = () => {
    setFormData({
      whisperId: "",
      squadId: squadId,
      userId: userdata.userId,
      whisperContent: "",
      whisperTopicWtopicId: 1,
      whisperTypeWtypeId: 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.whisperContent != "" &&
      formData.whisperTopicWtopicId != "" &&
      formData.whisperTypeWtypeId != ""
    ) {
      try {
        const response = await axios.post(
          "https://localhost:7105/api/Whispers",
          formData
        );
        setOpen(false);
        console.log(response.data);
        setOpen(true);
        resetForm();
      } catch (error) {
        console.error(error);
        setError("Error submitting the form");
      }
    } else {
      setError("Cannot send Empty message");
      // setOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <div style={{ marginTop: 20 }}>
          <div>
            <ToggleButtonGroup
              value={format}
              exclusive
              onChange={handleFormatChange}
            >
              <ToggleButton value="none">None</ToggleButton>
              <ToggleButton value="bold">Bold</ToggleButton>
              <ToggleButton value="italic">Italic</ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* Emoji buttons */}
          {mostUsedEmojis.map((emoji, index) => (
            <Button key={index} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </Button>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            sx={{
              marginTop: 1,
              width: 500,
              fontWeight: format === "bold" ? "bold" : "normal",
              fontStyle: format === "italic" ? "italic" : "normal",
            }}
            label="Text here"
            name="whisperContent"
            value={formData.whisperContent}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SendIcon sx={{ color: "#1de9b6", marginLeft: 2 }} />}
            sx={{ width: 20, height: 30, marginTop: 2.5, marginLeft: 1 }}
            onClick={handleSubmit}
          ></Button>
        </div>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You Whispered!!!
          </Alert>
        </Snackbar>
        {error && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert
              onClose={() => setError(null)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </Container>
    </div>
  );
};

export default AddWhisper;
