import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
const gameState = {};

export default class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2' });
  }

  create() {
    //Creates the Parallax Background
    const width = this.scale.width
    const height = this.scale.height
    this.add.image(0, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    this.add.image(width, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    this.add.image(0, height + height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    this.add.image(width, height + height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)

    //Renders Neo
    gameState.Neo = this.physics.add.sprite(2800, 25, "Neo").setScale(0.09);
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );

    //Just dummy variable to load the differing layers on level 2. True is normal and false is infa-red
    let cool = true
    const map = this.make.tilemap({ key: "LVL2" });
    if (cool) {
      const tileset = map.addTilesetImage("cave_lvl2", "caveTiles");
      const wallsLayer1 = map.createLayer("Walls_1", tileset);
      wallsLayer1.setCollisionByProperty({ collides: true });
      const wallsLayer2 = map.createLayer("Walls_2", tileset);
      wallsLayer2.setCollisionByProperty({ collides: true });
      // const debugGraphics = this.add.graphics().setAlpha(0.7);
      // wallsLayer1.renderDebug(debugGraphics, {
      // tileColor: null,
      // collidingTileColor: new Phaser.Display.Color(243, 234, 48, 65),
      // faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      // });
      this.physics.add.collider(gameState.Neo, wallsLayer1);
      this.physics.add.collider(gameState.Neo, wallsLayer2)
    } else {
      const tileset = map.addTilesetImage("cave_lvl2", "caveTiles");
      const wallsLayer1 = map.createLayer("A_Layer_Walls", tileset);
      wallsLayer1.setCollisionByProperty({ collides: true });
      this.physics.add.collider(gameState.Neo, wallsLayer1);
    }
    
    //Camera to follow Neo and set to level bounds
    this.cameras.main.setBounds(0, 0, 3200, 1600)
    this.cameras.main.startFollow(gameState.Neo, true, 0.5, 0.5)

    gameState.cursors = this.input.keyboard.createCursorKeys();  
  }

  update() {
     NeoMovment(gameState)
  }
}