import Phaser from 'phaser';
import Player from '../Player';
import { WorldLayers } from '../WorldLayers';
import { Hud } from '../Hud';
import { OrderManager } from '../OrderManager';
import { CashManager } from '../CashManager';

export class DemoScene extends Phaser.Scene {
    constructor() {
		super({
			key: 'DemoScene'
        });
	}

	preload() {
        this.load.spritesheet('ship', '../../assets/sprites/anim_ship_spin.png', { frameWidth: 192, frameHeight: 63 });
        this.load.image('landing_gear', '../../assets/sprites/LandingGear.png');
        this.load.image('tiles', '../../assets/sprites/super-mario-tiles.png');
        this.load.tilemapTiledJSON("map", "../../assets/sprites/SuperMarioTiles.json");
        this.load.html('hud', '../../assets/html/hud.html');
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 32*100);
		this.cameras.main.setBounds(this.physics.world.bounds.x, this.physics.world.bounds.y, this.physics.world.bounds.width, this.physics.world.bounds.height);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.InitAnims();

        this.worldLayers = new WorldLayers(this, 'map', 'tiles', ['Background', 'World', 'LandingPads']);
        this.player = new Player({
            scene: this,
            x: 400,
            y: 3000,
            ship: {
                x: 48,
                y: 16,
                asset: 'ship'
            },
            gear: 'gear'
        });
        this.worldLayers.CreateLandingPadLayer(this, 'Test', this.player, this.HitLandingPad.bind(this));
        this.physics.add.collider(this.player, this.worldLayers.layers['World'], this.HitWorld, null, this);
        this.cameras.main.startFollow(this.player, true);

        this.orderManager = new OrderManager(this.worldLayers.objects);
        this.cashManager = new CashManager();
        this.hud = new Hud({scene: this, x: -250, y: 50});
        this.player.Subscribe('flightmodechange', this.hud.SetHudMode, this.hud);
    }

    update() {
        if (this.cursors.left.isDown){
			//this.ConsoleWrite('left');
			this.player.SteerLeft();
		}else if (this.cursors.right.isDown){
			//this.ConsoleWrite('right');
			this.player.SteerRight();
		}else{
			this.player.SteerRelax();
        }
        this.player.Idle();

        if(this.cursors.space.isDown){
			this.player.ToggleFlightMode();
		}
    }

    InitAnims(){
		this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
    }
    
    HitWorld(event){
		//console.log('Hit Ground');
		// //debugger;
        this.scene.restart();
    }
    
    HitLandingPad(event, evtwo){
		if( !this.player.gear.visible || 
			event.body.touching.up || 
			event.body.touching.left || 
			event.body.touching.right
		){
			this.HitWorld();
		}else{
            //this.SetHudPad('Landed: Pad '+evtwo.properties.padnum);
            this.player.Land();
			if( evtwo.properties.padnum === this.orderManager.currentorder ){
				if( this.orderManager.currentorder === 0 ){
                    this.orderManager.ChooseOrderPad();
                    this.hud.SetHudPad(this.orderManager.currentorder);
				}else{
                    this.cashManager.Deposit();
                    this.orderManager.ClearOrderPad();
                    this.hud.SetHudBank(this.cashManager.bank);
                    this.hud.SetHudThanks();
				}
			}
		}
	}
}