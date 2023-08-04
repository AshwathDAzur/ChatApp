import React from "react";
import Appbar from "./Appbar";
import AvatarRibbon from "./AvatarRibbon";
import SquadRibbon from "../Squad/SquadRibbon";
import Whisper from "../Whisper/Whisper";

export default function Home() {
  return (
    <div>
      <Appbar />
      <AvatarRibbon />
      <div style={{ display: "flex" }}>
        <SquadRibbon />
        <Whisper />
      </div>
    </div>
  );
}
