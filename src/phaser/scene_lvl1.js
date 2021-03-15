import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
const gameState = {};

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level' });
  }

  // 
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
    
    //Loads the Walls and features layers of the level
    const map = this.make.tilemap({ key: "LVL1" });
    const tileset = map.addTilesetImage("lvl1_cave", "caveTiles");
    map.createLayer("Background_Walls(non-colide)", tileset);
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
    gameState.spotlight = this.make.sprite({
      x: 300,
      y: 250,
      key: 'mask',
      add: false,
      scale: 2
    });
    bg.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    wallsLayer.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    this.tweens.add({
        targets: gameState.spotlight,
        alpha: 0,
        duration: 2000,
        ease: 'Sine.easeInOut',
        loop: -1,
        yoyo: true
    });
    //still need to figure out:
    //stop looping the particle...
    //generate multiple particles, or one/two that get reused
    //have particles start/end follow map, or go whole length of map
      //figured out x/y starting positions, can randomize, but not follow camera yet

    //energy emitter
    const curveArr = [ 50, 300, 164, 246, 274, 342, 412, 257, 522, 341, 664, 264 ]
    const curveArr2 = [ 100, 350, 214, 296, 324, 392, 462, 307, 572, 391, 714, 314, 418, 515, 420, 608, 246, 635, 462, 307, 572, 391, 714, 314 ]
    const curve = new Phaser.Curves.Spline(curveArr2);
    //const mappedCurve = curveArr.map(x => x * Math.random())

    //const particleSpeed = Math.floor(Math.random() * 500) + 270
    const particles = this.add.particles('energyBall');

    const createEnergy = particles.createEmitter({
      frame: { cycle: true },
      scale: { start: 0.04, end: 0 },
      blendMode: 'ADD',
      emitZone: { type: 'edge', source: curve, quantity: 275, yoyo: false },
      x: 50,
      y: 50
  });
    
    //createEnergy()
    // createEnergy()
    // createEnergy()
  //createEnergy() {
    //   gameState.particles = this.add.particles('energyBall');
  
    //   gameState.emitter = gameState.particles.createEmitter({
    //     x: {min: 0, max: config.width * 2 },
    //     y: -5,
    //     lifespan: 2000,
    //     speedX: { min:-5, max: -200 },
    //     speedY: { min: 200, max: 400 },
    //     scale: { start: 0.6, end: 0 },
    //     quantity: 10,
    //     blendMode: 'ADD'
    //   })
  
    //   gameState.emitter.setScrollFactor(0);
    // }
  
    //this.createEnergy();
  }

  

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