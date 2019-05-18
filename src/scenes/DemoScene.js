import Phaser from 'phaser';
import Player from '../Player';


export class DemoScene extends Phaser.Scene {
    constructor() {
		super({
			key: 'DemoScene'
		});
	}

	preload() {
        this.load.spritesheet('ship', '../../assets/sprites/anim_ship_spin.png', { frameWidth: 192, frameHeight: 63 });
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 32*100);
		this.cameras.main.setBounds(this.physics.world.bounds.x, this.physics.world.bounds.y, this.physics.world.bounds.width, this.physics.world.bounds.height);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.InitAnims();

        this.player = new Player({
            scene: this,
            x: 100,
            y: 100,
            shipasset: 'ship',
            gearasset: 'gear'
          });
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player, true);

        this.player.ship.StartAnimation();
    }

    update() {

    }

    InitAnims(){
		this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
	}
}