import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      enableBody: true
    }
  },
  scene: playGame
};

const game = new Phaser.Game(config);
// game.scale.pageAlignHorizontally = true;
// game.scale.pageAlignVertically = true;
// game.scale.refresh();

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
