import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import StartScene from "./phaser/start_scene"
import LVL1 from "./phaser/scene_lvl1";
import LVL2 from "./phaser/scene_lvl2";
import LVL2B from "./phaser/scene_lvl2B";
import Preloader from "./phaser/helper/preloader";
import InputPanel from "./phaser/inputpanel";
import Starfield from './phaser/starfield';
import Highscore from './phaser/highscores';



export const config = {
  // type: Phaser.AUTO,
  type: Phaser.WEBGL,
  parent: "phaser",
  width: 600,
  height: 450,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },

  scene: [Preloader, StartScene, LVL1, LVL2, LVL2B],
  // Starfield, Highscore, InputPanel,
  scale: {
    zoom: 1.5
  }
};

const CustomPipeline = new Phaser.Class({

  Extends: Phaser.Renderer.WebGL.Pipelines.SinglePipeline,

  initialize:

  function CustomPipeline (game)
  {
      Phaser.Renderer.WebGL.Pipelines.SinglePipeline.call(game, {
          game: game,
          fragShader: `
          precision mediump float;

          uniform sampler2D uMainSampler;
          uniform vec2 uResolution;
          uniform float uTime;

          varying vec2 outTexCoord;
          varying vec4 outTint;

          vec4 plasma()
          {
              vec2 pixelPos = gl_FragCoord.xy / uResolution * 20.0;
              float freq = 0.8;
              float value =
                  sin(uTime + pixelPos.x * freq) +
                  sin(uTime + pixelPos.y * freq) +
                  sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                  cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);

              return vec4(
                  cos(value),
                  sin(value),
                  sin(value * 3.14 * 2.0),
                  cos(value)
              );
          }

          void main()
          {
              vec4 texture = texture2D(uMainSampler, outTexCoord);

              texture *= vec4(outTint.rgb * outTint.a, outTint.a);

              gl_FragColor = texture * plasma();
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

const game = new Phaser.Game({ config, CustomPipeline });



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
