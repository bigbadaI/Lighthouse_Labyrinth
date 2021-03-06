import Phaser from "phaser";

const shake = function(level) {
  level.cameras.main.shake(240, 0.01, false);
}

const removeShift = function(gameState) {
  if (gameState.shiftState) {
    gameState.shiftState.destroy();
  }
} 

const removeOverlay = function(gameState) {
  if (gameState.overlay) {
    gameState.overlay.destroy();
    console.log("CLEAR");
  }
}

const checkOverlay = function(gameState, level) {
  console.log(gameState.currentState)
  if (gameState.currentState === 2) {
    //infrared
    gameState.shake = true;
    gameState.overlay = level.add.image(300, 225, "redOverlay");
    gameState.Neo.setFrame(gameState.currentState);
    gameState.currentState = 0;
  } else if (gameState.currentState === 0) {
    //ultraviolet
    gameState.overlay = level.add.image(300, 225, "purpOverlay");
    gameState.Neo.setFrame(gameState.currentState);
    gameState.currentState++;
  } else {
    //neoVision
    removeOverlay(gameState);
    gameState.Neo.setFrame(gameState.currentState);
    gameState.currentState++;
  }
  if (gameState.overlay) {
    gameState.overlay.setScrollFactor(0);
  }
}

const applyColourAnimations = function(gameState, level, shiftStates) {
  if (gameState.shiftAvailable) {
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)) {
      if (gameState.shiftState) {
        removeShift(gameState);
      }
      removeOverlay(gameState);
      gameState.shiftState = level.add.image(gameState.Neo.x, gameState.Neo.y + 1, shiftStates[gameState.currentState]).setScale(1);
      gameState.shake ? shake(level) : null;
      gameState.shake = false;
      //implement conditionals for mask...before state is changes...if current === 0 then ultraviolet
      if (gameState.currentState === 2) {
        //infrared
        console.log("red", gameState.currentState);
        gameState.shake = true;
        gameState.overlay = level.add.image(300, 225, "redOverlay");
        gameState.Neo.setFrame(gameState.currentState);
        gameState.currentState = 0;
      } else if (gameState.currentState === 0) {
        //ultraviolet
        gameState.twoB = true;
        console.log("purple", gameState.currentState);
        gameState.overlay = level.add.image(300, 225, "purpOverlay").setAlpha(0.6);
        gameState.Neo.setFrame(gameState.currentState);
        gameState.currentState++;
      } else if(gameState.currentState === 1) {
        //neoVision
        console.log("normal" , gameState.currentState);
        removeOverlay(gameState);
        gameState.Neo.setFrame(gameState.currentState);
        gameState.currentState++;
      }
      if (gameState.overlay) {
        gameState.overlay.setScrollFactor(0);
      }
    }
  }
}

//didn't export removeOverlay its only used in the applyColourAnimations
export {
  removeShift,
  applyColourAnimations,
  checkOverlay
}
