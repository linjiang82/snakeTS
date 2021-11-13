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
  const [length, setLength] = useState(3);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(IDirection.R);
  const [location, setLocation] = useState([0, 0]);
  const [divs, setDivs] = useState<JSX.Element[]>();

  //update the location of snake head
  const headPos = () => {
    switch (direction) {
      case IDirection.D: {
        setLocation([location[0], location[1] + 10]);
        break;
      }
      case IDirection.U: {
        setLocation([location[0], location[1] - 10]);
        break;
      }
      case IDirection.R: {
        setLocation([location[0] + 10, location[1]]);
        break;
      }
      case IDirection.L: {
        setLocation([location[0] - 10, location[1]]);
        break;
      }
    }
  };

  //render the divs represent snake
  const display = () => {
    let tempDivs: JSX.Element[] = [];
    for (let i = length - 1; i > 0; i--) {
      let prevNode = document.getElementsByClassName("snake")[
        length - i
      ] as HTMLElement;
      let x = prevNode?.style.left || 0;
      let y = prevNode?.style.top || 0;
      tempDivs.push(
        <div key={i} className="snake" style={{ left: x, top: y }}></div>
      );
    }
    tempDivs.push(
      <div
        key={0}
        className="snake"
        style={{ left: location[0], top: location[1] }}
      ></div>
    );
    setDivs(tempDivs);
  };

  const checkEaten = () => {
    let fruit = document.getElementsByClassName("fruit")[0] as HTMLElement;
    let snakes = document.getElementsByClassName("snake");
    let snake = snakes[snakes.length - 1] as HTMLElement;
    let fruitX = fruit?.style.left;
    let fruitY = fruit?.style.top;
    let snakeX = snake?.style.left;
    let snakeY = snake?.style.top;
    //if eaten, increase the length, score and speed
    if (fruitX === snakeX && fruitY === snakeY) {
      setLength((prev) => prev + 1);
      setSpeed((prev) => prev + 0.4);
      context.setEaten(true);
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

  useEffect(() => {
    let id = setTimeout(headPos, 300 / speed);
    return () => {
      clearTimeout(id);
    };
  });

  useEffect(() => {
    checkEaten();
    display();
  }, [location]);
  return <div>{divs}</div>;
};

export default Snake;
