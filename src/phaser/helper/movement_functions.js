import { removeShift } from "./colour_shift";

const NeoMovment = function(gameState) {
  const LEFT = gameState.cursors.left.isDown;
  const RIGHT = gameState.cursors.right.isDown;
  const UP = gameState.cursors.up.isDown;
  const DOWN = gameState.cursors.down.isDown;
  const MOVE = function(x, y) {
    gameState.Neo.setVelocity(x, y);
    gameState.spotlight.x = gameState.Neo.x;
    gameState.spotlight.y = gameState.Neo.y;
  };
  const speed = 125;
  if (LEFT) {
    removeShift(gameState);
    if (DOWN) {
      removeShift(gameState);
      MOVE(-speed, speed);
    } 
    else if (UP) {
      removeShift(gameState);
      MOVE(-speed, -speed);
    } 
    else {
      removeShift(gameState);
      MOVE(-speed, 0);
    } 
  } else if (RIGHT) {
    removeShift(gameState);
    if (DOWN) {
      removeShift(gameState);
      MOVE(speed, speed);
    } 
    else if (UP) {
      removeShift(gameState);
      MOVE(speed, -speed);
    } 
    else MOVE(speed, 0);
  } else if (UP) {
    removeShift(gameState);
    MOVE(0, -speed);
  } 
  else if (DOWN) {
    removeShift(gameState);
    MOVE(0, speed);
  }
  //Else to stop movement when no longer pressing an arrow key
  else {
    MOVE(0, 0);
  }
};

export {
  NeoMovment
};

