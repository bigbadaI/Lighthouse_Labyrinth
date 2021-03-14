import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";
import scene2 from "./phaser/scene2";

import Example from "./phaser/flickeringSpotlightEx"

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },

  scene: [playGame, scene2, Example],
  scale: {
    zoom: 2
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
