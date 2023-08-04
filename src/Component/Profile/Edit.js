import * as React from "react";
import AvatarRibbon from "../WorkWhishper/AvatarRibbon";
import Appbar from "../WorkWhishper/Appbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Edit() {
  const [userdata, setUserData] = useState({});
  const [userName, setUserName] = useState("");
  const [nickname, setnickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [roleRoleId, setroleRoleId] = useState(0);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const data = localStorage.getItem("loggeduser");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setUserName(parsedData.userName);
      setnickname(parsedData.nickname);
      setPassword(parsedData.password);
      setAge(parsedData.age);
      setEmail(parsedData.email);
      setAddress(parsedData.address);
      setPhone(parsedData.phone);
      setroleRoleId(parsedData.roleRoleId);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:7105/api/Users/${userdata.userId}`,
        {
          userId: userdata.userId,
          userName: userName,
          nickname: nickname,
          email: email,
          password: password,
          age: age,
          address: address,
          phone: phone,
          roleRoleId: roleRoleId,
        }
      );
      console.log(response.data);
      const updatedUserData = {
        ...userdata,
        userName: userName,
        nickname: nickname,
        email: email,
        password: password,
        age: age,
        address: address,
        phone: phone,
        roleRoleId: roleRoleId,
      };
      localStorage.setItem("loggeduser", JSON.stringify(updatedUserData));
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handlenicknameChange = (event) => {
    setnickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <div>
      <Appbar />
      <AvatarRibbon />
      <h3 style={{ margintop: 10, marginLeft: 15 }}>
        <span>Be Noticed: </span>
        <br />
        Keep Your Profile Updated <span>!</span>
      </h3>
      <div style={{ marginTop: 10, marginLeft: 20 }}>
        <form onSubmit={handleSubmit} style={{ margintop: 5, marginLeft: 200 }}>
          <TextField
            style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
            className="slide-in-textfield"
            label="User Name"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
          />
          <TextField
            className="slide-in-textfield"
            label="nickname"
            type="text"
            style={{
              marginLeft: 20,
              marginTop: 30,
              borderRadius: 4,
              boxShadow: "1px 1px 10px lightblue",
            }}
            value={nickname}
            onChange={handlenicknameChange}
          />
          <br />
          <br />
          <TextField
            style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
            className="slide-in-textfield"
            label="Age"
            type="number"
            value={age}
            onChange={handleAgeChange}
          />
          <TextField
            className="slide-in-textfield"
            label="Password"
            type="password"
            value={password}
            style={{
              marginLeft: 20,
              marginTop: 30,
              borderRadius: 4,
              boxShadow: "1px 1px 10px lightblue",
            }}
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <TextField
            className="slide-in-textfield"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ borderRadius: 4, boxShadow: "1px 1px 10px lightblue" }}
          />
          <TextField
            style={{
              marginLeft: 20,
              marginTop: 30,
              borderRadius: 4,
              boxShadow: "1px 1px 10px lightblue",
            }}
            className="slide-in-textfield"
            label="Phone"
            type="number"
            value={phone}
            onChange={handlePhoneChange}
          />
          <br />
          <br />
          <TextField
            className="slide-in-textfield"
            label="Address"
            type="text"
            multiline
            rows={4}
            style={{
              borderRadius: 4,
              boxShadow: "1px 1px 10px lightblue",
            }}
            value={address}
            onChange={handleAddressChange}
          />
          <Button
            className="slide-in-textfield"
            variant="contained"
            type="submit"
            style={{ float: "right", marginRight: 360, marginTop: 90 }}
          >
            Update
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Profile Updated Successdully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
