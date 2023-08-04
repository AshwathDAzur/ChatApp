import Signin from "./Component/Signin";
import Signup from "./Component/Signup";
import Home from "./Component/WorkWhishper/Home";
import Edit from "./Component/Profile/Edit";
import Whisper from "./Component/Whisper/Whisper";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./Style.css";
const alankey =
  "baed44ad512fb3df378ab3e57cc6776a2e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [data, setdata] = useState(false);

  useEffect(() => {
    alanBtn({
      key: alankey,
      onCommand: ({ command }) => {
        if (command == "testcommand") {
          setdata(true);
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/whisper" element={<Whisper />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
