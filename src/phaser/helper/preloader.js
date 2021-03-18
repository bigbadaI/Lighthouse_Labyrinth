import Phaser from "phaser";
//sprite sheet replace Neo image
import NeoSpriteSheet from "../../assets/NeoSpriteSheet.png";
import NeoImg from "../../assets/Neo.png";
import pause from "../../assets/pause_button.png";
import infrared from "../../assets/colourSelector/NeoInfrared.png";
import ultraviolet from "../../assets/colourSelector/NeoUltraviolet.png";
import neoVision from "../../assets/colourSelector/NeoVision.png";
import redOverlay from "../../assets/crimsonOverlay.png";
import purpOverlay from "../../assets/purpOverlay.png";
import caveTiles from "../../assets/tiles/mainlev_build.png";
import danger1 from "../../assets/damage-overlay.png";
import danger2 from "../../assets/warning1.png";
import impact from "../../assets/onImpact.png";
import LVL1 from "../../assets/tiles/lvl1.json"
import LVL2 from "../../assets/tiles/lvl2.json"
import BG1 from "../../assets/backgrounds/background3.png"
import mask from "../../assets/mask1.png"
import shiftEnable from "../../assets/shiftEnablerSheet.png";
import leftCapW from "../../assets/barHorizontal_white_left.png";
import rightCapW from "../../assets/barHorizontal_white_right.png";
import middleW from "../../assets/barHorizontal_white_mid.png";
import leftCapR from "../../assets/barHorizontal_red_left.png";
import rightCapR from "../../assets/barHorizontal_red_right.png";
import middleR from "../../assets/barHorizontal_red_mid.png";
import leftCapShadow from "../../assets/barHorizontal_shadow_left.png";
import rightCapShadow from "../../assets/barHorizontal_shadow_right.png";
import middleShadow from "../../assets/barHorizontal_shadow_mid.png";
import heart from "../../assets/sounds/heartbeat.mp3";
import heartFF from "../../assets/sounds/heartbeat.ogg";
import wallCollide from "../../assets/sounds/wallCollide.mp3";
import wallCollideFF from "../../assets/sounds/wallCollide.ogg";
import intro from "../../assets/sounds/intro.mp3";
import introFF from "../../assets/sounds/intro.ogg";
import sparkle from "../../assets/sounds/sparkle.mp3";
import sparkleFF from "../../assets/sounds/sparkle.ogg";
import breathe from "../../assets/sounds/breathe.mp3";
import breatheFF from "../../assets/sounds/breathe.ogg";
import music from "../../assets/sounds/Cave_01.mp3";
import musicFF from "../../assets/sounds/Cave_01.ogg";
const gameState = {};


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
    this.load.image("energyBall", NeoImg);
    this.load.image("mask", mask)
    this.load.image("danger1", danger1);
    // this.load.image("danger2", danger2);
    this.load.image("impact", impact);
    this.load.image('left-capW', leftCapW);
	  this.load.image('middleW', middleW);
	  this.load.image('right-capW', rightCapW);
    this.load.image('left-capR', leftCapR);
	  this.load.image('middleR', middleR);
	  this.load.image('right-capR', rightCapR);
	  this.load.image('left-cap-shadow', leftCapShadow);
	  this.load.image('middle-shadow', middleShadow);
	  this.load.image('right-cap-shadow', rightCapShadow);
    //shifting colour images
    this.load.image('ultraviolet', ultraviolet);
    this.load.image('infrared', infrared);
    this.load.image('neoVision', neoVision);
    this.load.image('purpOverlay', purpOverlay);
    this.load.image('redOverlay', redOverlay);
    this.load.image('pause', pause);
    this.load.spritesheet('shiftEnable', shiftEnable, {
      frameHeight: 100,
      frameWidth: 100
    });
    this.load.audio("heart", [heart, heartFF]);
    this.load.audio("wallCollide", [wallCollide, wallCollideFF]);
    this.load.audio("intro", [intro, introFF]);
    this.load.audio("sparkle", [sparkle, sparkleFF]);
    this.load.audio("breathe", [breathe, breatheFF]);
    this.load.audio("music", [music, musicFF]);
  }

  create() {

    this.scene.start("StartScene")

  }
}