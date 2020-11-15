"use strict";
export default class Map {
    constructor(game) {
        this.tileWidth = game.tileWidth;//px
        this.tileHeigth = game.tileHeigth;//px
        this.totalTilesOn_X = game.totalTilesOn_X;//Number of tiles
        this.totalTilesOn_Y = game.totalTilesOn_Y;//Number of tiles
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

    draw(context) {

        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++) {

            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
                //console.log(this.mapLayout[tileCoordenateY][tileCoordenateX]);
                switch (this.mapLayout[tileCoordenateY][tileCoordenateX]) {
                    case 0:
                        context.fillStyle='blue';
                        break;
                    case 1:
                        context.fillStyle='red';
                        break;
                    default:
                        context.fillStyle='black';
                        break;
                }
                //context.fillRect(tileCoordenateX * this.tileWidth, 0, 50, 50);
                context.fillRect(tileCoordenateX * this.tileWidth, tileCoordenateY * this.tileHeigth,this.tileWidth,this.tileHeigth);
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
