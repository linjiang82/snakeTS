import React, { useContext, useEffect, useState } from "react";
import Snake from "./snake";
import Fruit from "./fruit";
import { gameCtrlCxt } from "./context";

interface IGameState {
  key: "s" | "d" | "a" | "w" | "";
}
const GameCtrl = () => {
  const [state, setState] = useState<IGameState>({ key: "" });
  const [eaten, setEaten] = useState<boolean>(false);

  //check eaten
  const listener = (e: KeyboardEvent) => {
    switch (e.key) {
      case "s":
      case "d":
      case "a":
      case "w":
        if (state.key !== e.key) setState({ key: e.key });
        break;
    }
  };
  document.addEventListener("keydown", listener);
  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [state]);
  return (
    <gameCtrlCxt.Provider value={{ eaten, setEaten }}>
      <div className="gameFrame">
        <div className="snakeFrame">
          <Snake keychange={state.key} />
          <Fruit />
        </div>
        <div className="infoBorad">
          <p>Score:</p>
          <p>Level:</p>
        </div>
      </div>
    </gameCtrlCxt.Provider>
  );
};
export default GameCtrl;
