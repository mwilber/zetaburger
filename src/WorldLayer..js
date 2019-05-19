export class WorldLayer {

    constructor(scene, tileMapKey, spriteSheetKey, layerKeys){
        this.map = scene.make.tilemap({ key: tileMapKey });
		const tileset = this.map.addTilesetImage("Super Mario Tiles", spriteSheetKey);

        this.layers = {};

        for( let layerKey of layerKeys ){
            this.layers[layerKey] = this.map.createStaticLayer(layerKey, tileset, 0, 0);
            this.layers[layerKey].setCollisionByProperty({ collides: true });
        }
        console.log('layers', this.layers);
		//this.backgroundLayer = this.map.createStaticLayer("Background", tileset, 0, 0);
		//this.worldLayer = this.map.createStaticLayer("World", tileset, 0, 0);
		  
		
    }

}