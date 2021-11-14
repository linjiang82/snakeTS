import { createContext } from "react";
interface IContext {
  eaten: boolean;
  setEaten: Function;
  setGameOver: Function;
}
const gameCtrlCxt = createContext<IContext | null>(null);
export { IContext, gameCtrlCxt };
