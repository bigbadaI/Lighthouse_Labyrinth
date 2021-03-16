import Phaser, { Game } from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { config } from "../index";
import { parallaxBackground } from "./helper/backgrounds";

const gameState = {};

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }
    

  // 
  create() {
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
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );

    //camera bound to Neo and set ranges for best viewing
    this.cameras.main.setBounds(0, 0, 3200, 1400)
    this.cameras.main.startFollow(gameState.Neo, true, 0.5, 0.5)

    gameState.cursors = this.input.keyboard.createCursorKeys();

    //Adds collision factors so far just new and wallsLayer
    this.physics.add.collider(gameState.Neo, wallsLayer);

    

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

  const hitTest = {
    contains: function (x,y) {
    
      const hit = gameState.Neo.body.hitTest(x,y);
      if (hit) {
        console.log('you got one!')
        energyCreator.explode()
        //createEnergy3.pause()
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
  
  // gameState.d = this.add.sprite(gameState.Neo.x, gameState.Neo.y, "danger2");
  gameState.timer = this.time.addEvent({
    delay: 150000, //2.5 minutes
    paused: false
  });

  gameState.text = this.add.text(gameState.Neo.x, gameState.Neo.y, '', { fill: "#ffffff", font: 'bold 14px system-ui'})
    // .setShadow(2, 2, 0xFF0000, 8);
  }

  

  update() {
    gameState.text
    .setFill("#ffffff")
    .setText(gameState.timer.getRemainingSeconds().toFixed(1));
    // .setFill(timer.paused ? cssColors.yellow : cssColors.aqua)
    

     NeoMovment(gameState)
     //Conditional to load Level 2
     if (gameState.Neo.y > 1375) {
      this.scene.stop('Level1');
      this.scene.start('Level2');
    }

    function NeoMoves() {
      gameState.d ? gameState.d.destroy() : console.log("doesn't destroy");
      console.log('spotlight interval runs');
      gameState.spotlight.x = gameState.Neo.x;
      gameState.spotlight.y = gameState.Neo.y; 
      gameState.d.x = gameState.Neo.x;
      gameState.d.y = gameState.Neo.y
    }

  }
}