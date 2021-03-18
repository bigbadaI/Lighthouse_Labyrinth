import Phaser from 'phaser';
import rub from '../assets/rub.png';
import end from '../assets/end.png';
import block from '../assets/block.png';
import arcadeXML from '../assets/arcade.xml';
import arcadePNG from '../assets/arcade.png';
const request = require('ajax-request')
const highscoreObj = {}

// const users = {
//   1: {
//     username: "Ho7Sho7",
//     energy_score: 225,
//     time_elasped: 120
//   },
//   2: {
//     username: "BIGboy",
//     energy_score: 333,
//     time_elasped: 150
//   },
//   3: {
//     username: "Uwin",
//     energy_score: 500,
//     time_elasped: 250
//   },
//   4: {
//     username: "LabRUNER",
//     energy_score: 400,
//     time_elasped: 90
//   },
//   5: {
//     username: "IRock",
//     energy_score: 400,
//     time_elasped: 90
//   }
// }


export default class Highscore extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'Highscore', active: false,
       
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
      // this.add.bitmapText(20, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
      // this.add.bitmapText(20, 310, 'arcade', '1ST   50000').setTint(0xff0000);

      this.playerText = this.add.bitmapText(405, 360, 'arcade', '').setTint(0xff0000);
      highscoreObj.playerText = this.add.bitmapText(405, 360, 'arcade', '').setTint(0xff0000);

      //  Do this, otherwise this Scene will steal all keyboard input
      this.input.keyboard.enabled = false;

      this.scene.launch('InputPanel');

      let panel = this.scene.get('InputPanel');

      //  Listen to events from the Input Panel scene
      panel.events.on('updateName', this.updateName, this);
      panel.events.on('submitName', this.submitName, this);

      
      
  }

  submitName ()
  {
      this.scene.stop('InputPanel');
      this.add.bitmapText(20, 50, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);

      request({
        url: `http://localhose:3000/highscores/${highscoreObj.playerText}`,
        method: 'POST'
      }, function(err, res, body) {
      })

      function displayScores(th) {
      request({
        url: "http://localhost:3000/highscores",
        method: "GET"
      }, function(err, res, body) {
        console.log(res, "======BODY======", body)
        let yNum = 100
        let placeNum = 0
        const place = ["1ST", "2ND", "3RD", "4TH", "5TH"]
        let ok = JSON.parse(body)
          console.log(ok)
          
        for (const key in ok) {
          if (Object.hasOwnProperty.call(ok, key)) {
            const element = ok[key];
            console.log(element)
            th.add.bitmapText(20, yNum, 'arcade', `${place[placeNum]}   ${element.energy_score}   ${element.username}`).setTint(0xff8200)
            yNum += 50;
            placeNum += 1;
          }
        }
        
    
        
      
    })
  }

      displayScores(this)
      // this.add.bitmapText(20, 360, 'arcade', '2ND   40000    ANT').setTint(0xff8200);
      // this.add.bitmapText(20, 410, 'arcade', '3RD   30000    .-.').setTint(0xffff00);
      // this.add.bitmapText(20, 460, 'arcade', '4TH   20000    BOB').setTint(0x00ff00);
      // this.add.bitmapText(20, 510, 'arcade', '5TH   10000    ZIK').setTint(0x00bfff);

      this.add.text(200, 20, "Click to start!", {
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

  updateName (name)
  {
      this.playerText.setText(name);
  }
}