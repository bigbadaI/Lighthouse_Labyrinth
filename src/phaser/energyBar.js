export default class EnergyBar
{
  constructor(x,y, width)
  {
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
    if (!this.leftCap || !this.middle || !this.rightCap)
    {
      return this
    }

    this.middle.displayWidth = this.width
    
    this.leftCap.x = this.x
    this.leftCap.y = this.y

    this.middle.x = this.leftCap.x + this.leftCap.width
    this.middle.y = this.leftCap.y

    this.rightCap.x = this.middle.x + this.middle.displayWidth
    this.rightCap.y = this.middle.y
  }
}