import Phaser from "phaser";
import { NeoMovment } from "./helper/movement_functions";
import { pause } from "./helper/pause_functions";
import { applyColourAnimations } from "./helper/colour_shift";
import EnergyBar from "./energyBar"
const gameState = {};
let points = {}

export default class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2' });
  }

  init(data){
    console.log('init', data);
    gameState.backgroundMusic = data.backgroundMusic;
    gameState.energy = data.energy;
    gameState.startTime = data.startTime;
    points = data.points;

  }

  create() {
    //passes in data in object from scene 1
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

    gameState.spotlight1 = this.make.sprite({
      x: 2800,
      y: 25,
      key: "mask",
      add: false,
      scale: 1.5,
    });
    bg1.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);
    bg2.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);
    bg3.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);
    bg4.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight1);


    this.tweens.add({
      targets: gameState.spotlight1,
      alpha: 0,
      duration: 2000,
      ease: "Sine.easeInOut",
      loop: -1,
      yoyo: true,
    });
    gameState.cursors = this.input.keyboard.createCursorKeys(); 
    gameState.shiftAvailable = false;
    gameState.overylay;
    gameState.shakeAvailable = false;
    gameState.currentState = 1; //neo is initially at index of 1
    gameState.paused = false; 
    gameState.twoB = false;

    //Renders Neo
    gameState.Neo = this.physics.add.sprite(2800, 100, "Neo").setScale(0.09);
    gameState.Neo.setFrame(1);
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );

    //variables to store the rendered maps depending on color shift
  
    //Just dummy variable to load the differing layers on level 2. True is normal and false is infa-red
    
    gameState.map = this.make.tilemap({ key: "LVL2" });
      //Renders normal level
      const tileset = gameState.map.addTilesetImage("cave_lvl2", "caveTiles");
      gameState.wallsLayer1 = gameState.map.createLayer("Walls_1", tileset);
      gameState.wallsLayer2 = gameState.map.createLayer("Walls_2", tileset);
      gameState.wallsLayer1.setCollisionByProperty({ collides: true });
      gameState.wallsLayer2.setCollisionByProperty({ collides: true });
  

    gameState.spotlight = this.make.sprite({
      x: 2800,
      y: 25,
      key: "mask",
      add: false,
      scale: 2,
    });


    

    //Adds the spotlightmasking. Couldn't figure out how to modulize this for helper function

    gameState.wallsLayer1.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    gameState.wallsLayer2.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    
    gameState.boom = false;
    this.physics.add.collider(gameState.Neo, gameState.wallsLayer1, () => {
      console.log('you hit a wall!')
      this.cameras.main.shake(100, .01)
      gameState.energy -= 2
      bar.animateToFill(gameState.energy/100)
      const ouch = this.add.image(300, 225, "impact").setAlpha(0.07);
      ouch.setScrollFactor(0);
      if (!gameState.isPlaying)gameState.boom = true;
      setTimeout(() => {
        ouch.destroy();
      }, 2000)
    });
    this.physics.add.collider(gameState.Neo, gameState.wallsLayer2, () => {
      console.log('you hit a wall!')
      this.cameras.main.shake(100, .01)
      gameState.energy -= 1
      bar.animateToFill(gameState.energy/100)
      const ouch = this.add.image(300, 225, "impact").setAlpha(0.07);
      ouch.setScrollFactor(0);
      if (!gameState.isPlaying)gameState.boom = true;
      setTimeout(() => {
        ouch.destroy();
      }, 2000)

    });

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

     //animation for cluster of energy that enables shift abilty for Neo
     this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('shiftEnable', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] }),
      frameRate: 5,
      repeat: -1,
      yoyo: true
    });
    //defining sprite sheet and playing the animation
    gameState.powerUp = this.physics.add.sprite(163, 999, "shiftEnable").setScale(0.3);
    gameState.powerUp.play("rotate");

    this.physics.add.collider(gameState.powerUp, gameState.Neo, () => {
      // gameState.powerUp.destroy();
      this.collided = false
      if (!this.collided) {
        this.collided = true;
        const info = this.add.text(220, 980, 'You collided with stray charged particles\nand have unlocked a new abilty\nPress Shift!\nThe collision alerted a nearby scientist\nHURRY BEFORE YOU ARE CAUGHT\nAND EXPERIMENTED ON FOR LIFE!', { 
          fontSize: '15px', 
          fill: '#FFFFFF', 
          align: "center" 
        });
        setTimeout(() => {
          info.destroy();
        }, 10000)
        gameState.shiftAvailable = true;
      }
    });

    const curveArr = [ 50, 300, 164, 246, 274, 342, 412, 257, 522, 341, 664, 264 ]
    const curve = new Phaser.Curves.Spline(curveArr);
    const particles = this.add.particles('energyBall');
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
    x: 2506,
    y: 785,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest1 }
  });

  const energyCreator2 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 2041,
    y: 400,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest2 }
  });
  const energyCreator3 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 687,
    y: 1195,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest3 }
  });
  const energyCreator4 = particles.createEmitter({
    frame: { cycle: false },
    scale: { start: 0.04, end: 0 },
    blendMode: 'ADD',
    emitZone: { type: 'edge', source:curve, quantity: 350, yoyo: false },
    x: 157,
    y: 279,
    quantity: 1,
    deathZone: { type: 'onEnter', source: hitTest4 }
  });

        //energy bar
        this.fullWidth = 300
        const energyX = 10
        const energyY = 50

        gameState.particlesCollected = 0
        //gameState.energy = 100

        const bar = new EnergyBar(this, energyX,energyY,this.fullWidth)
          .withLeftCap(this.add.image(0,0, 'left-capW').setScrollFactor(0).setAlpha(0.6))
          .withMiddle(this.add.image(0,0, 'middleW').setScrollFactor(0).setAlpha(0.6))
          .withRightCap(this.add.image(0,0, 'right-capW').setScrollFactor(0).setAlpha(0.6))
          .layout()

        bar.reAnimateToFill(gameState.energy/100)
        //below adds outline around energy bar
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.strokeRoundedRect(10, 35, 310, 30, 5).setScrollFactor(0).setAlpha(0.75);

        
  }

  update() {

    const shiftStates = ["ultraviolet", "neoVision", "infrared"];
    pause(gameState);
    NeoMovment(gameState);
    applyColourAnimations(gameState, this.scene.scene, shiftStates);
    //rotates shift powerup sprite
    gameState.powerUp.angle += 1;
    
    //Neo DEATH Statement
    if (gameState.energy <= 0)
      {
        this.physics.pause()
        points.energyAtEnd = gameState.energy < 0 ? 0 : gameState.energy * 750
        points.finalParticlesCollected += gameState.particlesCollected * 50
        points.timeToComplete = Math.floor((new Date - gameState.startTime) / 10)
        console.log("points", points, gameState.energy)
        // this.add.text(100, 100, "You lose, good day sir/madam").setScrollFactor(0)
          this.scene.stop('Level2B');
          this.scene.stop('Level1');
          this.scene.stop('Level2');
          gameState.backgroundMusic.stop()
          this.scene.launch('Highscore', {points}) 
      }
  
    //current change is updated right after animation so has to be one after UV
    if (gameState.twoB) {
      this.scene.sleep("Level2");
      points.energyAtEnd = gameState.energy < 0 ? 0 : gameState.energy
      points.finalParticlesCollected += gameState.particlesCollected * 50
      this.scene.start("Level2B", {
        backgroundMusic: gameState.backgroundMusic,
        energy: gameState.energy,
        startTime: gameState.startTime,
        points,
        current: gameState.currentState
      });
    }

    if (gameState.Neo.y < 5) {
      this.scene.sleep('Level2');
      this.scene.run('Level1');
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

export {
  gameState
}