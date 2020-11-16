"use strict";
import Sand from "./terrainTiles/sand.js";
export default class Map {
    constructor(game) {
        this.tileWidth = game.tileWidth;//px
        this.tileHeigth = game.tileHeigth;//px
        this.totalTilesOn_X = game.totalTilesOn_X;//Number of tiles
        this.totalTilesOn_Y = game.totalTilesOn_Y;//Number of tiles
        // this.textures = {
        //     groundTile2Tree: new Image(),
        // }
        
        this.tileType = {
            sand: "sand",
            
        }

        this.mapLayout = [
            ["sand", 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        this.initializeTiles();
    }

    initializeTiles(){
        let currentPosX = 0;
        let currentPosY = 0;
        
        
        
        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++){
            currentPosY = tileCoordenateY * this.tileHeigth;
            
            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
                currentPosX = tileCoordenateX * this.tileWidth;
                console.log(this.mapLayout[tileCoordenateY][tileCoordenateX]);
                switch (this.mapLayout[tileCoordenateY][tileCoordenateX]) {
                    case 1:
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Sand(this, currentPosX, currentPosY, tileCoordenateX, currentPosY);
                        break;
                
                    default:
                        console.log("problem here");
                        break;
                }
            }
        }
        // console.log(this.mapLayout);
    }

    draw(context) {
        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++) {
            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
               this.mapLayout[tileCoordenateY][tileCoordenateX].draw(context);
                //console.log("x:" + currentPosX);
                // switch (this.mapLayout[tileCoordenateY][tileCoordenateX]) {
                //     case 0:
                //         context.drawImage(this.textures.groundTile2Tree, currentPosX, currentPosY,this.tileWidth,this.tileWidth);
                //         break;
                //     case 1:
                //         context.fillStyle='red';
                //         break;
                //     default:
                //         context.fillStyle='black';
                //         break;
                // }
                //context.fillRect(tileCoordenateX * this.tileWidth, 0, 50, 50);
                //context.fillRect(tileCoordenateX * this.tileWidth, tileCoordenateY * this.tileHeigth,this.tileWidth,this.tileHeigth);
            }
        }
    }
    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        if(!deltaTime) {
            return;
        }
    }
}
