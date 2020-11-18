"use strict";
import TerrainTile from "./terrainTile.js";

export default class RoadW extends TerrainTile{
    constructor(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY) {
        super(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY)
        this.walkable = true;
        this.texture = new Image();
        this.texture.src= './textures/Tile/medievalTile_19.png'
    }

    draw(context) {
        if(this.terrainReveled){
            context.drawImage(this.texture, this.position.x, this.position.y, this.tileWidth,this.tileHeigth);
        } else {
            context.beginPath();
            context.fillStyle = 'gray';
            context.fillRect(this.position.x, this.position.y, this.tileWidth, this.tileHeigth);
            context.closePath();
        }
    }

    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        if(!deltaTime) {
            return;
        }
    }
}
