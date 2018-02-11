import {
  createInterval,
  flyingObjectStarterYAxis,
  maxFlyingObjects,
  flyingObjectStarterPositions
} from "../utils/constants";

export default state => {
  if (!state.gameState.started) return state;

  const now = new Date();
  const nowTime = now.getTime();
  const { lastObjectCreatedAt, flyingObjects } = state.gameState;
  const createNewObject =
    nowTime - lastObjectCreatedAt.getTime() > createInterval &&
    flyingObjects.length < maxFlyingObjects;

  if (!createNewObject) return state;

  const id = nowTime;
  const predefinedPosition = Math.floor(Math.random() * maxFlyingObjects);
  const flyingObjectPosition = flyingObjectStarterPositions[predefinedPosition];
  const newFlyingObject = {
    position: {
      x: flyingObjectPosition,
      y: flyingObjectStarterYAxis
    },
    createdAt: nowTime,
    id
  };

  return {
    ...state,
    gameState: {
      ...state.gameState,
      flyingObjects: [...state.gameState.flyingObjects, newFlyingObject],
      lastObjectCreatedAt: now
    }
  };
};
