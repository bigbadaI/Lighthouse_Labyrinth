import Phaser from 'phaser'

const KEY_PHASER_LOGO = 'phaser-logo'
const KEY_BRUSH = 'brush'

/*
this class is illustrative of an alpha mask
will be using this to build the light around neo




*/



export default class RevealMaskScene extends Phaser.Scene
{
	constructor()
	{
		super('reveal-mask')

		// this.isDown = false
		// this.cover = null
		// this.renderTexture = null
	}

	preload()
	{
		this.load.image(KEY_PHASER_LOGO, 'assets/phaser-logo.png')
		// this.load.image(KEY_BRUSH, 'assets/brush.png')
	}

	create()
	{
		const x = 400
		const y = 300

		const reveal = this.add.image(x, y, KEY_PHASER_LOGO)
		this.cover = this.add.image(x, y, KEY_PHASER_LOGO)
		this.cover.setTint(0x4bf542)

		const width = this.cover.width
		const height = this.cover.height

		const rt = this.make.renderTexture({
			width,
			height,
			add: false
		})

		const maskImage = this.make.image({
			x,
			y,
			key: rt.texture.key,
			add: false
		})

		this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
		this.cover.mask.invertAlpha = true

		reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)

    this.light = this.add.circle(0, 0, 30, 0x000000, 1)
		this.light.visible = false

    //below code was for a mouse over pointer
// 		this.cover.setInteractive()
// 		this.cover.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this)
// 		this.cover.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this)
// 		this.cover.on(Phaser.Input.Events.POINTER_UP, () => this.isDown = false)

// 		this.brush = this.make.image({
// 			key: KEY_BRUSH,
// 			add: false
// 		})

// 		this.renderTexture = rt
// 	}

// 	handlePointerDown(pointer)
// 	{
// 		this.isDown = true
// 		this.handlePointerMove(pointer)
// 	}

// 	handlePointerMove(pointer)
// 	{
// 		if (!this.isDown)
// 		{
// 			return
// 		}

// 		const x = pointer.x - this.cover.x + this.cover.width * 0.5
// 		const y = pointer.y - this.cover.y + this.cover.height * 0.5
// 		this.renderTexture.draw(this.brush, x, y)
  }
}