import React, { useContext, useEffect, useState } from "react";
import { IContext, gameCtrlCxt } from "./context";

interface IFruit {
  location: [number, number];
}
interface IProps {}

const Fruit = (props: IProps) => {
  const { eaten, setEaten } = useContext(gameCtrlCxt) as IContext;
  const [state, setState] = useState<IFruit>(() => {
    let x = Math.floor(Math.random() * 10) * 30;
    let y = Math.floor(Math.random() * 10) * 30;
    return { location: [x, y] };
  });
  useEffect(() => {
    if (eaten) {
      let x = Math.floor(Math.random() * 10) * 30;
      let y = Math.floor(Math.random() * 10) * 30;
      setState({ location: [x, y] });
      setEaten(false);
    }
  }, [eaten]);

  return (
    <div
      className="fruit"
      style={{ top: state.location[1], left: state.location[0] }}
    ></div>
  );
};

export default Fruit;
