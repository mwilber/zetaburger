import Phaser from 'phaser';
import ShipSprite from "./sprites/ShipSprite";

export default class Player extends Phaser.GameObjects.Container{
    constructor({ scene, x, y, ship, gear }){
        super(scene, x, y);

        this.FLIGHT_MODES = {
            omicron: 'omicron',
            delta: 'delta',
            landed: 'landed'
        };

        this.flightmode = this.FLIGHT_MODES.omicron;
        this.flightmodehandlers = [];

        this.ship = new ShipSprite({
            ...ship,
            game: scene
          });

        this.gear = scene.add.sprite(48, 66, 'landing_gear');
		this.gear.visible = true;
		this.relax = 0;

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
        if(this.flightmode === this.FLIGHT_MODES.landed){
            this.TakeOff();
        }else{
            this.body.setAccelerationX(-500);
            if(this.flightmode === this.FLIGHT_MODES.delta){
                this.body.setAccelerationY(-500);
                if(this.angle > -15){
                    this.setAngle(this.angle-1);
                }
            }
        }
    }

    SteerRight(){
        if(this.flightmode === this.FLIGHT_MODES.landed){
            this.TakeOff();
        }else{
            this.body.setAccelerationX(500);
            if(this.flightmode === this.FLIGHT_MODES.delta){
                this.body.setAccelerationY(-500);
                if(this.angle < 15){
                    this.setAngle(this.angle+1);
                }
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
        if(this.relax !== 0){
			this.relax = Math.abs(this.relax) - 1;
		}
    }

    RetractGear(){
        this.gear.visible = false;
        this.body.height = 31;
    }

    ExtendGear(){
        this.gear.visible = true;
        this.body.height = 55;
    }

    ChangeFlightMode(newMode){
        if(newMode !== this.flightmode && this.relax === 0){
            this.relax = 10;
            this.flightmode = newMode;
            switch(this.flightmode){
                case this.FLIGHT_MODES.delta:
                    this.RetractGear();
                    break;
                case this.FLIGHT_MODES.omicron:
                    this.ExtendGear();
                    break;
                case this.FLIGHT_MODES.landed:
                    break;
                default:
            }
            this.Publish('flightmodechange', this.flightmode);
        }
    }

    ToggleFlightMode(){
        if(this.flightmode === this.FLIGHT_MODES.delta){
            this.ChangeFlightMode(this.FLIGHT_MODES.omicron);
        }else{
            this.ChangeFlightMode(this.FLIGHT_MODES.delta);
        }
    }

    Land(){
        this.ChangeFlightMode(this.FLIGHT_MODES.landed);
    }

    TakeOff(){
        this.ChangeFlightMode(this.FLIGHT_MODES.delta);
    }

    Subscribe(event, handler, context) {
        if (typeof context === 'undefined') { context = handler; }
        this.flightmodehandlers.push({ event: event, handler: handler.bind(context) });
    }

    Publish(event, args) {
        this.flightmodehandlers.forEach(topic => {
          if (topic.event === event) {
            topic.handler(args)
          }
        })
    }
}