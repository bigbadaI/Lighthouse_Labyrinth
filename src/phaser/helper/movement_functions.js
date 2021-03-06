import { removeShift } from "./colour_shift";

function NeoMoves(gameState) {
  // console.log('spotlight interval runs');
  gameState.spotlight.x = gameState.Neo.x;
  gameState.spotlight.y = gameState.Neo.y;
  if (!gameState.isStart){
  gameState.spotlight1.x = gameState.Neo.x;
  gameState.spotlight1.y = gameState.Neo.y;
  }
}

const NeoMovment = function(gameState) {
  const LEFT = gameState.cursors.left.isDown;
  const RIGHT = gameState.cursors.right.isDown;
  const UP = gameState.cursors.up.isDown;
  const DOWN = gameState.cursors.down.isDown;
  const MOVE = function(x, y) {
    gameState.Neo.setVelocity(x, y);
  };

  //delete arrow key intructions only on scene one
  if(gameState.instruct && (LEFT || RIGHT || UP || LEFT || DOWN)) {
    gameState.instruct.destroy();
  }

  const speed = 300;
  if (LEFT) {
    removeShift(gameState);
    if (DOWN) {
      removeShift(gameState);
      MOVE(-speed, speed);
      NeoMoves(gameState);
    } 
    else if (UP) {
      removeShift(gameState);
      MOVE(-speed, -speed);
      NeoMoves(gameState);
    } 
    else {
      removeShift(gameState);
      MOVE(-speed, 0);
      NeoMoves(gameState);
    } 
  } else if (RIGHT) {
    removeShift(gameState);
    if (DOWN) {
      removeShift(gameState);
      MOVE(speed, speed);
      NeoMoves(gameState);
    } 
    else if (UP) {
      removeShift(gameState);
      MOVE(speed, -speed);
      NeoMoves(gameState);
    } 
    else MOVE(speed, 0);
    NeoMoves(gameState);
  } else if (UP) {
    removeShift(gameState);
    MOVE(0, -speed);
    NeoMoves(gameState);
  } 
  else if (DOWN) {
    removeShift(gameState);
    MOVE(0, speed);
    NeoMoves(gameState);
  }
  //Else to stop movement when no longer pressing an arrow key
  else {
    MOVE(0, 0);
  }
};


export {
  NeoMovment,
  NeoMoves
}


