import Phaser from "phaser";
import NeoSpriteSheet from "../../assets/NeoSpriteSheet.png";
import pause from "../../assets/pause_button.png"
import infrared from "../../assets/colourSelector/NeoInfrared.png";
import ultraviolet from "../../assets/colourSelector/NeoUltraviolet.png";
import neoVision from "../../assets/colourSelector/NeoVision.png";
import redOverlay from "../../assets/crimsonOverlay.png";
import purpOverlay from "../../assets/purpOverlay.png";

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

const applyColourAnimations = function(gameState, level, shiftStates) {
  // console.log(gameState.cursors.shift);
  console.log(gameState.shiftAvailable);
  if (gameState.shiftAvailable) {
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)) {
      console.log("shift");
      // const shiftStates = [ultraviolet, neoVision, infrared];
      if (gameState.shiftState) {
        removeShift(gameState);
      }
      removeOverlay(gameState);
      console.log("Neo:", gameState.Neo.x, gameState.Neo.y);
      console.log("shift states:", shiftStates);
      console.log("current:", gameState.currentState);
      console.log(level.this);
      gameState.shiftState = level.this.add.image(gameState.Neo.x, gameState.Neo.y + 1, shiftStates[gameState.currentState]).setScale(1);
      gameState.shake ? level.this.shake() : null;
      gameState.shake = false;
      //implement conditionals for mask...before state is changes...if current === 0 then ultraviolet
      if (gameState.currentState === 2) {
        //infrared
        gameState.currentState = 0;
        gameState.shake = true;
        gameState.overlay = level.this.add.image(300, 225, redOverlay);
        gameState.Neo.setFrame(currentState);
      } else if (gameState.currentState === 0) {
        //ultraviolet
        gameState.currentState++;
        gameState.overlay = level.this.add.image(300, 225, purpOverlay);
        gameState.Neo.setFrame(currentState);
      } else {
        //neoVision
        removeOverlay(gameState);
        gameState.Neo.setFrame(currentState);
        gameState.currentState++;
      }
    }
  }
}

//didn't export removeOverlay its only used in the applyColourAnimations
export {
  removeShift,
  applyColourAnimations
}
