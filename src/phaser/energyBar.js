export default class EnergyBar
{
  constructor(scene, x,y, width)
  {
    this.scene = scene
    this.x = x
    this.y = y
    this.width = width
  }

  withLeftCap(cap)//cap will be a Phaser.GameObjects.Image value
  {
    this.leftCap = cap.setOrigin(0, 0.5)
    return this;
  }

  withMiddle(middle)
  {
    this.middle = middle.setOrigin(0, 0.5)
    return this;
  }

  withRightCap(cap)
  {
    this.rightCap = cap.setOrigin(0, 0.5)
    return this;
  }


  layout() 
  {
    if (this.middle)
    {
      this.middle.displayWidth = this.width
    }

    
    this.layoutSegments()

    return this
  }


  animateToFill(fill, duration = 1000)
  {
    if(!this.middle)
    {
      return
    }

    const percent = Math.max(0, Math.min(1, fill))

    this.scene.tweens.add({
      targets: this.middle,
      displayWidth: this.width * percent,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.layoutSegments()
      }


    }
    )
  }

  layoutSegments()
  {
    if (!this.leftCap || !this.middle || !this.rightCap)
    {
      return this
    }
    
    this.leftCap.x = this.x
    this.leftCap.y = this.y

    this.middle.x = this.leftCap.x + this.leftCap.width
    this.middle.y = this.leftCap.y

    this.rightCap.x = this.middle.x + this.middle.displayWidth
    this.rightCap.y = this.middle.y
  }

}