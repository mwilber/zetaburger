import Phaser from 'phaser';

export class Hud extends Phaser.GameObjects.DOMElement{
    constructor({scene, x, y}){
        super(scene, x, y);
        scene.add.existing(this);
        this.createFromCache('hud');
        this.setScrollFactor(0);
    }

    SetHudPad(padNum){
		this.getChildByID('hud-pad').innerHTML = 'Deliver to pad '+padNum;
    }
    
    SetHudThanks(){
        this.getChildByID('hud-pad').innerHTML = 'Thanks!';
    }

	SetHudBank(value){
		this.getChildByID('hud-bank').innerHTML = '$'+String(value);
	}
}