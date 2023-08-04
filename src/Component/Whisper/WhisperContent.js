import React, { useEffect, useState } from "react";
import axios from "axios";
import WhisperPlate from "./WhisperPlate";

const WhisperContent = ({ squadId }) => {
  const [whispers, setWhispers] = useState([]);

  useEffect(() => {
    fetchWhispers();
    const interval = setInterval(() => {
      fetchWhispers();
      setWhispers([]);
    }, 10000);
    return () => {
      setWhispers([]);
      clearInterval(interval);
    };
  }, [squadId]);

  const fetchWhispers = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/Whispers/${squadId}`
      );
      setWhispers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {whispers.map((whisper) => (
        <WhisperPlate
          key={whisper.userId}
          username={whisper.username}
          whisper={whisper.whisper}
          whisperid={whisper.whisperid}
          userId={whisper.userId}
          topic={whisper.topic}
          type={whisper.type}
        />
      ))}
    </div>
  );
};

export default WhisperContent;
