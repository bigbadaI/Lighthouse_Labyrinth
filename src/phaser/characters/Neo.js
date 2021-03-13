export default class NeoClass extends Phaser.GameObjects.Sprite {  
  constructor(scene, x,y , config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.vel = 200;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.gameState.cursors = this.input.keyboard.createCursorKeys();
  } 

  create() {
    this.gameState.Neo = this.physics.add.sprite(500,275, "Neo").setScale(0.2);
    this.gameState.graphics = this.add.graphics({
      x: (gameState.Neo.x - gameState.Neo.width / 2) - 242,
      y: (gameState.Neo.y - gameState.Neo.height / 2) - 16
    })
    .fillStyle(0xffff00, 0.2)
    // .setTexture(Neo, undefined, 1)
    .fillCircle(gameState.Neo.x, gameState.Neo.y, gameState.Neo.width / 15, gameState.Neo.height / 15)

    this.tweens.add({
      targets: gameState.graphics,
      alpha: 0,
      ease: 'Cubic.easeOut',  
      duration: 1000,
      repeat: -1,
      yoyo: true
    })
  }

  update() {
    if (gameState.cursors.left.isDown) {
      gameState.Neo.x -= 5;
      gameState.graphics.x -= 5;
    }
    if (gameState.cursors.right.isDown) {
      gameState.Neo.x += 5;
      gameState.graphics.x += 5;
    }
    if (gameState.cursors.up.isDown) {
      gameState.Neo.y -= 5;
      gameState.graphics.y -= 5;
    }
    if (gameState.cursors.down.isDown) {
      gameState.Neo.y += 5;
      gameState.graphics.y += 5;
    }
  }
}