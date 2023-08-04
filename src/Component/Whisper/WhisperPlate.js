import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { IconButton } from "@mui/material";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import ThumbDownSharpIcon from "@mui/icons-material/ThumbDownSharp";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const WhisperPlate = ({
  username,
  whisper,
  userId,
  topic,
  type,
  whisperid,
}) => {
  const [loggedData, setLoggedData] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const data = localStorage.getItem("loggeduser");
    if (data) {
      const parsedData = JSON.parse(data);
      setLoggedData(parsedData);
    }
  }, []);

  const isCurrentUser = userId === loggedData.userId;
  const alignStyle = isCurrentUser ? 302 : 5;
  const givecolor = isCurrentUser ? "#2196f3" : "#1de9b6";
  const giveavatarcolor = isCurrentUser ? "#1de9b6" : "#2196f3";

  const handlelike = async () => {
    const likebody = {
      like1: 1,
      whisperWhispId: whisperid,
      userUserId: userId,
    };
    console.log(likebody);
    try {
      const response = await axios.post(
        "https://localhost:7105/api/Likes1",
        likebody
      );
      console.log(response);
      handleSnackbar("Whisper Liked!", "info");
    } catch (error) {
      console.log(error);
      handleSnackbar("Failed to like!", "error");
    }
  };

  const handledislike = async () => {
    const dislikebody = {
      like1: 0,
      whisperWhispId: whisperid,
      userUserId: userId,
    };
    try {
      const response = await axios.post(
        "https://localhost:7105/api/Likes1",
        dislikebody
      );
      console.log(response);
      handleSnackbar("Whisper disliked", "info");
    } catch (error) {
      console.log(error);
      handleSnackbar("Failed to dislike!", "error");
    }
  };

  return (
    <div
      style={{
        width: 240,
        height: "auto",
        marginTop: 7,
        marginBottom: 7,
        marginLeft: alignStyle,
        border: `1px solid ${givecolor}`,
        boxShadow: `1px 1px 10px ${givecolor}`,
        borderRadius: 15,
        backgroundColor: givecolor,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", color: "white" }}>
        <Avatar
          sx={{
            bgcolor: giveavatarcolor,
            width: 30,
            height: 30,
            marginLeft: 1,
            marginTop: 1,
          }}
          alt="Avatar"
        >
          {username[0]}
        </Avatar>
        <div style={{ marginLeft: 10, marginTop: 12, fontFamily: "cursive" }}>
          {username}
        </div>
        <div>
          <IconButton
            sx={{}}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            aria-label="info about the text"
          >
            <TipsAndUpdatesIcon
              className="rotating-icon"
              sx={{ color: "white" }}
            />
          </IconButton>
        </div>
      </div>
      {whisper}
      {isCurrentUser ? (
        <div>
          <h1>{""}</h1>
        </div>
      ) : (
        <footer style={{ display: "flex" }}>
          <IconButton
            aria-describedby={id}
            variant="contained"
            style={{ marginLeft: 170 }}
            onClick={handlelike}
          >
            <ThumbUpSharpIcon sx={{ width: 15, color: "#2196f3" }} />
          </IconButton>
          <IconButton
            aria-describedby={id}
            variant="contained"
            onClick={handledislike}
          >
            <ThumbDownSharpIcon sx={{ width: 15, color: "#2196f3" }} />
          </IconButton>
        </footer>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{topic}</Typography>
      </Popover>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default WhisperPlate;
