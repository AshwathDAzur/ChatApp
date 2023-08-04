import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { green, blue } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";
import modalpic from "../../Assests/Profile5.gif";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function SquadContainer({ squadmember }) {
  const [squadguy, setsquadguy] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const getmember = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/Users/${squadmember.userId}`
      );
      setsquadguy(response.data);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleclick = () => {
    getmember();
  };

  return (
    <div>
      <button
        className="squadbutton"
        style={{
          marginTop: 10,
          marginLeft: 15,
          border:
            squadmember.roleRoleId === 1
              ? "1px solid #2196f3"
              : "1px solid #1de9b6",
          borderRadius: 20,
          height: 60,
          boxShadow:
            squadmember.roleRoleId === 1
              ? "1px 1px 10px #2196f3"
              : "1px 1px 10px #1de9b6",
          width: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: squadmember.roleRoleId === 1 ? blue[500] : "#1de9b6",
              marginTop: 0.5,
              marginLeft: 0.5,
            }}
          >
            {squadmember.userName[0]}
          </Avatar>

          <div style={{ marginLeft: 7 }}>
            {squadmember.userName} ({squadmember.nickname})
          </div>
        </Stack>
        <IconButton aria-label="show 17 new notifications">
          <InfoIcon
            style={{
              color: squadmember.roleRoleId === 1 ? "#2196f3" : "#1de9b6",
            }}
            onClick={handleclick}
          />
        </IconButton>
      </button>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <span>Squad</span> Guy Details
        </DialogTitle>
        <DialogContent>
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
                Name : {squadguy.userName} <span>({squadguy.nickname})</span>
              </h3>
              <p>
                <b>Age :</b> {squadguy.age}
                <br />
                <b>Email :</b> {squadguy.email}
                <br />
                <b>Address :</b> {squadguy.address}
                <br />
                <b>phone :</b> {squadguy.phone}
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
