import { Circle } from "../Interfaces/Interfaces";

export const isDead = (circle: Circle): boolean => {
  return circle === "None";
};

export const isAlive = (circle: Circle): boolean => {
  return circle !== "None";
};
