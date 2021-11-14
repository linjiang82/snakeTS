import React, { useContext, useEffect, useState } from "react";
import { gameCtrlCxt, IContext } from "./context";

enum IDirection {
  "L",
  "R",
  "U",
  "D",
}
interface ISnake {
  length: number;
  speed: number;
  direction: IDirection;
  location: [number, number];
}
interface IProps {
  keychange: "s" | "d" | "a" | "w" | "";
}

const Snake = (props: IProps) => {
  const context = useContext(gameCtrlCxt) as IContext;
  const [length, setLength] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(IDirection.R);
  const [location, setLocation] = useState([0, 0]);
  const [divs, setDivs] = useState<JSX.Element[]>();

  //start the game with 3 long snake, not setting the initial
  //length to 3 bcs that will cause gameover right away
  useEffect(() => {
    if (length < 3) {
      setLength((prev) => prev + 1);
    }
  });

  let fruit = document.getElementsByClassName("fruit")[0] as HTMLElement;
  let snakes = document.getElementsByClassName("snake");
  let snake = snakes[0] as HTMLElement;
  let fruitX = fruit?.style.left;
  let fruitY = fruit?.style.top;
  let snakeX = snake?.style.left;
  let snakeY = snake?.style.top;
  //update the location of snake head
  const headPos = () => {
    switch (direction) {
      case IDirection.D: {
        if (location[1] + 10 >= 300) {
          setLocation([location[0], 0]);
        } else setLocation([location[0], location[1] + 10]);
        break;
      }
      case IDirection.U: {
        if (location[1] - 10 < 0) {
          setLocation([location[0], 290]);
        } else setLocation([location[0], location[1] - 10]);
        break;
      }
      case IDirection.R: {
        if (location[0] + 10 >= 300) {
          setLocation([0, location[1]]);
        } else setLocation([location[0] + 10, location[1]]);
        break;
      }
      case IDirection.L: {
        if (location[0] - 10 < 0) {
          setLocation([290, location[1]]);
        } else setLocation([location[0] - 10, location[1]]);
        break;
      }
    }
  };

  //render the divs represent snake
  const display = () => {
    let tempDivs: JSX.Element[] = [];
    for (let i = length - 1; i > 0; i--) {
      let prevNode = document.getElementsByClassName("snake")[
        i - 1
      ] as HTMLElement;
      let x = prevNode?.style.left || 0;
      let y = prevNode?.style.top || 0;
      tempDivs.unshift(
        <div key={i} className="snake" style={{ left: x, top: y }}></div>
      );
    }
    tempDivs.unshift(
      <div
        key={0}
        className="snake"
        style={{ backgroundColor: "red", left: location[0], top: location[1] }}
      ></div>
    );
    setDivs(tempDivs);
  };

  const checkEaten = () => {
    //if eaten, increase the length, score and speed
    if (
      fruitX != undefined &&
      snakeX != undefined &&
      fruitX === snakeX &&
      fruitY === snakeY
    ) {
      setLength((prev) => prev + 1);
      setSpeed((prev) => prev + 0.3);
      context.setEaten(true);
    }
  };

  //check gameover
  const gameOver = () => {
    const snakes = document.getElementsByClassName(
      "snake"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = length - 1; i > 0; i--) {
      if (
        snakes[i]?.style.left == snakes[0]?.style.left &&
        snakes[i]?.style.top == snakes[0]?.style.top
      ) {
        context.setGameOver(true);
        break;
      }
    }
  };
  //change direction per the props passed from gameCtrl
  useEffect(() => {
    switch (props.keychange) {
      case "s": {
        if (direction == IDirection.L || direction == IDirection.R)
          setDirection(IDirection.D);
        break;
      }
      case "d": {
        if (direction == IDirection.D || direction == IDirection.U)
          setDirection(IDirection.R);
        break;
      }
      case "a": {
        if (direction == IDirection.D || direction == IDirection.U)
          setDirection(IDirection.L);
        break;
      }
      case "w": {
        if (direction == IDirection.L || direction == IDirection.R)
          setDirection(IDirection.U);
        break;
      }
    }
  }, [props.keychange]);

  //the below effect to reduce the delay between key pressed and the snake movement.
  useEffect(() => {
    headPos();
  }, [direction]);

  useEffect(() => {
    let id = setTimeout(headPos, 300 / speed);
    return () => {
      clearTimeout(id);
    };
  });

  useEffect(() => {
    display();
    checkEaten();
    gameOver();
  }, [location]);
  return <div>{divs}</div>;
};

export default Snake;
