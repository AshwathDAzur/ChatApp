import React from "react";
import { useEffect, useState } from "react";
import pic from "/Users/ashwath.kumaran/Desktop/Final_Project/workwhisper/src/Assests/Profile1.gif";
import { Divider, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SquadContainer from "./SquadContainer";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import modalpic from "../../Assests/Profile1.gif";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import UserStats from "../Stats/UserStats";

export default function AvatarRibbon() {
  const [userdata, setUserData] = useState({});
  const [squaddata, setsquaddata] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAutoAwesomeModal, setOpenAutoAwesomeModal] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("loggeduser");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      console.log(parsedData);
    }
    if (userdata.userId) {
      getsquaddata();
    }
  }, [userdata.userId]);

  const getsquaddata = async () => {
    try {
      const response = await axios.get("https://localhost:7105/api/Users");
      setsquaddata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleclick = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };
  const handleOpenAutoAwesomeModal = () => {
    setOpenAutoAwesomeModal(true);
  };
  const handleCloseAutoAwesomeModal = () => {
    setOpenAutoAwesomeModal(false);
  };

  return (
    <div
      style={{
        marginRight: 10,
        float: "right",
        width: 280,
      }}
    >
      <div
        style={{
          display: "flex",
          border: "1px solid white",
          borderRadius: 20,
          marginTop: 5,
        }}
      >
        <div style={{ marginTop: 15 }} className="profileoptions">
          <Tooltip title="Edit" arrow>
            <IconButton
              className="rotating-icon-button"
              aria-label="edit"
              onClick={() => {
                Navigate("/edit");
              }}
            >
              <EditIcon className="rotating-icon" sx={{ color: "#2196f3" }} />
            </IconButton>
          </Tooltip>
          <br />
          <Tooltip title="Stats" arrow>
            <IconButton className="rotating-icon-button" aria-label="Skills">
              <AutoAwesomeIcon
                className="rotating-icon"
                sx={{ color: "#2196f3" }}
                onClick={handleOpenAutoAwesomeModal}
              />
            </IconButton>
          </Tooltip>
          <br />
          <Tooltip title="Info" arrow>
            <IconButton
              className="rotating-icon-button"
              aria-label="info about the profile"
              onClick={handleclick}
            >
              <InfoIcon className="rotating-icon" sx={{ color: "#2196f3" }} />
            </IconButton>
          </Tooltip>
        </div>
        <img
          src={pic}
          alt="pic"
          style={{ width: 175, marginTop: 10, marginBottom: 10 }}
        />
      </div>
      <b>{userdata.userName}</b>
      <Divider />

      <div
        style={{
          borderRadius: 20,
          height: 360,
          overflow: "auto",
        }}
      >
        <GroupsOutlinedIcon sx={{ float: "right", marginRight: 3 }} />
        <h5 style={{ marginLeft: 90, marginBottom: 10 }}>Squad Members</h5>
        {squaddata.map(
          (squadmember) =>
            squadmember.userId !== userdata.userId && (
              <SquadContainer squadmember={squadmember} />
            )
        )}
      </div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <span>Squad</span> Guy Details
        </DialogTitle>
        <DialogContent>
          {" "}
          <div style={{ display: "flex" }}>
            <div>
              <img
                src={modalpic}
                alt="avatar"
                style={{
                  width: 200,
                  float: "left",
                  marginTop: 20,
                }}
              />
            </div>
            <div>
              <h3>
                Name : {userdata.userName} <span>({userdata.nickname})</span>
              </h3>
              <p>
                <b>Age :</b> {userdata.age}
                <br />
                <b>Email :</b> {userdata.email}
                <br />
                <b>Address :</b> {userdata.address}
                <br />
                <b>phone :</b> {userdata.phone}
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for autoawesome */}
      <Dialog
        open={openAutoAwesomeModal}
        onClose={handleCloseAutoAwesomeModal}
        PaperProps={{
          style: {
            minWidth: 700,
            maxWidth: 1000,
            minHeight: 500,
          },
        }}
      >
        <DialogTitle>
          My{" "}
          <span>
            <strong>Stats</strong>
          </span>
        </DialogTitle>
        <DialogContent>
          {userdata.userId && <UserStats userid={userdata.userId} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAutoAwesomeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
