import Phaser from "phaser";
import NeoImg from "../../assets/Neo.png";
import caveTiles from "../../assets/tiles/mainlev_build.png";
import danger1 from "../../assets/damage-overlay.png";
// import danger2 from "../../assets/extremeWarning.png";
import impact from "../../assets/onImpact.png";
import LVL1 from "../../assets/tiles/lvl1.json"
import LVL2 from "../../assets/tiles/lvl2.json"
import BG1 from "../../assets/backgrounds/background3.png"
import mask from "../../assets/mask1.png"
const gameState = {};


export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }
  
  preload() {
    this.load.crossOrigin = "anonymous";
    this.load.image("Neo", NeoImg);
    this.load.image("caveTiles", caveTiles);
    this.load.tilemapTiledJSON("LVL1", LVL1);
    this.load.tilemapTiledJSON("LVL2", LVL2)
    this.load.image("BG1", BG1)
    this.load.image("BG2")
    this.load.image("energyBall", NeoImg);
    this.load.image("mask", mask)
    this.load.image("danger1", danger1);
    // this.load.image("danger2", danger2);
    this.load.image("impact", impact);
  }

  create() {
    this.scene.start("Level1")
  }
}