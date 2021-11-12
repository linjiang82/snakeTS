import { randomInt } from "crypto";
import React, { useState } from "react";

interface IFruit {
  location: [number, number];
}
const Fruit = () => {
  let x = Math.floor(Math.random() * 10) * 30;
  let y = Math.floor(Math.random() * 10) * 30;
  const [state, setState] = useState({
    location: [x, y],
  });

  return (
    <div
      className="fruit"
      style={{ top: state.location[1], left: state.location[0] }}
    ></div>
  );
};

export default Fruit;
