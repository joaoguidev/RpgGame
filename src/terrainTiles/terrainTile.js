"use strict";
export default class TerrainTile {
    constructor(map, currentPositionX, currentPositionY, currentCoordinateX, currentCoordinateY) {
        this.tileWidth = map.tileWidth;//px
        this.tileHeigth = map.tileHeigth;//px
        this.totalTilesOn_X = map.totalTilesOn_X;//Number of tiles
        this.totalTilesOn_Y = map.totalTilesOn_Y;//Number of tiles
        this.position = {
            x: currentPositionX,
            y: currentPositionY,
        };
        this.coordinate = {
            x: currentCoordinateX,
            y: currentCoordinateY,
        };

    }

    draw(context) {
        context.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.heigth
        );
    }

    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        if(!deltaTime) {
            return;
        }
    }
}
