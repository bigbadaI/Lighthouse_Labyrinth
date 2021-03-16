import Phaser from "phaser";
import NeoImg from "../../assets/Neo.png";
import caveTiles from "../../assets/tiles/mainlev_build.png";
import LVL1 from "../../assets/tiles/lvl1.json"
import LVL2 from "../../assets/tiles/lvl2.json"
import BG1 from "../../assets/backgrounds/background3.png"
const gameState = {};
import mask from "../../assets/mask1.png"
import leftCapW from "../../assets/barHorizontal_white_left.png"
import rightCapW from "../../assets/barHorizontal_white_right.png"
import middleW from "../../assets/barHorizontal_white_mid.png"
import leftCapR from "../../assets/barHorizontal_red_left.png"
import rightCapR from "../../assets/barHorizontal_red_right.png"
import middleR from "../../assets/barHorizontal_red_mid.png"
import leftCapShadow from "../../assets/barHorizontal_shadow_left.png"
import rightCapShadow from "../../assets/barHorizontal_shadow_right.png"
import middleShadow from "../../assets/barHorizontal_shadow_mid.png"



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
    this.load.image('left-capW', leftCapW)
	  this.load.image('middleW', middleW)
	  this.load.image('right-capW', rightCapW)
    this.load.image('left-capR', leftCapR)
	  this.load.image('middleR', middleR)
	  this.load.image('right-capR', rightCapR)

	  this.load.image('left-cap-shadow', leftCapShadow)
	  this.load.image('middle-shadow', middleShadow)
	  this.load.image('right-cap-shadow', rightCapShadow)
  }

  create() {
    this.scene.start("Level1")
  }
}