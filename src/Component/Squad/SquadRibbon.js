import axios from "axios";
import React, { useEffect, useState } from "react";
import SquadCard from "./SquadCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import QueryStatsSharpIcon from "@mui/icons-material/QueryStatsSharp";
import { IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { blue } from "@mui/material/colors";
import AddSquad from "./AddSquad";
import ChatModal from "../NiceToHave/Chatmodal";
import SortIcon from "@mui/icons-material/Sort";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
export default function SquadRibbon() {
  const [squaddata, setsquaddata] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sort, setsort] = useState(1);
  const Navigate = useNavigate();

  useEffect(() => {
    getsquad();
  }, []);

  const getsquad = async () => {
    try {
      const response = await axios.get("https://localhost:7105/api/Squads");
      setsquaddata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortsquad = async () => {
    try {
      const response = await axios.get("https://localhost:7105/getsquadbydesc");
      setsquaddata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesort = () => {
    if (sort == 1) {
      sortsquad();
      setsort(2);
    } else if (sort == 2) {
      getsquad();
      setsort(1);
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div
      style={{
        width: 400,
        height: 530,
        overflow: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        <h4 style={{ marginLeft: 20 }}>
          My{" "}
          <span>
            <strong>Squads</strong>
          </span>
        </h4>
        <Tooltip title="Add Squad" arrow>
          <IconButton
            aria-label="Add squad"
            sx={{ color: blue[500], marginLeft: 25 }}
            onClick={handleModalOpen}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sort" arrow>
          <IconButton
            aria-label="Sort Squad"
            sx={{ color: blue[500] }}
            onClick={handlesort}
          >
            <SortIcon />
          </IconButton>
        </Tooltip>
      </div>

      {squaddata.map((onesquad) => (
        <SquadCard squad={onesquad} />
      ))}

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>
          Add New{" "}
          <span>
            <strong>Squad</strong>
          </span>
        </DialogTitle>
        <DialogContent>
          <AddSquad />
        </DialogContent>
      </Dialog>
    </div>
  );
}
