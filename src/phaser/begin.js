import Phaser from "phaser";
import bg from "../assets/backgrounds/nasa.jpg";
const gameState = {};

export default class Begin extends Phaser.Scene {
  constructor() {
    super({ key: 'Begin' });
  }

  preload() {
    this.load.image("bg", bg);
  }
    
  create() {
    const intro = this.sound.add("intro", {volume: 0.07}).play();
    this.add.image(300, 250, "bg").setScale(0.3);

    this.add.text(235, 100, "Click to begin...", {
      align: "center",
      fontSize: "15px",
      fill: "#ffffff",
    })

    gameState.muted = this.input.keyboard.addKey('M');
    gameState.P = this.input.keyboard.addKey('P');
    gameState.paused = false;

    this.input.on("pointerdown", () => {
      this.scene.start("StartScene", {sound: intro, muted});
      this.scene.remove("Begin");
    });
  }

  update() {
    // if (Phaser.Input.Keyboard.JustDown(gameState.R)) { 
    //     console.log("unpaused");
    //     gameState.p? gameState.p.destroy() : null;
    //     this.scene.resume();
    // gameState.p = this.add.image(300, 250, "pause");
    //     console.log("paused");
    //     this.scene.pause();
    //     return;
    // }
    // if (Phaser.Input.Keyboard.JustDown(gameState.P)) {
    //     !gameState.paused ? //run pause scene: null
    // }
  

    if (Phaser.Input.Keyboard.JustDown(gameState.muted)) { 
      this.game.sound.mute? this.game.sound.mute = false : this.game.sound.mute = true;
    }
  }
}