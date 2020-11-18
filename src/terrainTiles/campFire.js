"use strict";
import TerrainTile from "./terrainTile.js";

export default class CampFire extends TerrainTile {
    constructor(
        map,
        currentPositionX,
        currentPositionY,
        currentCoordinateX,
        currentCoordinateY
    ) {
        super(
            map,
            currentPositionX,
            currentPositionY,
            currentCoordinateX,
            currentCoordinateY
        );
        this.walkable = false;
        this.texture = new Image();
        this.texture.src = "./textures/Environment/medievalEnvironment_20.png";
        this.textureBackground = new Image();
        this.textureBackground.src = "./textures/Tile/medievalTile_58.png";
        this.textureSmokeFrameArr = [];
        this.smokeFrameSpeed = 5;
        this.smokeFrame = 0;
        this.initialize();

        setInterval(() => {
            if (this.smokeFrame > 23) {
                this.smokeFrame = 0;
            } else {
                this.smokeFrame++;
            }
        }, 5000);
    }
    initialize() {
    //     for (let i = 0; i < 25; i++) {
    //         let textureSmoke = new Image();
    //         textureSmoke.src = "./textures/Black_smoke/blackSmoke" + i + ".png";
    //         this.textureSmokeFrameArr[i] = textureSmoke;
    //     }
    }

    draw(context) {
        context.drawImage(
            this.textureBackground,
            this.position.x,
            this.position.y,
            this.tileWidth,
            this.tileHeigth
        );
        context.drawImage(
            this.texture,
            this.position.x,
            this.position.y,
            this.tileWidth,
            this.tileHeigth
        );
        context.drawImage(
            this.textureSmokeFrameArr[this.smokeFrame],
            this.position.x,
            this.position.y,
            this.tileWidth,
            this.tileHeigth
        );
    }

    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds.
    update(deltaTime) {
        if (!deltaTime) {
            return;
        }
        //console.log(deltaTime * this.smokeFrameSpeed);
        // if(this.timeToFrame > 3){
        //     this.timeToFrame = 0;
        //     if(this.frame > 23){
        //         this.frame=0;
        //     } else {
        //         this.frame++
        //     }
        // }
        // this.timeToFrame++;
    }
}
