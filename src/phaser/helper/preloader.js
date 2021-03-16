import Phaser from "phaser";
//sprite sheet replace Neo image
import NeoSpriteSheet from "../../assets/NeoSpriteSheet.png";
import pause from "../../assets/pause_button.png"
import infrared from "../../assets/colourSelector/NeoInfrared.png";
import ultraviolet from "../../assets/colourSelector/NeoUltraviolet.png";
import neoVision from "../../assets/colourSelector/NeoVision.png";
import redOverlay from "../../assets/crimsonOverlay.png";
import purpOverlay from "../../assets/purpOverlay.png";
import caveTiles from "../../assets/tiles/mainlev_build.png";
import LVL1 from "../../assets/tiles/lvl1.json"
import LVL2 from "../../assets/tiles/lvl2.json"
import BG1 from "../../assets/backgrounds/background3.png"
const gameState = {};
import mask from "../../assets/mask1.png"

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }
  
  preload() {
    this.load.crossOrigin = "anonymous";
    //Neo images in spritesheet
    this.load.spritesheet("Neo", NeoSpriteSheet, {
      frameWidth: 512,
      frameHeight: 512
      });
    this.load.image("caveTiles", caveTiles);
    this.load.tilemapTiledJSON("LVL1", LVL1);
    this.load.tilemapTiledJSON("LVL2", LVL2)
    this.load.image("BG1", BG1)
    this.load.image("BG2")
    this.load.image("energyBall", NeoSpriteSheet[1]);
    this.load.image("mask", mask)
    //shifting colour images
    this.load.image('ultraviolet', ultraviolet);
    this.load.image('infrared', infrared);
    this.load.image('neoVision', neoVision);
    this.load.image('purpOverlay', purpOverlay);
    this.load.image('redOverlay', redOverlay);
    this.load.image('pause', pause);
  }

  create() {
    this.scene.start("Level1")
  }
}