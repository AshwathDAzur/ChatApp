import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChatModal from "../NiceToHave/Chatmodal";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [searchText, setSearchText] = React.useState("");
  const [whisp, setWhisp] = React.useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handlelistevent = (text) => {
    if (text === "Home") {
      navigate("/home");
    } else if (text === "Profile") {
      navigate("/edit");
    } else if (text === "Logout") {
      navigate("/signin");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Profile", "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handlelistevent(text)}>
              <ListItemIcon sx={{ color: "#2196f3" }}>
                {index === 0 ? (
                  <DashboardIcon />
                ) : index === 1 ? (
                  <AccountCircleIcon />
                ) : (
                  <LogoutIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handledashboard = () => {
    navigate("/home");
  };

  const handlelogout = () => {
    navigate("/signin");
  };
  const menuId = "primary-search-account-menu";

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  React.useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get("https://localhost:7105/api/Whispers");
      setWhisp(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredWhisp = whisp.filter(
    (item) =>
      item.squadName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.username.toLowerCase().includes(searchText.toLowerCase()) ||
      item.whisper.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchText.toLowerCase())
  );
  const FilteredWhispResults = ({ filteredWhisp }) => {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          marginLeft: 20,
          zIndex: 100,
        }}
      >
        <div
          style={{
            backgroundColor: "#2196f3",
            height: 250,
            marginLeft: 30,
            border: "1px solid #2196f3",
            boxShadow: "1px 1px 10px #2196f3",
            borderRadius: 20,
            overflow: "auto",
          }}
        >
          {filteredWhisp && filteredWhisp.length > 0 ? (
            filteredWhisp.map((item) => (
              <div
                key={item.whisperid}
                style={{
                  color: "white",
                  width: 300,
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                <strong>{item.username} :</strong> {item.whisper}{" "}
                <strong style={{ color: "#1de9b6" }}>({item.squadName})</strong>
              </div>
            ))
          ) : (
            <div
              style={{
                color: "white",
                width: 300,
                marginTop: 20,
                marginLeft: 10,
                textAlign: "center",
                marginTop: 80,
              }}
            >
              <h4>
                <strong>No Results Found</strong>{" "}
              </h4>
              <p>🙄🙄🙄</p>
            </div>
          )}
        </div>
      </Box>
    );
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorhome={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformhome={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handlelogout}>Logout</MenuItem>
    </Menu>
  );
  ////====================================================================================
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorhome={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformhome={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  ////=====================================================================
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#2196f3", color: "white" }}
      >
        <Toolbar>
          <React.Fragment key={"left"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={toggleDrawer("left", true)} />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
          <Tooltip title="WorkWhisper" arrow>
            <IconButton
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                navigate("/home");
              }}
            >
              WorkWhisper <CampaignIcon />
            </IconButton>
          </Tooltip>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ marginLeft: 20 }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </Search>
          {searchText && <FilteredWhispResults filteredWhisp={filteredWhisp} />}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ChatModal />
            <Tooltip title="Dashboard" arrow>
              <IconButton
                size="large"
                aria-label="dashboard"
                color="inherit"
                onClick={handledashboard}
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile" arrow>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
