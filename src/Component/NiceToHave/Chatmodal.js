import { useState } from "react";
import axios from "axios";
import chatgpticon from "../../Assests/chatgpticon.png";
import "./ChatModal.css";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
const apiKey = "ea0150a2damshd5c464b30d673f7p11b394jsn03b8cb223e3e";
const endpoint = "https://open-ai21.p.rapidapi.com/conversationllama";

const options = {
  method: "POST",
  url: endpoint,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
  },
  data: {
    web_access: false,
  },
};

function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [initial, setinitial] = useState(true);
  const [isresponse, setisresponse] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setinitial(false);
    setisresponse(true);

    options.data.messages = [
      {
        role: "user",
        content: message,
      },
    ];

    try {
      const response = await axios.request(options);
      setResponse(response.data.LLAMA);
      setisresponse(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {initial ? (
        <div className="ModalWindow1">
          <img
            className="chatgpticon"
            src={chatgpticon}
            alt="chatgptimg"
            onClick={openModal}
          />
          {isOpen && (
            <div className="modal-overlay1">
              <div className="modal-content1">
                <button className="close-button1" onClick={closeModal}>
                  &times;
                </button>
                <h3>
                  Chat with My{" "}
                  <ttt>
                    <b>AI Model</b>
                  </ttt>
                </h3>
                <div className="modal-body1">
                  <div className="container1">
                    <form onSubmit={handleSubmit}>
                      <input
                        className="chatinp"
                        type="text"
                        value={message}
                        onChange={handleChange}
                      />
                      <IconButton>
                        <SendIcon
                          className="sendplane"
                          type="submit"
                          onClick={handleSubmit}
                        />
                      </IconButton>
                    </form>
                  </div>
                  <h5 style={{ color: "white" }}>Limitations :</h5>
                  <p>
                    May occasionally generate incorrect information, May
                    occasionally produce harmful instructions or biased content,
                    Limited knowledge of world and events after 2021.
                  </p>
                </div>

                <footer>&copy; Ashwath Kumaran</footer>
              </div>
            </div>
          )}
        </div>
      ) : isresponse ? (
        <div className="ModalWindow1">
          <img
            className="chatgpticon"
            src={chatgpticon}
            alt="chatgptimg"
            onClick={openModal}
          />
          {isOpen && (
            <div className="modal-overlay1">
              <div className="modal-content1">
                <button className="close-button1" onClick={closeModal}>
                  &times;
                </button>
                <h3>
                  Chat with My{" "}
                  <ttt>
                    <b>AI Model</b>
                  </ttt>
                </h3>
                <div className="modal-body1">
                  <div className="container1">
                    <CircularProgress
                      disableShrink
                      sx={{
                        color: "black",
                        marginTop: 10,
                        marginLeft: 20,
                        marginBottom: 20,
                      }}
                    />
                  </div>
                </div>
                <footer>&copy; Ashwath Kumaran</footer>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="ModalWindow1">
          <img
            className="chatgpticon"
            src={chatgpticon}
            alt="chatgptimg"
            onClick={openModal}
          />
          {isOpen && (
            <div className="modal-overlay1">
              <div className="modal-content1">
                <button className="close-button1" onClick={closeModal}>
                  &times;
                </button>
                <h3>
                  Chat with My{" "}
                  <ttt>
                    <b>AI Model</b>
                  </ttt>
                </h3>
                <div className="modal-body1">
                  <div className="container1">
                    <form className="chatform" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className="chatinp"
                        value={message}
                        onChange={handleChange}
                        style={{ width: 200 }}
                      />
                      <IconButton>
                        <SendIcon
                          className="sendplane"
                          type="submit"
                          onClick={handleSubmit}
                        />
                      </IconButton>
                    </form>
                    {response && (
                      <div className="chat-bubble response-bubble">
                        <p>{response}</p>
                      </div>
                    )}
                  </div>
                </div>
                <footer>&copy; Ashwath Kumaran</footer>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default ChatModal;
