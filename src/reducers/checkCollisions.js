import { gameHeight } from "../utils/constants";
import { checkCollision } from "../utils/formulas";

export default (cannonBalls, flyingObjects) => {
  const objectsDestroyed = [];
  flyingObjects.forEach(flyingObject => {
    const now = new Date();
    const currentLifeTime = now.getTime() - flyingObject.createdAt;
    const calculatedPosition = {
      x: flyingObject.position.x,
      y: flyingObject.position.y + currentLifeTime / 4000 * gameHeight
    };
    const rectA = {
      x1: calculatedPosition.x - 40,
      y1: calculatedPosition.y - 10,
      x2: calculatedPosition.x + 40,
      y2: calculatedPosition.y + 10
    };
    cannonBalls.forEach(cannonBall => {
      const rectB = {
        x1: cannonBall.position.x - 8,
        y1: cannonBall.position.y - 8,
        x2: cannonBall.position.x + 8,
        y2: cannonBall.position.y + 8
      };
      if (checkCollision(rectA, rectB)) {
        objectsDestroyed.push({
          cannonBallId: cannonBall.id,
          flyingObjectId: flyingObject.id
        });
      }
    });
  });
  return objectsDestroyed;
};
