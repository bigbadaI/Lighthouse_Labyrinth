import Phaser from "phaser";
import NeoImg from "../assets/Neo.png";
import caveTiles from "../assets/tiles/mainlev_build.png";
import LVL1 from "../assets/tiles/lvl1.json"
const gameState = {};
import BG1 from "../assets/backgrounds/background3.png"

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }
  
  preload() {
    this.load.crossOrigin = "anonymous";
    this.load.image("Neo", NeoImg);
    this.load.image("caveTiles", caveTiles);
    this.load.tilemapTiledJSON("LVL1", LVL1);
    this.load.image("BG1", BG1)
    this.load.image("BG2")
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
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 65),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });

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
    //Changed new to use velocity instead of changing location so that he hits walls
    const speed = 150;
    if (gameState.cursors.left.isDown) {

      gameState.Neo.setVelocity(-speed, 0);
      // gameState.graphics.x -= 3;
    } else if (gameState.cursors.right.isDown) {
      gameState.Neo.setVelocity(speed, 0);
      // gameState.graphics.x += 3;
    } else if (gameState.cursors.up.isDown) {
      gameState.Neo.setVelocity(0, -speed);
      // gameState.graphics.y -= 3;
    } else if (gameState.cursors.down.isDown) {
      gameState.Neo.setVelocity(0, speed);
      // gameState.graphics.y += 3;

      //Else to stop movement when no longer pressing an arrow key
    } else {
      gameState.Neo.setVelocity(0, 0);

    }
  }

}