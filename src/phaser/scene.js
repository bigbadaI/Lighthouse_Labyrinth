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
    this.load.image("Neo", NeoImg);
  }

  create() {
    this.Neo = new NeoClass(this, 500, 275, {key: "Neo"});
  }
}

export default playGame;