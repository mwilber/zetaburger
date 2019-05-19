import Phaser from 'phaser';

export class Hud extends Phaser.GameObjects.DOMElement{
    constructor({scene, x, y}){
        super(scene, x, y);
        scene.add.existing(this);
        this.createFromCache('hud');
        this.setScrollFactor(0);
    }
}