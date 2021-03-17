import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import StartScene from "./phaser/start_scene"
import LVL1 from "./phaser/scene_lvl1";
import LVL2 from "./phaser/scene_lvl2"
import Preloader from "./phaser/helper/preloader";
import InputPanel from "./phaser/inputpanel";
import Starfield from './phaser/starfield';
import Highscore from './phaser/highscores';
import App from '../src/components/App'


export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },

  scene: [ Preloader, StartScene, LVL1, LVL2, Starfield, Highscore, InputPanel],
  scale: {
    zoom: 1
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div"),
  );

