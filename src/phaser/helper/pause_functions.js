const pause = function(gameState) {
  if(Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) gameState.paused = !gameState.paused;
  if(gameState.paused) return;

if(Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
  console.log(gameState.paused); 
  if (gameState.paused) {
    gameState.pause.destroy();
    this.scene.resume();
    gameState.paused = false;
    console.log("unpaused");
  } else {
    //add the pause animation here
    console.log("paused");
    gameState.paused = true;
    console.log(gameState.paused);
    const pause = this.add.image(200, 125, "pause");
    this.scene.pause();
    }
  } 
};

module.exports = {
  pause,
};
