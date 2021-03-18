import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { config } from "../index";
import { pause } from "./helper/pause_functions";
import { applyColourAnimations } from "./helper/colour_shift";
import { parallaxBackground } from "./helper/backgrounds";
import EnergyBar from "./energyBar"


const gameState = {};

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }
    
  // 
  create() {
    gameState.backgroundMusic = this.sound.add("music", {volume: 0.02});
    gameState.backgroundMusic.play();
    // var time = Math.floor(game.time.totalElapsedSeconds() );
    // this.game.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 3);
    // console.log(config.timer);
    // function createTimer() {
    //   this.timeLabel = this.game.add.text(this.game.world.centerX, 100, "00:00", {font: "100px Arial", fill: "#fff"}); 
    //   this.timeLabel.anchor.setTo(0.5, 0);
    //   this.timeLabel.align = 'center';
    // }
    // this.startTime = new Date();
	  // this.totalTime = 120;
	  // this.timeElapsed = 0;
	  // this.createTimer();
	  // this.gameTimer = game.time.events.loop(100, function(){
		// this.updateTimer();
    // });
  
    
    //Creates the Parallax Background
    const width = this.scale.width
    const height = this.scale.height
    const bgOne = this.add.image(0, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bgTwo = this.add.image(width + 360, height, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bgThree = this.add.image(0, height + height + 30, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)
    const bgFour = this.add.image(width + 360, height + height + 30, 'BG1')
    .setOrigin(0, 1)
    .setScrollFactor(0.25)

    gameState.spotlight1 = this.make.sprite({
      x: 300,
      y: 250,
      key: 'mask',
      add: false,
      scale: 1.5
    });

    bgOne.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);
    bgTwo.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);
    bgThree.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);
    bgFour.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);

    this.tweens.add({
      targets: gameState.spotlight1,
      alpha: 0,
      duration: 2000,
      ease: 'Sine.easeInOut',
      loop: -1,
      yoyo: true
  });
    
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

    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.shiftAvailable = false;
    gameState.overylay;
    gameState.shakeAvailable = false;
    gameState.currentState = 0;
    gameState.paused = false;
   
    //Adds collision factors so far just new and wallsLayer
    gameState.boom = false;
    this.physics.add.collider(gameState.Neo, wallsLayer, () => {
      console.log('you hit a wall!');
      this.cameras.main.shake(100, .01);
      gameState.energy -= 0.25;
      bar.animateToFill(gameState.energy/100);
      if (!gameState.isPlaying)gameState.boom = true;
      const ouch = this.add.image(300, 225, "impact");
      ouch.setScrollFactor(0);
      setTimeout(() => {
        ouch.destroy();
      }, 2000)
      if (gameState.energy <= 0)
      {
        this.physics.pause()
        this.add.text(100, 100, "You lose, good day sir/madam").setScrollFactor(0)
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

    bgWalls.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    wallsLayer.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);

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
    gameState.s = false;
    const hitTest = {
      contains: function (x,y) {
        
        const hit = gameState.Neo.body.hitTest(x,y);
        if (hit) {
          console.log('you got one!')
          energyCreator.explode()
          gameState.s = true;
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
      this.scene.sleep('Level1');

      this.scene.start('Level2', { 
        backgroundMusic: gameState.backgroundMusic, 
        energy: gameState.energy
      });

      gameState.Neo.y = 1360
    }

    if (gameState.s) {
      this.sound.add("sparkle", {volume: 0.05}).play();
      gameState.s = false;
    }

    if (gameState.boom) {
      gameState.isPlaying = this.sound.add("wallCollide", {volume: 0.02}).play();
      gameState.boom = false;
      setTimeout(() => {
        gameState.isPlaying = null;
      },1000)
    }
  }
}