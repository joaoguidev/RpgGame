"use strict";
import Player from "./player.js";
import Map from "./map.js";

export default class Game {
    constructor(
        canvasWidth,
        canvasHeigth,
        tileWidth,
        tileHeigth,
        totalTilesOn_X,
        totalTilesOn_Y,
        canvasPositionOnViewport,
    ) {
        this.canvasWidth = canvasWidth;
        this.canvasHeigth = canvasHeigth;
        this.tileWidth = tileWidth; //px
        this.tileHeigth = tileHeigth; //px
        this.totalTilesOn_X = totalTilesOn_X; //Number of tiles
        this.totalTilesOn_Y = totalTilesOn_Y; //Number of tiles
        this.canvasPositionOnViewport = canvasPositionOnViewport;
        this.mapLoaded = true;
    }

    async start() {
        //========================Game Objects=========================
         this.map = await new Map(this);        

        this.player = await new Player(this);
        //Array of game objects that enables it to be update and drawn looping through it. Just add the object here and it will be updated and drawn.
        this.gameObjects = [this.player];
    }

    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }

    draw(context) {
        //if (!this.mapLoaded) {
            this.map.draw(context);
            this.mapLoaded = true;

       // }
        this.gameObjects.forEach((object) => object.draw(context));
    }
}
