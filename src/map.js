"use strict";
export default class Map {
    constructor(game) {
        this.tileWidth = game.tileWidth;//px
        this.tileHeigth = game.tileHeigth;//px
        this.totalTilesOn_X = game.totalTilesOn_X;//Number of tiles
        this.totalTilesOn_Y = game.totalTilesOn_Y;//Number of tiles
        this.textures = {
            groundTile2Tree: new Image(),
        }
        this.initializeTextures();
        this.mapLayout = [
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }

    initializeTextures(){
        this.textures.groundTile2Tree.src = './textures/Tile/medievalTile_46.png'
    }

    draw(context) {
        let currentPosX = 0;
        let currentPosY = 0;
        //context.drawImage(this.textures.grassNE, currentPosX, currentPosY);
        context.fillStyle='gray';   
        context.fillRect(0,0,this.tileWidth,this.tileHeigth);
          
        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++) {
            currentPosY = tileCoordenateY * this.tileHeigth;
           // console.log("y:" + this.tileWidth);
            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
                currentPosX = tileCoordenateX * this.tileWidth;
                //console.log("x:" + currentPosX);
                switch (this.mapLayout[tileCoordenateY][tileCoordenateX]) {
                    case 0:
                        context.drawImage(this.textures.groundTile2Tree, currentPosX, currentPosY,this.tileWidth,this.tileWidth);
                        break;
                    case 1:
                        context.fillStyle='red';
                        break;
                    default:
                        context.fillStyle='black';
                        break;
                }
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
