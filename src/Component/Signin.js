import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Land2 from "../Assests/Land2.gif";
import Loader from "../Assests/loader.gif";
import begin from "../Assests/Profile2.gif";
import logfail from "../Assests/open1.gif";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7105/api/Login/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("loggeduser", JSON.stringify(data));

        setTimeout(() => {
          setLoading(false);
          navigate("/home");
        }, 3000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        seterror(true);
        setSignInError(true);
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ marginLeft: 250 }}>
          <img src={Loader} />
        </div>
      ) : (
        <div>
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
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <img src={Land2} style={{ width: 400, marginTop: 5 }} />
              <div style={{ width: 700, marginLeft: 0 }}>
                <p style={{ fontFamily: "cursive", marginLeft: 50 }}>
                  {" "}
                  <h1>
                    <span>JUST IMAGINE </span>
                  </h1>
                  a place where professionals from all walks of life can come
                  together, collaborate seamlessly, and share their expertise
                  and insights in a secure and confidential environment. A place
                  that fosters<span> innovation</span> , <span>creativity</span>
                  , and <span>meaningful </span>conversations among individuals
                  driven by a common goal to make a difference in their
                  respective industries.
                  <br></br>
                  <strong>
                    {" "}
                    Welcome to <span>WorkWhisper</span>, the revolutionary app
                    designed to transform how professionals interact and
                    exchange knowledge.
                  </strong>
                </p>
              </div>
            </div>
            <br />

            {error ? (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: 10,
                  width: 500,
                  height: 300,
                  border: "1px solid #2196f3",
                  boxShadow: "10px 10px 10px #2196f3",
                  borderRadius: 10,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{}}>
                    <img
                      src={logfail}
                      style={{ width: 150, marginTop: 50, marginLeft: 30 }}
                    />
                  </div>
                  <div style={{ marginTop: 50 }}>
                    <TextField
                      label="Username"
                      name="username"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "25ch" }}
                      value={credentials.username}
                      onChange={handleInputChange}
                    />
                    <br />
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <br />
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ marginLeft: 4 }}
                      >
                        Sign in
                      </Button>
                      <Button variant="outlined" onClick={handleSignup}>
                        Sign up
                      </Button>
                    </Stack>
                  </div>
                </div>
                <Stack spacing={2} sx={{ marginTop: 15 }}>
                  {signInError && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      Invalid username or password. Please try again.
                    </Alert>
                  )}
                </Stack>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: 10,
                  width: 500,
                  height: 300,
                  border: "1px solid #2196f3",
                  boxShadow: "10px 10px 10px #2196f3",
                  borderRadius: 10,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{}}>
                    <img
                      src={begin}
                      style={{ width: 150, marginTop: 50, marginLeft: 30 }}
                    />
                  </div>
                  <div style={{ marginTop: 50 }}>
                    <TextField
                      label="Username"
                      name="username"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: "25ch" }}
                      value={credentials.username}
                      onChange={handleInputChange}
                    />
                    <br />
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <br />
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ marginLeft: 4 }}
                      >
                        Sign in
                      </Button>
                      <Button variant="outlined" onClick={handleSignup}>
                        Sign up
                      </Button>
                    </Stack>
                  </div>
                </div>

                <Stack spacing={2} sx={{ marginTop: 15 }}>
                  {signInError && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      Invalid username or password. Please try again.
                    </Alert>
                  )}
                </Stack>
              </Box>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
