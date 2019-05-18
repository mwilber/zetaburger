import Phaser from 'phaser';
import ShipSprite from "./sprites/ShipSprite";

export default class Player extends Phaser.GameObjects.Container{
    constructor({ scene, x, y, ship, gear }){
        super(scene, x, y);

        this.ship = new ShipSprite({
            ...ship,
            game: scene
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
        
        scene.add.existing(this);
    }

    SteerLeft(){
        this.body.setAccelerationX(-500);
        this.body.setAccelerationY(-500);
        if(this.angle > -15){
            this.setAngle(this.angle-1);
        }
    }

    SteerRight(){
        this.body.setAccelerationX(500);
        this.body.setAccelerationY(-500);
        if(this.angle < 15){
            this.setAngle(this.angle+1);
        }
    }

    SteerRelax(){
        if(Math.abs(this.angle) < 1){
            this.setAngle(0);
        }else{
            this.setAngle(this.angle*0.7);
        }
        this.body.setAcceleration(0);
    }
}