import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { parallaxBackground } from "./helper/backgrounds";

const gameState = {};


export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }
  
  preload() {
  }

  create() {
    //Creates the Parallax Background
    const width = this.scale.width
    const height = this.scale.height
    this.add.image(0, height + 75, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    this.add.image(width, height + 75, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    this.add.image(0, height + height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    this.add.image(width, height + height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    
    const map = this.make.tilemap({ key: "LVL1" });
    const tileset = map.addTilesetImage("lvl1_cave", "caveTiles");
    map.createStaticLayer("Background_Walls(non-colide)", tileset);
    const wallsLayer = map.createStaticLayer("Walls", tileset);
    wallsLayer.setCollisionByProperty({ collides: true });
    //Debug to show collision outlines in the tiles
    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // wallsLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 65),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

    gameState.Neo = this.physics.add.sprite(300, 250, "Neo").setScale(0.09);
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );
    this.cameras.main.setBounds(0, 0, 3200)
    this.cameras.main.startFollow(gameState.Neo, true, 0.5, 0.5)

    gameState.cursors = this.input.keyboard.createCursorKeys();

    //Adds collision factors so far just new and wallsLayer
    this.physics.add.collider(gameState.Neo, wallsLayer);
  }

  update() {
     NeoMovment(gameState)
  }
}