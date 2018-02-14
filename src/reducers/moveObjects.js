import { calculateAngle } from "../utils/formulas";
import createFlyingObjects from "./createFlyingObjects";
import moveCannonBalls from "./moveCannonBalls";
import checkCollisions from "./checkCollisions";

export default (state, action) => {
  if (!state.gameState.started) return state;
  let cannonBalls = moveCannonBalls(state.gameState.cannonBalls);
  const mousePosition = action.mousePosition || { x: 0, y: 0 };
  const newState = createFlyingObjects(state);
  const now = Date.now();
  let flyingObjects = newState.gameState.flyingObjects.filter(
    x => now - x.createdAt < 4000
  );
  const { x, y } = mousePosition;
  const angle = calculateAngle(0, 0, x, y);
  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
  const cannonBallsDestroyed = objectsDestroyed.map(x => x.cannonBallId);
  const flyingObjectsDestroyed = objectsDestroyed.map(x => x.flyingObjectId);
  cannonBalls = cannonBalls.filter(cannonBall =>
    cannonBallsDestroyed.indexOf(cannonBall.id)
  );
  flyingObjects = flyingObjects.filter(flyingObject =>
    flyingObjectsDestroyed.indexOf(flyingObject.id)
  );
  return {
    ...newState,
    gameState: {
      ...newState.gameState,
      flyingObjects,
      cannonBalls
    },
    angle
  };
};
