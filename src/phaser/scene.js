import Phaser from "phaser";
import NeoImg from "../assets/Neo.png";
import pause from "../assets/pause_button.png"
import infrared from "../assets/colourSelector/NeoInfrared.png";
import ultraviolet from "../assets/colourSelector/NeoUltraviolet.png";
import neoVision from "../assets/colourSelector/NeoVision.png";
import caveTiles from "../assets/tiles/mainlev_build.png";
import Map_Example from "../assets/tiles/map_test.json";
import platform from "../assets/platform.png"
const gameState = {};

export default class playGame extends Phaser.Scene {
  constructor() {
    super({ key: 'playGame' });
    // this.light = null
    // this.renderTexture = null
  }
  
  preload() {
    this.load.crossOrigin = "anonymous";
    this.load.image("Neo", NeoImg);
    this.load.image("caveTiles", caveTiles);
    this.load.tilemapTiledJSON("map_example", Map_Example);
    this.load.image("platform", platform)
    this.load.image('mask', 'src/assets/mask1.png');
    this.load.image('ultraviolet', ultraviolet);
    this.load.image('infrared', infrared);
    this.load.image('neoVision', neoVision);
    this.load.image('pause', pause);
  //   this.load.scenePlugin({
  //     key: "IlluminatedJS",
  //     url: "path/to/illuminated.p3.js",
  //     sceneKey: "illuminated"
  // });
  }

  create() {
    //Creates the background and wall layers for example map
    const map = this.make.tilemap({ key: "map_example" });
    const tileset = map.addTilesetImage("cave", "caveTiles");
    const bg = map.createStaticLayer("Background_test", tileset);//bglayer
    const wallsLayer = map.createStaticLayer("Walls", tileset);
    
    wallsLayer.setCollisionByProperty({ collides: true });//why does this set collision and not the collider below?
    //Debug to show collision outlines in the tiles
    const debugGraphics = this.add.graphics().setAlpha(0.7);

    //commented out the yellow wall tire layer, seems like it's only for visualizing the walls?
    // wallsLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 65),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

    gameState.Neo = this.physics.add.sprite(100, 50, "Neo").setScale(0.05);
    
    //Code to reduce Neo hit box size
    gameState.Neo.body.setSize(
      gameState.Neo.width * 0.5,
      gameState.Neo.height * 0.5
    );

    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.shiftAvailable = true;
    gameState.currentState = 0;
    gameState.paused = false;
    
    /* Glowing has disappeared that the moment adding in the map

    gameState.graphics = this.add.graphics({
      x: (gameState.Neo.x - gameState.Neo.width / 2) - 242,
      y: (gameState.Neo.y - gameState.Neo.height / 2) -16
    })
    .fillStyle(0xffff00, 0.2)
    // .setTexture(Neo, undefined, 1)
    .fillCircle(gameState.Neo.x, gameState.Neo.y, gameState.Neo.width / 15, gameState.Neo.height / 15)

    this.tweens.add({
      targets: gameState.graphics,
      alpha: 0,
      ease: 'Cubic.easeOut',  
      duration: 1000,
      repeat: -1,
      yoyo: true
    })
    */
    //lighting attempt with method 3

    //const platform = this.add.sprite(200, 50,'platform')
    gameState.spotlight = this.make.sprite({
      x: 100,
      y: 50,
      key: 'mask',
      add: false
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
    //Adds collision factors so far just new and wallsLayer
    this.physics.add.collider(gameState.Neo, wallsLayer);
  }

  update() {
    if(Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
      gameState.paused = !gameState.paused;
    } 
    if(gameState.paused) return;

    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
      if (!gameState.paused) {
        //add the pause animation here
        const pause = this.add.image(200, 125, "pause");
        this.scene.pause();
        gameState.paused = true;
        console.log("paused");
      } else {
        //remove pause image or animation
        pause.destroy();
        this.scene.resume();
        gameState.paused = false;
        console.log("unpaused");
       }
    }

    //Changed new to use velocity instead of changing location so that he hits walls
    const speed = 50;
    function removeShift () {
      if (gameState.shiftState) {
        gameState.shiftState.destroy();
      }
    } 
    if (gameState.cursors.left.isDown) {
      removeShift();
      if (gameState.cursors.up.isDown) {
        gameState.Neo.setVelocity(-speed, -speed);
      } else if (gameState.cursors.down.isDown) {
        gameState.Neo.setVelocity(-speed, speed);
      }
      gameState.Neo.setVelocityX(-speed);
      NeoMoves();
      // gameState.graphics.x -= 3;
    } else if (gameState.cursors.right.isDown) {
      removeShift();
      if (gameState.cursors.up.isDown) {
        gameState.Neo.setVelocity(speed, -speed);
      } else if (gameState.cursors.down.isDown) {
        gameState.Neo.setVelocity(speed, speed);
      }
      gameState.Neo.setVelocityX(speed);
      NeoMoves();
      if (gameState.Neo.x > 800) {
        this.scene.stop('playGame');
        this.scene.start('scene2');
      }
      // gameState.graphics.x += 3;
    } else if (gameState.cursors.up.isDown) {
      removeShift();
      gameState.Neo.setVelocityY(-speed);
      NeoMoves();
      // gameState.graphics.y -= 3;
    } else if (gameState.cursors.down.isDown) {
      removeShift();
      gameState.Neo.setVelocityY(speed);
      NeoMoves();
      // gameState.graphics.y += 3;
    } else {
      gameState.Neo.setVelocity(0,0);
    }

    if (gameState.shiftAvailable) {
      if (Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)) {
        const shiftStates = ["ultraviolet", "infrared", "neoVision"];
        if (gameState.shiftState) {
          removeShift();
        }
        gameState.shiftState = this.add.image(gameState.Neo.x, gameState.Neo.y + 1, shiftStates[gameState.currentState]).setScale(0.2);
        //implement conditionals for mask...before state is changes...if current === 0 then ultraviolet mask
        gameState.currentState === 2 ? gameState.currentState = 0 : gameState.currentState++;
      }
    }

  
    function NeoMoves() {
        console.log('spotlight interval runs');
        gameState.spotlight.x = gameState.Neo.x;
        gameState.spotlight.y = gameState.Neo.y;
    }

  }

}
