bgWalls.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    wallsLayer.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgOne.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgTwo.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgThree.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);
    bgFour.mask = new Phaser.Display.Masks.BitmapMask(this, gameState.spotlight);

    //this animates the gameState.spotlight to flicker
    this.tweens.add({
      targets: gameState.spotlight,
      alpha: 0,
      duration: 2000,
      ease: "Sine.easeInOut",
      loop: -1,
      yoyo: true,
    });