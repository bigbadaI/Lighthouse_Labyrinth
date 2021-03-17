import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { pause } from "./helper/pause_functions";
import { applyColourAnimations } from "./helper/colour_shift";
const gameState = {};

export default class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2' });
  }

  create() {
    //Creates the Parallax Background
    const width = this.scale.width
    const height = this.scale.height
    const bg1 = this.add.image(0, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bg2 = this.add.image(width + 360, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bg3 = this.add.image(0, height + height + 30, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bg4 = this.add.image(width + 360, height + height + 30, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)

    //Renders Neo
    gameState.Neo = this.physics.add.sprite(2800, 25, "Neo").setScale(0.09);
    gameState.Neo.setFrame(1);
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );

    //variables to store the rendered maps depending on color shift
    let wallsLayer1 = ''
    let wallsLayer2 = ''
    //Just dummy variable to load the differing layers on level 2. True is normal and false is infa-red
    let cool = true
    const map = this.make.tilemap({ key: "LVL2" });
    if (cool) {
      //Renders normal level
      const tileset = map.addTilesetImage("cave_lvl2", "caveTiles");
      wallsLayer1 = map.createLayer("Walls_1", tileset);
      wallsLayer2 = map.createLayer("Walls_2", tileset);
    } else {
      //Renders infaredMap
      const tileset = map.addTilesetImage("cave_lvl2", "caveTiles");
      const wallsLayer1 = map.createLayer("A_Layer_Walls", tileset);
    }

    gameState.spotlight = this.make.sprite({
      x: 2800,
      y: 25,
      key: "mask",
      add: false,
      scale: 2,
    });

    //Adds the spotlightmasking. Couldn't figure out how to modulize this for helper function
    wallsLayer1.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    wallsLayer2.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bg1.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bg2.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bg3.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bg4.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    wallsLayer1.setCollisionByProperty({ collides: true });
    wallsLayer2.setCollisionByProperty({ collides: true });
    this.physics.add.collider(gameState.Neo, wallsLayer1);
    this.physics.add.collider(gameState.Neo, wallsLayer2)

    //Renders and fades in and out the spotlight
    this.tweens.add({
      targets: gameState.spotlight,
      alpha: 0,
      duration: 2000,
      ease: "Sine.easeInOut",
      loop: -1,
      yoyo: true,
    });

    
    
    //Camera to follow Neo and set to level bounds
    this.cameras.main.setBounds(0, 0, 3200, 1600)
    this.cameras.main.startFollow(gameState.Neo, true, 0.5, 0.5)

    gameState.cursors = this.input.keyboard.createCursorKeys(); 
    gameState.shiftAvailable = false;
    gameState.overylay;
    gameState.shakeAvailable = false;
    gameState.currentState = 0;
    gameState.paused = false; 

     //animation for cluster of energy that enables shift abilty for Neo
     this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('shiftEnable', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] }),
      frameRate: 5,
      repeat: -1,
      yoyo: true
  });
    //defining sprite sheet and playing the animation
    gameState.powerUp = this.physics.add.sprite(163, 999, "shiftEnable").setScale(0.5);
    gameState.powerUp.play("rotate");

    this.physics.add.collider(gameState.powerUp, gameState.Neo, () => {
      // gameState.powerUp.destroy();
      const info = this.add.text(301, 994, 'POWER UP! PRESS SHIFT', { fontSize: '15px', fill: '#FFFFFF' });
      setTimeout(() => {
        info.destroy();
      }, 5000)
      gameState.shiftAvailable = true;
    });
  }

  update() {
    console.log(gameState.Neo.x, gameState.Neo.y);
    const shiftStates = ["ultraviolet", "neoVision", "infrared"];
    pause(gameState);
    NeoMovment(gameState);
    applyColourAnimations(gameState, this.scene.scene, shiftStates);
    //rotates shift powerup sprite
    gameState.powerUp.angle += 1;
    if (gameState.Neo.y < 5) {
      this.scene.sleep('Level2');
      this.scene.run('Level1');
      gameState.Neo.y = 25
    }}
}