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
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

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
    if (eaten) {
      setScore((prev) => prev + 10);
    }
  }, [eaten]);
  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
  return (
    <gameCtrlCxt.Provider value={{ eaten, setEaten, setGameOver }}>
      <div className="gameFrame">
        <div className="snakeFrame">
          {gameOver ? (
            <div>
              <div>Game Over</div>
              <button onClick={() => setGameOver(false)}> Reset Game </button>
            </div>
          ) : (
            <div>
              <Snake keychange={state.key} />
              <Fruit />
            </div>
          )}
        </div>
        <div className="infoBorad">
          <p>Score: {score}</p>
          <p>Level: {Math.ceil(score / 10)}</p>
        </div>
      </div>
    </gameCtrlCxt.Provider>
  );
};
export default GameCtrl;
