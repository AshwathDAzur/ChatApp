import React, { useContext, useEffect, useState } from "react";
import { SquadContext } from "../Squad/SquadContext";
import WhisperContent from "./WhisperContent";
import whispimg from "../../Assests/Whisper1.gif";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import AddWhisper from "./AddWhisper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { format } from "date-fns";
import AddFeeedback from "./AddFeeedback";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
// import Dialog from "@mui/material/Dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Whisper = () => {
  const { selectedSquadId } = useContext(SquadContext);
  const [squadinfo, setSquadinfo] = useState({});
  const [member, setmember] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const formattedCreatedAt = squadinfo.createdAt
    ? format(new Date(squadinfo.createdAt), "MM/dd/yyyy")
    : "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInfoModalOpen = () => {
    setInfoModalOpen(true);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
  };

  const handleFeedbackModalOpen = () => {
    setFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setFeedbackModalOpen(false);
  };

  useEffect(() => {
    getSquadDetails();
  }, [selectedSquadId]);

  const getSquadDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/Squads/${selectedSquadId}`
      );
      const memresponse = await axios.get(
        "https://localhost:7105/api/Users/TotalNumOfUsersInDB"
      );
      setmember(memresponse.data);
      console.log(response.data);
      setSquadinfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMembersClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "100%",
    height: "300px",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const imageContainerStyle = {
    backgroundImage: `url(${whispimg})`,
    width: "100%",
    height: "300px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div
      style={{
        marginLeft: 10,
        width: 550,
        height: 500,
        marginTop: 30,
        border: "1px solid #2196f3",
        boxShadow: "1px 1px 10px #2196f3",
        borderRadius: 20,
        overflow: "auto",
      }}
    >
      <header
        style={{
          backgroundColor: "#2196f3",
          display: "flex",
          overflow: "auto",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Tooltip title="Info" arrow>
          <IconButton
            size="large"
            aria-label="squad information"
            color="inherit"
            onClick={handleInfoModalOpen}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={infoModalOpen}
          onClose={handleInfoModalClose}
          TransitionComponent={Transition}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            <span>Squad </span>
            Information
          </DialogTitle>
          <DialogContent>
            {Object.keys(squadinfo).length === 0 ? (
              <DialogContentText>Loading...</DialogContentText>
            ) : (
              <DialogContentText>
                <Typography variant="body1">
                  <span>Squad Title : </span> {squadinfo.title}
                </Typography>
                <Typography variant="body1">
                  <span> Squad Description : </span>
                  {squadinfo.description}
                </Typography>
                <Typography variant="body1">
                  <span>Created At : </span>
                  {formattedCreatedAt}
                </Typography>
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleInfoModalClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* feedback */}
        <Tooltip title="Feedback" arrow>
          <IconButton
            size="large"
            aria-label="feedback"
            color="inherit"
            onClick={handleFeedbackModalOpen}
          >
            <FeedbackOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Participants" arrow>
          <IconButton
            size="large"
            aria-label="participants"
            color="inherit"
            onClick={handleMembersClick}
          >
            <GroupsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom"
          disablePortal={false}
          modifiers={[
            {
              name: "flip",
              enabled: true,
              options: {
                altBoundary: true,
                rootBoundary: "viewport",
              },
            },
            {
              name: "preventOverflow",
              enabled: true,
              options: {
                altAxis: true,
                tether: true,
                rootBoundary: "viewport",
              },
            },
          ]}
        >
          <Paper
            sx={{
              bgcolor: "#1de9b6",
              color: "white",
              boxShadow: "1px 1px 10px #1de9b6",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <strong>
                {member === 0
                  ? "Participants info here"
                  : `${member} participants`}
              </strong>
            </Typography>
          </Paper>
        </Popper>
        <Tooltip title="Keyboard" arrow>
          <IconButton
            size="large"
            aria-label="adding the whispers"
            color="inherit"
            onClick={handleClickOpen}
          >
            <KeyboardIcon />
          </IconButton>
        </Tooltip>
        <IconButton
          size="small"
          aria-label="add whsiper"
          color="inherit"
          sx={{ marginLeft: 25 }}
        >
          Whisper here
          <CampaignIcon />
        </IconButton>
      </header>
      {/* adding feedback */}
      <Dialog
        open={feedbackModalOpen}
        onClose={handleFeedbackModalClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Your{" "}
          <span>
            <strong>Feedback</strong>
          </span>{" "}
          Matters{" "}
          <span>
            <strong>!</strong>
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {Object.keys(squadinfo).length === 0 ? (
              <DialogContentText>
                Select a Squad and give your feedback...
              </DialogContentText>
            ) : (
              <AddFeeedback squadId={selectedSquadId} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFeedbackModalClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {Object.keys(squadinfo).length === 0 ? (
        <div>
          <img
            src={whispimg}
            style={{ width: 525, marginLeft: 12, marginTop: 20 }}
          />
        </div>
      ) : (
        <div style={imageContainerStyle}>
          <div style={overlayStyle}>
            <h3 style={{ textAlign: "center" }}>
              {squadinfo.title} <span>SQUAD</span>
            </h3>
            <WhisperContent squadId={selectedSquadId} />
          </div>
        </div>
      )}

      {/*  Adding the Whisper here.... */}
      <div>
        <Dialog
          sx={{ marginTop: 30, marginLeft: 10 }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Discreetly Unleash Your{" "}
            <span>
              <strong>Professional Insights</strong>
            </span>
          </DialogTitle>
          <DialogContent>
            <AddWhisper squadId={selectedSquadId} />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/*  Adding the Whisper here.... */}
    </div>
  );
};

export default Whisper;
