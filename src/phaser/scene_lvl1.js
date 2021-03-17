import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { pause } from "./helper/pause_functions";
import { applyColourAnimations } from "./helper/colour_shift";
import { parallaxBackground } from "./helper/backgrounds";
import EnergyBar from "./energyBar"
import FormUtil from "../phaser/inputTextExampleDeleteLater/js/util/formUtil"
import alignGrid from "../phaser/inputTextExampleDeleteLater/js/util/alignGrid"
import align from "../phaser/inputTextExampleDeleteLater/js/util/align"
import renderDeath from "./helper/renderDeath"


const gameState = {};

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }
    
  // 
  create() {
    
    //Creates the Parallax Background
    const width = this.scale.width
    const height = this.scale.height
    const bgOne = this.add.image(0, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bgTwo = this.add.image(width, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bgThree = this.add.image(0, height + height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bgFour = this.add.image(width, height + height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    
    //Loads the Walls and features layers of the level
    const map = this.make.tilemap({ key: "LVL1" });
    const tileset = map.addTilesetImage("lvl1_cave", "caveTiles");
    const bgWalls = map.createLayer("Background_Walls(non-colide)", tileset);
    const wallsLayer = map.createLayer("Walls", tileset);
    wallsLayer.setCollisionByProperty({ collides: true });

    //Renders main character
    gameState.Neo = this.physics.add.sprite(300, 250, "Neo").setScale(0.09);
    gameState.Neo.setFrame(1); //added to select Neo from sprite sheet
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );

    //camera bound to Neo and set ranges for best viewing
    gameState.camBounds = this.cameras.main.setBounds(0, 0, 3200, 1400);
    gameState.camFollow = this.cameras.main.startFollow(gameState.Neo, true, 0.5, 0.5);
  
    // this.tweens.add({
    //     targets: gameState.viewScreen,
    //     x: gameState.viewScreen.x + gameState.Neo.x,
    //     ease: 'Linear',
    //     duration: 1,
    //     delay: 1,
    //     yoyo: false,
    //     repeat: -1
    // });

    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.shiftAvailable = true;
    gameState.overylay;
    gameState.shakeAvailable = false;
    gameState.currentState = 0;
    gameState.paused = false;
   
    //Adds collision factors so far just new and wallsLayer
    this.physics.add.collider(gameState.Neo, wallsLayer, () => {
      console.log('you hit a wall!')
      this.cameras.main.shake(100, .01)
      gameState.energy -= 0.25
      bar.animateToFill(gameState.energy/100)
      if (gameState.energy <= 0)
      {
        this.physics.pause()
        this.add.text(100, 100, "You lose, good day sir/madam").setScrollFactor(0)
        renderDeath();
        //should music stop? or particles? how do you restart the game? display score? what is score made of...?
        //death form input
        // this.formUtil = new FormUtil ({
        //   scene: this,
        //   rows: 11,
        //   cols: 11
        // })
        // this.formUtil.showNumbers();



      }
    });


    //lighting
    //this creates a spotlight
    gameState.spotlight = this.make.sprite({
      x: 300,
      y: 250,
      key: 'mask',
      add: false,
      scale: 2
    });

    //these two mask the walls and some objects so they can be revealed by the gameState.spotlight
    bgWalls.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    wallsLayer.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgOne.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgTwo.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgThree.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgFour.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);

    //this animates the gameState.spotlight to flicker
    this.tweens.add({
        targets: gameState.spotlight,
        alpha: 0,
        duration: 2000,
        ease: 'Sine.easeInOut',
        loop: -1,
        yoyo: true
    });
    
    const curveArr = [ 50, 300, 164, 246, 274, 342, 412, 257, 522, 341, 664, 264 ]
    const curve = new Phaser.Curves.Spline(curveArr);

    const highEnergy = {quantity: 350}
    const medEnergy = {quantity: 425}
    const lowEnergy = {quantity: 500}
    const randomX = Math.floor(Math.random() * 100)
    const randomY = Math.floor(Math.random() * 100)
    const firstEnergy = {x: 0, y: -100}
    const secondEnergy = {x: 0, y: 50}
    const thirdEnergy = {x: 0, y: 200}

    //const particleSpeed = Math.floor(Math.random() * 500) + 270
    const particles = this.add.particles('energyBall');

    
    
    //defines what happens when you collide with a particle
    const hitTest = {
      contains: function (x,y) {
        
        const hit = gameState.Neo.body.hitTest(x,y);
        if (hit) {
          console.log('you got one!')
          energyCreator.explode()
          //createEnergy3.pause()
          gameState.energy += 1
          gameState.particlesCollected += 1
          bar.animateToFill(gameState.energy/100)
        }
        return hit;
      }
    }
    
    const energyCreator = particles.createEmitter({
      frame: { cycle: false },
      scale: { start: 0.04, end: 0 },
      blendMode: 'ADD',
      emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
      x: 10,
      y: 50,
      quantity: 1,
      deathZone: { type: 'onEnter', source: hitTest }
      
    });
    
    //energy bar
    this.fullWidth = 300
    const energyX = 50
    const energyY = 50
    
    gameState.energy = 100
    gameState.particlesCollected = 0
    
    const bar = new EnergyBar(this, energyX,energyY,this.fullWidth)
    .withLeftCap(this.add.image(0,0, 'left-capW').setScrollFactor(0))
    .withMiddle(this.add.image(0,0, 'middleW').setScrollFactor(0))
    .withRightCap(this.add.image(0,0, 'right-capW').setScrollFactor(0))
    .layout()
  }

  update() {
    const shiftStates = ["ultraviolet", "neoVision", "infrared"];
    pause(gameState);
    NeoMovment(gameState);
    applyColourAnimations(gameState, this.scene.scene, shiftStates);

    //Conditional to load Level 2
    if (gameState.Neo.y > 1375) {
      this.scene.stop('Level1');
      this.scene.start('Level2');
    }
  }
}