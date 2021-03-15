const NeoMovment = function(gameState) {
  const LEFT = gameState.cursors.left.isDown;
  const RIGHT = gameState.cursors.right.isDown;
  const UP = gameState.cursors.up.isDown;
  const DOWN = gameState.cursors.down.isDown;
  const MOVE = function(x, y) {
    gameState.Neo.setVelocity(x, y);
<<<<<<< HEAD
  };
  const speed = 300;
=======
    gameState.spotlight.x = gameState.Neo.x;
    gameState.spotlight.y = gameState.Neo.y;
  };
  const speed = 125;
>>>>>>> emitter
  if (LEFT) {
    if (DOWN) MOVE(-speed, speed);
    else if (UP) MOVE(-speed, -speed);
    else MOVE(-speed, 0);
    NeoMoves(gameState);
  } else if (RIGHT) {
    if (DOWN) MOVE(speed, speed);
    else if (UP) MOVE(speed, -speed);
    else MOVE(speed, 0);
    NeoMoves(gameState);
  } else if (UP) {
    MOVE(0, -speed);
    NeoMoves(gameState);
  } else if (DOWN) {
    MOVE(0, speed);
    NeoMoves(gameState);;
  }
  //Else to stop movement when no longer pressing an arrow key
  else {
    MOVE(0, 0);
  }

};
function NeoMoves(gameState) {
  console.log('spotlight interval runs');
  gameState.spotlight.x = gameState.Neo.x;
  gameState.spotlight.y = gameState.Neo.y;
}
module.exports = {
  NeoMovment,
};
