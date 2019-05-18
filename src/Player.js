import Phaser from 'phaser';
import ShipSprite from "./sprites/ShipSprite";

export default class Player extends Phaser.GameObjects.Container{
    constructor({ scene, x, y, shipasset, gearasset }){
        super(scene, x, y);

        this.ship = new ShipSprite({
            game: scene,
            x: 0,
            y: 0,
            asset: shipasset
          });

        this.add(this.ship);

        this.setSize(96, 55);
		this.setActive(true);
        this.setScale(0.5);
        scene.physics.world.enable(this, 0);
		this.body.setBounceY(0.2);
		this.body.setGravity(0,-100);
		this.body.setAllowDrag(true);
		this.body.setDrag(70, 70);
		this.body.setFriction(1, 0);
		this.body.setCollideWorldBounds(true);
		//this.player.anims.play('spin', true);
		//scene.physics.add.collider(this.gear, this.worldLayer, this.HitGround, null, this);
    }
}