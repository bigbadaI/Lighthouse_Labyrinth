class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {}
    create() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        this.formUtil.showNumbers();
        //
        //
        //
        this.formUtil.scaleToGameW("myText", .3);
        this.formUtil.placeElementAt(16, 'myText', true);
        //
        //
        //
        this.formUtil.scaleToGameW("area51", .8);
        this.formUtil.scaleToGameH("area51", .5);
        this.formUtil.placeElementAt(60, "area51", true, true);
        this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);
        //
        //
        //
    }
    textAreaChanged() {
    	var text=this.formUtil.getTextAreaValue("area51");
    	console.log(text);
    }
    update() {}
}