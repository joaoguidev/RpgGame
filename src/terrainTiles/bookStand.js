"use strict";
import TerrainTile from "./terrainTile.js";

export default class BookStand extends TerrainTile{
    constructor(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY) {
        super(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY)
        this.walkable = false;
        this.interactive = true;
        this.texture = new Image();
        this.texture.src= './textures/Tile/medievalTile_54.png'
        this.gotIt = {
            x: null,
            y: null
        }
        document.addEventListener("mousedown", event => {
            this.gotIt.x = event.clientX;
            this.gotIt.y = event.clientY;

        })
    }

    draw(context) {

        if(context.isPointInPath(this.collisionBox, this.gotIt.x, this.gotIt.y)) {
            
            if(this.terrainReveled){
                this.texture.src= './textures/Tile/medievalTile_53.png'
                this.walkable = true;

            }
            this.gotIt.x = null;
            this.gotIt.y = null;
        } 




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

        this.collisionBox = new Path2D();
        this.collisionBox.rect(this.position.x,this.position.y,this.tileWidth,this.tileHeigth);  
        
    }
}
