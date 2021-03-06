"use strict";
import TerrainTile from "./terrainTile.js";

export default class WaterB extends TerrainTile{
    constructor(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY) {
        super(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY)
        this.walkable = false;
        this.texture = new Image();
        this.texture.src= './textures/Tile/medievalTile_28.png'
    }

    draw(context) {
        context.drawImage(this.texture, this.position.x, this.position.y, this.tileWidth,this.tileHeigth);
    }

    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        if(!deltaTime) {
            return;
        }
    }
}
