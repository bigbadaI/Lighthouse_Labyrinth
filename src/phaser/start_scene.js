import Phaser from "phaser";
import BG from "../assets/backgrounds/start_scene.jpg";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }
  preload() {
    this.load.image("BG", BG);
  }
  create() {
    this.add.image(300, 200, "BG").setScale(2);
    this.add.text(200, 50, "Click to start!", {
      fill: "#ffffff",
      fontSize: "20px",
    });
   
    this.add.text(15, 300, "A neutrino bound to earth came into contact with a wayward patch of dark\nmatter, thus changing the neutrino forever, and giving it the power of\nconsciousness. With this newfound consciousness, Neo the neutrino fights\nand navigates his way through space to return to his home: the Sun.\nMeanwhile, back on Earth a deranged scientist becomes obsessed with Neo\nand is determined to unravel his existence.", {
      fill: "#ffffff",
      fontSize: "13px"
    });
    this.input.on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("Level1");
    });
  }
}
