import Phaser from 'phaser';
import ShipSprite from "./sprites/ShipSprite";

export default class Player extends Phaser.GameObjects.Container{
    constructor({ scene, x, y, ship, gear }){
        super(scene, x, y);

        this.FLIGHT_MODES = {
            omicron: 'omicron',
            delta: 'delta'
        };

        this.flightmode = this.FLIGHT_MODES.omicron;

        this.ship = new ShipSprite({
            ...ship,
            game: scene
          });

        this.gear = scene.add.sprite(48, 66, 'landing_gear');
		this.gear.visible = true;
		this.gear.relax = 0;

        this.add([this.ship, this.gear]);

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
        if(this.flightmode === this.FLIGHT_MODES.delta){
            this.body.setAccelerationY(-500);
            if(this.angle > -15){
                this.setAngle(this.angle-1);
            }
        }
    }

    SteerRight(){
        this.body.setAccelerationX(500);
        if(this.flightmode === this.FLIGHT_MODES.delta){
            this.body.setAccelerationY(-500);
            if(this.angle < 15){
                this.setAngle(this.angle+1);
            }
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

    Idle(){
        if(this.flightmode === this.FLIGHT_MODES.omicron){
            this.body.setAccelerationY(-175);
        }
    }

    SetFlightMode(flightMode){

    }
}