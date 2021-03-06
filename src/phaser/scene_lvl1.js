import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { pause } from "./helper/pause_functions";
import { applyColourAnimations } from "./helper/colour_shift";
import EnergyBar from "./energyBar"


const gameState = {};
const points = {energyAtEnd: 0, timeToComplete: 0, scientistTimeRemaining: 0, finalParticlesCollected: 0};

export default class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1' });
  }
    
  // 
  create() {
    gameState.backgroundMusic = this.sound.add("music", {volume: 0.02});
    gameState.backgroundMusic.play();

    gameState.instruct = this.add.text(230, 430, "Use the arrow keys to move around!", {
      fill: "#ffffff",
      fontSize: "15px",
      align: "center"
    });
  
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
    gameState.currentState = 1;
    gameState.paused = false;
   
    //Adds collision factors so far just new and wallsLayer
    gameState.boom = false;
    this.physics.add.collider(gameState.Neo, wallsLayer, () => {
      console.log('you hit a wall!');
      this.cameras.main.shake(100, .01);
      gameState.energy -= 2;
      bar.animateToFill(gameState.energy/100);
      if (!gameState.isPlaying)gameState.boom = true;
      const ouch = this.add.image(300, 225, "impact").setAlpha(0.07);
      ouch.setScrollFactor(0);
      setTimeout(() => {
        ouch.destroy();
      }, 2000)

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
    const hitTest1 = {
      contains: function (x,y) {
        
        const hit = gameState.Neo.body.hitTest(x,y);
        if (hit) {
          console.log('you got one!')
          energyCreator1.explode()
          gameState.s = true;
          if (gameState.energy <= 100) {
            gameState.energy += 1
          }
          gameState.particlesCollected += 1
          bar.animateToFill(gameState.energy/100)
        }
        return hit;
      }
    }
    const hitTest2 = {
      contains: function (x,y) {
        
        const hit = gameState.Neo.body.hitTest(x,y);
        if (hit) {
          console.log('you got one!')
          energyCreator2.explode()
          gameState.s = true;
          if (gameState.energy <= 100) {
            gameState.energy += 1
          }
          gameState.particlesCollected += 1
          bar.animateToFill(gameState.energy/100)
        }
        return hit;
      }
    }
    const hitTest3 = {
      contains: function (x,y) {
        
        const hit = gameState.Neo.body.hitTest(x,y);
        if (hit) {
          console.log('you got one!')
          energyCreator3.explode()
          gameState.s = true;
          if (gameState.energy <= 100) {
            gameState.energy += 1
          }
          gameState.particlesCollected += 1
          bar.animateToFill(gameState.energy/100)
        }
        return hit;
      }
    }
    const hitTest4 = {
      contains: function (x,y) {
        
        const hit = gameState.Neo.body.hitTest(x,y);
        if (hit) {
          console.log('you got one!')
          energyCreator4.explode()
          gameState.s = true;
          if (gameState.energy <= 100) {
            gameState.energy += 1
          }
          gameState.particlesCollected += 1
          bar.animateToFill(gameState.energy/100)
        }
        return hit;
      }
    }
    
    
  const energyCreator1 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 10,
    y: 50,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest1 }
  });

  const energyCreator2 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 775,
    y: 13,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest2 }
  });
  const energyCreator3 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 2475,
    y: -80,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest3 }
  });
  const energyCreator4 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 1635,
    y: 468,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest4 }
  });
    
    //energy bar
    this.fullWidth = 300
    const energyX = 10
    const energyY = 50
    
    gameState.energy = 100
    gameState.particlesCollected = 0
    gameState.startTime = new Date
    
    const bar = new EnergyBar(this, energyX,energyY,this.fullWidth)
    .withLeftCap(this.add.image(0,0, 'left-capW').setScrollFactor(0).setAlpha(0.6))
    .withMiddle(this.add.image(0,0, 'middleW').setScrollFactor(0).setAlpha(0.6))
    .withRightCap(this.add.image(0,0, 'right-capW').setScrollFactor(0).setAlpha(0.6))
    .layout()

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff, 1);
    //  32px radius on the corners
    graphics.strokeRoundedRect(10, 35, 310, 30, 5).setScrollFactor(0).setAlpha(0.75);

    
  }

  update() {
    
    //Neo DEATH Statement
    if (gameState.energy <= 0)
      {
        this.physics.pause()
        points.energyAtEnd = gameState.energy < 0 ? 0 : gameState.energy * 750
        points.finalParticlesCollected += gameState.particlesCollected * 50
        points.timeToComplete = Math.floor((new Date - gameState.startTime) / 50)
          this.scene.stop('Level2B');
          this.scene.stop('Level1');
          this.scene.stop('Level2');
          gameState.backgroundMusic.stop()
          this.scene.launch('Highscore', {points}) 
      }

    const shiftStates = ["ultraviolet", "neoVision", "infrared"];
    pause(gameState);
    NeoMovment(gameState);
    applyColourAnimations(gameState, this.scene.scene, shiftStates);

    //Conditional to load Level 2
    if (gameState.Neo.y > 1375) {
      this.scene.sleep('Level1');
      points.energyAtEnd = gameState.energy < 0 ? 0 : gameState.energy * 100
      points.finalParticlesCollected += gameState.particlesCollected * 50
      this.scene.start('Level2', { 
        backgroundMusic: gameState.backgroundMusic, 
        energy: gameState.energy,
        startTime: gameState.startTime,
        points
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