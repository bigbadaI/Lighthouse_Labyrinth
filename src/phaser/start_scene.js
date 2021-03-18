import Phaser from "phaser";
import BG from "../assets/backgrounds/start_scene.jpg";
const gameState = {};

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  init(data){
    console.log('init', data);
    gameState.customPipeline = data.customPipeline;
  }

  preload() {
    console.log("load");
    this.load.image("BG", BG);
  }
  create() {

    gameState.customPipeline = this.renderer.pipelines.add('Custom', new CustomPipeline(this));
    gameState.customPipeline.set2f('uResolution', config.width, config.height);

    const sprite = this.add.sprite("BG").setPipeline('Custom');
    sprite.width = 800;
    sprite.height = 600;
    
 

    // this.add.image(300, 200, "BG").setScale(2);
    this.add.text(200, 50, "Click to start!", {
      fill: "#ffffff",
      fontSize: "20px",
    });
   
    this.add.text(15, 300, "A neutrino bound to earth came into contact with a wayward patch of dark\nmatter, thus changing the neutrino forever, and giving it the power of\nconsciousness. With this newfound consciousness, Neo the neutrino fights\nand navigates his way through space to return to his home: the Sun.\nMeanwhile, back on Earth a deranged scientist becomes obsessed with Neo\nand is determined to unravel his existence.", {
      fill: "#ffffff",
      fontSize: "13px"
    });
    this.sound.add("intro", {volume: 0.07}).play(); 

    this.input.on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("Level1");
      this.sound.stopAll();
    });

    
  }

  update() {
    // filter.update(this.input.activePointer);
  }
}
