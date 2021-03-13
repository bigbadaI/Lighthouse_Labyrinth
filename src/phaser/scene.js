import Phaser from "phaser";
import logoImg from "../assets/logo.png";
import NeoImg from "../assets/Neo.png";
const gameState = {};

class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  preload() {
    this.load.crossOrigin = 'anonymous';
    this.load.image("logo", logoImg);
    this.load.image("Neo", NeoImg);
  }

  create() {
    // const logo = this.add.image(400, 150, "logo");
    gameState.Neo = this.physics.add.sprite(500,275, "Neo").setScale(0.2);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    // let graphics = this.add.graphics({
    //   x: (Neo.x - Neo.width / 2) - 44,
    //   y: (Neo.y - Neo.height / 2) + 109
    // })
    // .fillStyle(0xffff00, 0.2)
    // // .setTexture(Neo, undefined, 1)
    // .fillCircle(Neo.x, Neo.y, Neo.width / 15, Neo.height / 15)

    // this.tweens.add({
    //   targets: graphics,
    //   alpha: 0,
    //   ease: 'Cubic.easeOut',  
    //   duration: 1000,
    //   repeat: -1,
    //   yoyo: true
    // })
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.Neo.x -= 5;
    }
    if (gameState.cursors.right.isDown) {
      gameState.Neo.x += 5;
    }
    if (gameState.cursors.up.isDown) {
      gameState.Neo.y -= 5;
    }
    if (gameState.cursors.down.isDown) {
      gameState.Neo.y += 5;
    }
  }
}

export default playGame;