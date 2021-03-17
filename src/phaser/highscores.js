import Phaser from 'phaser';
import rub from '../assets/rub.png';
import end from '../assets/end.png';
import block from '../assets/block.png';
import arcadeXML from '../assets/arcade.xml';
import arcadePNG from '../assets/arcade.png';


export default class Highscore extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'Highscore', active: true,
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
     });

      this.playerText;
  }

  preload ()
  {
      this.load.image('block', block);
      this.load.image('rub', rub);
      this.load.image('end', end);

      this.load.bitmapFont('arcade', arcadePNG, arcadeXML);
  }

  create ()
  {
      this.add.bitmapText(100, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
      this.add.bitmapText(100, 310, 'arcade', '1ST   50000').setTint(0xff0000);

      this.playerText = this.add.bitmapText(580, 310, 'arcade', '').setTint(0xff0000);

      //  Do this, otherwise this Scene will steal all keyboard input
      this.input.keyboard.enabled = false;

      this.scene.launch('InputPanel');

      let panel = this.scene.get('InputPanel');

      //  Listen to events from the Input Panel scene
      panel.events.on('updateName', this.updateName, this);
      panel.events.on('submitName', this.submitName, this);
      this.add.text(200, 50, "Click to start!", {
        fill: "#ffffff",
        fontSize: "20px",
      });
     
      this.input.on("pointerdown", () => {
        this.scene.stop("Highscores");
        this.scene.stop("InputPanel")
        this.scene.stop("Starfield")
        this.scene.start("Preloader");
      });
  }

  submitName ()
  {
      this.scene.stop('InputPanel');

      this.add.bitmapText(100, 360, 'arcade', '2ND   40000    ANT').setTint(0xff8200);
      this.add.bitmapText(100, 410, 'arcade', '3RD   30000    .-.').setTint(0xffff00);
      this.add.bitmapText(100, 460, 'arcade', '4TH   20000    BOB').setTint(0x00ff00);
      this.add.bitmapText(100, 510, 'arcade', '5TH   10000    ZIK').setTint(0x00bfff);
  }

  updateName (name)
  {
      this.playerText.setText(name);
  }
  // if(buttonGameRestart){
  //   buttonGameRestart.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     console.log('restart');
  //     this.scene.restart();
  //   });
  // }

}