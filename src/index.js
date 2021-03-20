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
import Neo from "./assets/Neo.png";

var config = {
  type: Phaser.WEBGL,
  width: 600,
  height: 450,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    },
  },
  scene: [Preloader, StartScene, LVL1, LVL2, LVL2B, Starfield, Highscore, InputPanel],
  scale: {
    zoom: 1.5
  }
};

var game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
