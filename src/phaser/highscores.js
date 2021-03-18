import Phaser from 'phaser';
import rub from '../assets/rub.png';
import end from '../assets/end.png';
import block from '../assets/block.png';
import arcadeXML from '../assets/arcade.xml';
import arcadePNG from '../assets/arcade.png';
const request = require('ajax-request')
const highscoreObj = {}
const points = {}

export default class Highscore extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'Highscore', active: false,
       
     });

      this.playerText;
  }

  init(data){
    console.log('init', data);
    points.points = data.points
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
      this.highScore = this.add.bitmapText(50, 360, 'arcade', `score:${points.points.energyAtEnd + points.points.finalParticlesCollected - points.points.timeToComplete + points.points.scientistTimeRemaining}` )
      highscoreObj.playerText = this.add.bitmapText(405, 360, 'arcade', '').setTint(0xff0000);

      //  Do this, otherwise this Scene will steal all keyboard input
      this.input.keyboard.enabled = false;

      this.scene.launch('InputPanel');
      this.scene.launch('Starfield')

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
        const color = [0xff8200, 0xffff00, 0x00ff00, 0x00bfff]
        const place = ["1ST", "2ND", "3RD", "4TH", "5TH"]
        let ok = JSON.parse(body)
          console.log(ok)
          
        for (const key in ok) {
          if (Object.hasOwnProperty.call(ok, key)) {
            const element = ok[key];
            console.log(element)
            th.add.bitmapText(20, yNum, 'arcade', `${place[placeNum]}   ${element.energy_score}   ${element.username}`).setTint(color[placeNum])
            yNum += 50;
            placeNum += 1;
          }
        }  
    })
  }

      displayScores(this)

      this.add.text(200, 20, "Click to start!", {
        fill: "#ffffff",
        fontSize: "20px",
      });
     
      this.input.on("pointerdown", () => {
        this.scene.stop("Highscore");
        this.scene.stop("Starfield")
        this.scene.start("Preloader");
      });
  }

  updateName (name)
  {
      this.playerText.setText(name);
  }
}