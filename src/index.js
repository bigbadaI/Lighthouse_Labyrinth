import Phaser from "phaser";

import ReactDOM from "react-dom";

import playGame from "./phaser/scene";
import scene2 from "./phaser/scene2";
import StartScene from "./phaser/start_scene"
import LVL1 from "./phaser/scene_lvl1";
import LVL2 from "./phaser/scene_lvl2"
import Preloader from "./phaser/helper/preloader";
import InputPanel from "./phaser/inputpanel";
import Starfield from './phaser/starfield';
import Highscore from './phaser/highscores'


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

<<<<<<< HEAD
  scene: [ Starfield, Highscore, InputPanel, Preloader, LVL1, LVL2, playGame, scene2],
=======
  scene: [Preloader, StartScene, LVL1, LVL2, playGame, scene2],
>>>>>>> master
  scale: {
    zoom: 1
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  document.getElementById("root") || document.createElement("div"),
  );

