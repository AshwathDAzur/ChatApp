import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, green, blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChatIcon from "@mui/icons-material/Chat";
import CircleIcon from "@mui/icons-material/Circle";
import { useContext } from "react";
import { SquadContext } from "../../Component/Squad/SquadContext";
import Tooltip from "@mui/material/Tooltip";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SquadCard({ squad }) {
  const [expanded, setExpanded] = React.useState(false);
  const { selectedSquadId, setSelectedSquadId } = useContext(SquadContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSquad = () => {
    setSelectedSquadId(squad.squadId);
  };

  return (
    <Card
      sx={{
        width: 350,
        marginLeft: 3,
        marginTop: 2,
        boxShadow: "1px 1px 10px #2196f3",
        border: "1px solid #2196f3",
      }}
    >
      <CardHeader
        sx={{ bgcolor: blue[200], color: blue[900] }}
        title={squad.title}
        subheader={"Created at " + squad.createdAt.slice(0, 10)}
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {squad.title[0]}
            {squad.title[1]}
          </Avatar>
        }
        action={
          <React.Fragment>
            {" "}
            <CircleIcon
              sx={{
                color: selectedSquadId === squad.squadId ? red[700] : blue[600],
                width: 15,
                zIndex: 2,
              }}
            />
          </React.Fragment>
        }
      />

      <CardActions disableSpacing>
        <Tooltip title="Open Chat" arrow>
          <IconButton
            aria-label="Whisper in the squad"
            sx={{ color: blue[500] }}
            onClick={() => {
              handleSquad();
            }}
          >
            <ChatIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="See details" arrow>
          <ExpandMore
            expand={expanded}
            sx={{ color: blue[500] }}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ backgroundColor: blue[500] }}>
          <Typography paragraph>
            {" "}
            <b>{squad.description}</b>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
