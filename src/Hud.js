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
    
    SetHudMode(mode){
        let modeOut = '';
        switch(mode){
            case 'delta':
                modeOut = '&#x0394';
                break;
            case 'omicron':
                modeOut = '&#x039F';
                break;
            default:
                modeOut = '_';
                break;
        }
        this.getChildByID('hud-mode').innerHTML = 'Flight Mode: '+modeOut;
    }
}