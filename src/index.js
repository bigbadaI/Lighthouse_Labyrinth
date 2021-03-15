import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";
import scene2 from "./phaser/scene2";
import LVL1 from "./phaser/scene_lvl1";
<<<<<<< HEAD
import LVL2 from "./phaser/scene_lvl2"
import Preloader from "./phaser/helper/preloader";
import Example from "./phaser/flickeringSpotlightEx";
=======
import Preloader from "./phaser/helper/preloader";


//console.log(App);
>>>>>>> emitter

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

<<<<<<< HEAD
  scene: [Preloader, LVL1, LVL2, playGame, scene2],
=======
  scene: [Preloader, LVL1, playGame, scene2],
>>>>>>> emitter
  scale: {
    zoom: 1.5
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
