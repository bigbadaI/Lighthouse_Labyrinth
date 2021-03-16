import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { parallaxBackground } from "./helper/backgrounds";
import EnergyBar from "./energyBar"

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
        bar.animateToFill(0.5)
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
    // const leftShadowCap = this.add.image(energyX, energyY, 'left-cap-shadow').setOrigin(0, 0.5)
    // const middleShadowCap = this.add.image(leftShadowCap.energyX + leftShadowCap.width, energyY, 'middle-shadow').setOrigin(0, 0.5)
    // middleShadowCap.displayWidth = this.fullWidth
    // this.add.image(middleShadowCap.energyX + middleShadowCap.displayWidth, energyY, 'right-cap-shadow').setOrigin(0, 0.5)
    // this.leftCap = this.add.image(energyX, energyY, 'left-capW').setOrigin(0, 0.5)
	  // this.middle = this.add.image(this.leftCap.energyX + this.leftCap.width, energyY, 'middleW').setOrigin(0, 0.5)
	  // this.rightCap = this.add.image(this.middle.energyX + this.middle.displayWidth, energyY, 'right-capW').setOrigin(0, 0.5)
	  // this.setMeterPercentage(1)
    // this.setMeterPercentageAnimated(0)

  const bar = new EnergyBar(this, energyX,energyY,this.fullWidth)
    .withLeftCap(this.add.image(0,0, 'left-capW'))
    .withMiddle(this.add.image(0,0, 'middleW'))
    .withRightCap(this.add.image(0,0, 'right-capW'))
    .layout()


  }

  // setMeterPercentage(percent)
  // {
  //   const width = this.fullWidth * percent
  //   this.middle.displayWidth = width
  //   this.rightCap.x = this.middle.x + this.middle.displayWidth
  // }

  // setMeterPercentageAnimated(percent, duration = 1000)
  //   {
  //     const width = this.fullWidth * percent

  //     this.tweens.add({
  //       targets: this.middle,
  //       displayWidth: width,
  //       duration,
  //       ease: Phaser.Math.Easing.Sine.Out,
  //       onUpdate: () => {
  //         this.rightCap.x = this.middle.x + this.middle.displayWidth

  //         this.leftCap.visible = this.middle.displayWidth > 0
  //         this.middle.visible = this.middle.displayWidth > 0
  //         this.rightCap.visible = this.middle.displayWidth > 0
	// 	    }
	//     })
  //   }

  update() {
     NeoMovment(gameState)
     //Conditional to load Level 2
     if (gameState.Neo.y > 1375) {
      this.scene.stop('Level1');
      this.scene.start('Level2');
    }



    function NeoMoves() {
      console.log('spotlight interval runs');
      gameState.spotlight.x = gameState.Neo.x;
      gameState.spotlight.y = gameState.Neo.y;
    
  }

  }
}