import Phaser from "phaser";
import { NeoImg } from "../../assets/Neo";
import _ from "./helper/Neo";
const preloadNeo = _.preloadNeo;
const createNeo = _.createNeo;
const updateNeo = _.updateNeo;
const gameState = {};

class scene2 extends Phaser.Scene {
  constructor(){
		super({ key: 'scene2' })
  }
  preload(){
    //passing in index of scene array
    // preloadNeo(1);
    this.load.crossOrigin = 'anonymous';
    this.load.image("Neo", NeoImg);
  }
  create(){
    createNeo();
  }
  update(){
    updateNeo();
  }
}

export default scene2;