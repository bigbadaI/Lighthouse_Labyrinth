import Phaser from "phaser";
import BG from "../assets/backgrounds/start_scene.jpg";
const gameState = {};
let follower;
let path;
let graphics;

const CustomPipeline = new Phaser.Class({

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
        
            // vec2 delta = vec2(-uTime*speed*256., .5);
            vec2 delta = vec2(-uTime*speed*256., cos(length(p)*10.)*2e0+uTime*5e-1); // wavy wavy

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

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  init(data) {
    points = data.points;
  }

  preload() {
    this.load.image("BG", BG);
  }

  create() {
    this.cameras.main.flash(2000); //can also set a colour flash on the first
    //creating background starfield and attaching it to background image so it encompasses full background
    gameState.time = 0;
    this.customPipeline = this.renderer.pipelines.add('Custom', new CustomPipeline(this.game));
    this.customPipeline.set2f('uResolution', this.game.config.width, this.game.config.height);
    gameState.BG = this.add.sprite(300, 200, "BG").setScale(2).setPipeline("Custom"); 

    //Neo animation
    gameState.scale = 0.8;
    gameState.currentState = 1;
    gameState.overlay = null;
    gameState.Neo = this.physics.add.sprite(300, 200, "Neo").setScale(gameState.scale);
    gameState.Neo.setFrame(gameState.currentState);
    //every 5 seconds neos state changes
    setInterval(() => {
      gameState.currentState === 2? gameState.currentState = 0 : gameState.currentState++;
    }, 5000)

    graphics = this.add.graphics();
    follower = { t: 0, vec: new Phaser.Math.Vector2() };
    path = new Phaser.Curves.Path();
    path.add(new Phaser.Curves.Ellipse(300, 200, 100));

    this.tweens.add({
        targets: follower,
        t: 1,
        duration: 4000,
        yoyo: false,
        repeat: -1
    });
  }

  update() {
    //custom pipeline rendering animation update
    this.customPipeline.set1f('uTime', gameState.time);
    gameState.time += 0.05;

    graphics.clear();
    path.getPoint(follower.t, follower.vec);
    gameState.Neo.x = follower.vec.x;
    gameState.Neo.y = follower.vec.y;
   
    if (gameState.Neo) {
      //while Neo is still visible shrink it
      if (gameState.scale > 0) {
        gameState.Neo.setScale(gameState.scale);
        gameState.scale -= 0.001;
        gameState.Neo.y -= 0.001;

        //updates Neo frame and overlay
        gameState.Neo.setFrame(gameState.currentState);
        if (gameState.currentState === 0) {
          if (gameState.overlay) gameState.overlay.destroy();
          gameState.overlay = this.add.image(225, 300, "purpOverlay");
        } else if (gameState.currentState === 2) {
          if (gameState.overlay) gameState.overlay.destroy();
          gameState.overlay = this.add.image(225, 300, "redOverlay");
        } else {
          if (gameState.overlay) gameState.overlay.destroy();
        }
      }
    }


    if (gameState.scale <= 0) {
      gameState.overlay.destroy();
      //EndB
      this.scene.stop('EndScene');
      this.scene.launch('EndB', {points});
    }
    
  }

}