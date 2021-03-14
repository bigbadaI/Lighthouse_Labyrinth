import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";
import scene2 from "./phaser/scene2";
import LVL1 from "./phaser/scene_lvl1"

import Example from "./phaser/flickeringSpotlightEx"

//console.log(App);

export const config = {
  type: Phaser.AUTO,
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

<<<<<<< HEAD
  scene: [LVL1, playGame, scene2],
=======
  scene: [playGame, scene2, Example],
>>>>>>> master
  scale: {
    zoom: 1.5
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
