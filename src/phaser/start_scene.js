import Phaser from "phaser";
import BG from "../assets/backgrounds/start_scene.jpg";
const gameState = {};

var CustomPipeline = new Phaser.Class({

  Extends: Phaser.Renderer.WebGL.Pipelines.SinglePipeline,

  initialize:

  function CustomPipeline (game)
  {
      Phaser.Renderer.WebGL.Pipelines.SinglePipeline.call(this, {
          game: game,
          fragShader: `
          precision mediump float;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform sampler2D uMainSampler;
          uniform vec2      mouse;

          const float Tau        = 6.2832;
          const float speed  = .02;
          const float density    = .04;
          const float shape  = .04;


          float random( vec2 seed ) {
            return fract(sin(seed.x+seed.y*1e3)*1e5);
          }
          float Cell(vec2 coord) {
            vec2 cell = fract(coord) * vec2(.5,2.) - vec2(.0,.5);
            return (1.-length(cell*2.-1.))*step(random(floor(coord)),density)*2.;
            }

            void main()
            {
              vec2 p = gl_FragCoord.xy / uResolution  - 0.5;

            float a = fract(atan(p.x, p.y) / Tau);
            float d = length(p);

            vec2 coord = vec2(pow(d, shape), a)*256.;
            vec2 delta = vec2(-uTime*speed*256., .5);
            // vec2 delta = vec2(-uTime*speed*256., cos(length(p)*10.)*2e0+uTime*5e-1); // wavy wavy

            float c = 0.;
            for(int i=0; i<3; i++) {
                coord += delta;
                c = max(c, Cell(coord));
            }

            gl_FragColor = vec4(c*d);
            }  
            `,
            uniforms: [
                'uProjectionMatrix',
                'uViewMatrix',
                'uModelMatrix',
                'uMainSampler',
                'uResolution',
                'uTime'
            ]
      });
  }
});

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("BG", BG);
  }
  create() {
    this.sound.add("intro", {volume: 0.07}).play();
  
    //creating background starfield and attaching it to background image so it encompasses full background
    gameState.time = 0;
    this.customPipeline = this.renderer.pipelines.add('Custom', new CustomPipeline(this.game));
    this.customPipeline.set2f('uResolution', this.game.config.width, this.game.config.height);
    this.add.sprite(300, 200, "BG").setScale(2).setPipeline("Custom");
    
    //Neo animation
    this.add.sprite(300,300, "energyBall").setScale(0.09);

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('darkmatter', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }),
      frameRate: 20,
      repeat: -1,
      yoyo: true
    });
    //defining sprite sheet and playing the animation
    setTimeout(() => {
      gameState.scale = 0.02;
      gameState.dm = this.physics.add.sprite(300, 200, "darkmatter").setScale(gameState.scale);
      gameState.dm.play("rotate");
    }, 3000);
    
    
    //adding text animation
    let line = [];
    let wordIndex = 0;
    let lineIndex = 0;
    let wordDelay = 120;
    let lineDelay = 400;
  
    // this.add.text(200, 50, "Click to start!", {
    //   fill: "#ffffff",
    //   fontSize: "20px",
    // });

    //changes to scene 1
    // this.input.on("pointerdown", () => {
    //   this.scene.stop("StartScene");
    //   this.scene.start("Level1");
    //   this.sound.stopAll();
    // });

    this.label = this.add.text(15, 30, '', {
      fill: "#ffffff",
      fontSize: "13px",
      align: "center"
    });
    this.typewriteText("A neutrino bound to earth comes into contact with a wayward patch of dark\nmatter, thus changing the neutrino forever, and giving it the power of\nconsciousness. With this newfound consciousness, Neo the neutrino must\nfight and navigate his way through the depths of underground earth and\nspace to return to his home: the Sun.\nMeanwhile, back on Earth a deranged scientist becomes obsessed with Neo\nand is determined to unravel his existence.");
  }


  typewriteText(text)
  {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.label.text += text[i]
        ++i
      },
      repeat: length - 1,
      delay: 100
    })
  }

  update() {
    //custom pipeline rendering animation update
    this.customPipeline.set1f('uTime', gameState.time);
    gameState.time += 0.05;
    
    if (gameState.dm) {
      if (gameState.scale < 1.0) {
        gameState.dm.setScale(gameState.scale);
        gameState.scale += 0.001;
      } else {
        //flash effect
        gameState.dm.destroy();
        this.cameras.main.flash();
      }
    }
    
  }
}
