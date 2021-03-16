import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";
import scene2 from "./phaser/scene2";
import LVL1 from "./phaser/scene_lvl1";
import LVL2 from "./phaser/scene_lvl2"
import Preloader from "./phaser/helper/preloader";


console.log("does this show up?")
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

  scene: [playGame, Preloader, LVL1, LVL2, scene2],
  scale: {
    zoom: 1.5
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
