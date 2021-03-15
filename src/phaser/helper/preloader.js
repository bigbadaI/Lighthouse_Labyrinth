import Phaser from "phaser";
import NeoImg from "../../assets/Neo.png";
import mask from "../../assets/mask1.png"
import caveTiles from "../../assets/tiles/mainlev_build.png";
import LVL1 from "../../assets/tiles/lvl1.json"
const gameState = {};
import BG1 from "../../assets/backgrounds/background3.png"
// import Scene_LVL1 from "./phaser/scene_lvl1"

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }
  
  preload() {
    this.load.crossOrigin = "anonymous";
    this.load.image("Neo", NeoImg);
    this.load.image("caveTiles", caveTiles);
    this.load.tilemapTiledJSON("LVL1", LVL1);
    this.load.image("BG1", BG1)
    this.load.image("BG2")
    this.load.image("energyBall", NeoImg);
    this.load.image("mask", mask)
  }

  create() {
    this.scene.start("Level1")
  }
}