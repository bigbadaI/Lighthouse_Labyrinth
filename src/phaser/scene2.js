import Phaser from "phaser";
import NeoImg from "../assets/Neo.png";
import _ from "./helper/Neo";
const preload = _preload;
const create = _create;
const update = _update;
const gameState = {};

class scene2 extends Phaser.Scene {
  constructor(){
		super({ key: 'scene2' })
  }

  preload();
  create();
  update();
}

export default scene2;