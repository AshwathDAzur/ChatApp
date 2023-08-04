import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Alert, AlertTitle } from "@mui/material";
import Addon from "../Assests/Addon.gif";
const roleOptions = [
  { value: 1, label: "Impactor" },
  { value: 2, label: "Mentor" },
  { value: 3, label: "Employee" },
  { value: 4, label: "Team Leader" },
];

export default function Signup() {
  const [user, setUser] = useState({
    userId: 0,
    userName: "",
    nickname: "",
    email: "",
    password: "",
    age: 0,
    address: "",
    phone: 0,
    roleRoleId: 1,
  });
  const [signUpError, setSignUpError] = React.useState(false);

  const Navigate = useNavigate();
  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7105/api/Users/LastUser"
      );
      var temp = response.data;
      setUser((prevUser) => ({
        ...prevUser,
        userId: temp + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      user.userName != "" &&
      user.address != "" &&
      user.age != "" &&
      user.email != "" &&
      user.nickname != "" &&
      user.password != "" &&
      user.phone != ""
    ) {
      try {
        const response = await axios.post(
          "https://localhost:7105/api/Users",
          user
        );
        Navigate("signin");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSignUpError(true);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              WorkWhishper
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ display: "flex" }}>
        <div>
          <div></div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h1>
              <span>Sign Up</span>
            </h1>
            <TextField
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              id="userName"
              name="userName"
              label="Username"
              variant="outlined"
              value={user.userName}
              onChange={handleChange}
            />
            <TextField
              id="password"
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              name="password"
              label="password"
              type="password"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="nickname"
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              name="nickname"
              label="nickname"
              variant="outlined"
              type="text"
              value={user.nickname}
              onChange={handleChange}
            />

            <TextField
              id="age"
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              name="age"
              label="Age"
              variant="outlined"
              type="number"
              value={user.age}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="email"
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={user.email}
              onChange={handleChange}
            />

            <TextField
              id="address"
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              name="address"
              label="Address"
              type="text"
              multiline
              rows={4}
              value={user.address}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="phone"
              style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
              className="slide-in-textfield"
              name="phone"
              label="phone"
              variant="outlined"
              type="number"
              value={user.phone}
              onChange={handleChange}
            />
            <br />
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="roleRoleId-label">Role</InputLabel>
              <Select
                style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
                labelId="roleRoleId-label"
                className="slide-in-textfield"
                id="roleRoleId"
                name="roleRoleId"
                value={user.roleRoleId}
                onChange={handleChange}
                label="Role"
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              className="slide-in-textfield"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>

            <Stack sx={{}} spacing={2}>
              <br />
              {signUpError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Invalid username or password. Please try again.
                </Alert>
              )}
            </Stack>
          </Box>
        </div>
        <div style={{ marginTop: 100, marginLeft: 200 }}>
          <img src={Addon} />
        </div>
      </div>
    </div>
  );
}
