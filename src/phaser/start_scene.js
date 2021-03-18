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
          uniform float     time;
          uniform vec2      resolution;
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
          void main( void ) {
            vec2 p = gl_FragCoord.xy / resolution  - mouse;

            float a = fract(atan(p.x, p.y) / Tau);
            float d = length(p);

            vec2 coord = vec2(pow(d, shape), a)*256.;
            vec2 delta = vec2(-time*speed*256., .5);
            //vec2 delta = vec2(-time*speed*256., cos(length(p)*10.)*2e0+time*5e-1); // wavy wavy

            float c = 0.;
            for(int i=0; i<3; i++) {
                coord += delta;
                c = max(c, Cell(coord));
            }

            gl_FragColor = vec4(c*d);
          }
           `
          // uniforms: [
          //     'uProjectionMatrix',
          //     'uViewMatrix',
          //     'uModelMatrix',
          //     'uMainSampler',
          //     'uResolution',
          //     'uTime'
          // ]
      });
  }
});

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  // init(data){
  //   console.log('init', data);
  //   gameState.customPipeline = data.customPipeline;
  // }

  preload() {
    this.load.image("BG", BG);
  }
  create() {
    // const sprite = this.add.sprite("BG1");
    // sprite.width = 800;
    // sprite.height = 600;
    // gameState.time = 0;
    this.customPipeline = this.renderer.pipelines.add('Custom', new CustomPipeline(this.game));
    this.customPipeline.set2f('uResolution', this.game.config.width, this.game.config.height);
    this.add.sprite(300, 200, "BG").setScale(2).setPipeline("Custom");
    
    this.add.text(200, 50, "Click to start!", {
      fill: "#ffffff",
      fontSize: "20px",
    });
   
    this.add.text(15, 300, "A neutrino bound to earth came into contact with a wayward patch of dark\nmatter, thus changing the neutrino forever, and giving it the power of\nconsciousness. With this newfound consciousness, Neo the neutrino fights\nand navigates his way through space to return to his home: the Sun.\nMeanwhile, back on Earth a deranged scientist becomes obsessed with Neo\nand is determined to unravel his existence.", {
      fill: "#ffffff",
      fontSize: "13px"
    });
    this.sound.add("intro", {volume: 0.07}).play(); 

    this.input.on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("Level1");
      this.sound.stopAll();
    });

    
  }

  update() {
    // this.customPipeline.set1f('uTime', gameState.time);
    // gameState.time += 0.05;
  }
}
