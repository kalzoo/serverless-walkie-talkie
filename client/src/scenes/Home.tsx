import React, { useState } from "react";
import RoomList from "components/RoomList";

const HomeScene: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <RoomList />
      </header>
    </div>
  );
};

export default HomeScene;
