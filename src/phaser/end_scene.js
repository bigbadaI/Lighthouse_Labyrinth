import Phaser from "phaser";
import BG from "../assets/backgrounds/start_scene.jpg";
const gameState = {};

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

  preload() {
    this.load.image("BG", BG);
  }

  create() {
    this.cameras.main.flash(2000); //can also set a colour flash on the first 
  }

  update() {

  }

}