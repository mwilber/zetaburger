export class WorldLayers {

    constructor(scene, tileMapKey, spriteSheetKey, layerKeys){
        this.map = scene.make.tilemap({ key: tileMapKey });
		this.tileset = this.map.addTilesetImage("Super Mario Tiles", spriteSheetKey);

        this.layers = {};
        this.objects = [];

        this.CreateStaticLayers(layerKeys);
    }

    CreateStaticLayers(layerKeys){
        for( let layerKey of layerKeys ){
            this.layers[layerKey] = this.map.createStaticLayer(layerKey, this.tileset, 0, 0);
            this.layers[layerKey].setCollisionByProperty({ collides: true });
        }
    }

    CreateLandingPadLayer(scene, objectLayerKey, playerObj, collisionHandler){
		const objects = this.map.getObjectLayer(objectLayerKey); //find the object layer in the tilemap named 'objects'

		objects.objects.forEach(
			(object) => {
				let tmp = scene.add.rectangle((object.x+(object.width/2)), (object.y+(object.height/2)), object.width, object.height);
				tmp.properties = {};
				// Add pad number property
				for (let property of object.properties) {
					if (property.name === 'padnum') {
					  tmp.properties['padnum'] = property.value;
					  break;
					}
				}
				scene.physics.world.enable(tmp, 1);
				scene.physics.add.collider(playerObj, tmp, collisionHandler, null, this);
				//debugger;
				this.objects.push(tmp);

				// Add pad label
				if(tmp.properties.padnum !== 0){
					let xoffset = (tmp.width*.7);
					if(tmp.x > (this.map.widthInPixels/2)) xoffset = -xoffset;
					scene.add.text((tmp.x-xoffset), (tmp.y-tmp.height), tmp.properties.padnum, { color: '#ffffff', textAlagn: 'center' });
				}
			}
		);
    }

}