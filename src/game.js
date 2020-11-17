"use strict";
import Player from "./player.js";
import Enemy from "./enemy.js";
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
    }

    start() {
        //========================Game Objects=========================
        this.map = new Map(this);        
        this.player = new Player(this);
        this.enemy = new Enemy(this, this.player, 50, 50);
        //Array of game objects that enables it to be update and drawn looping through it. Just add the object here and it will be updated and drawn.
        this.gameObjects = [this.map, this.player, this.enemy ];
    }

    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }

    draw(context) {
        this.gameObjects.forEach((object) => object.draw(context));
    }
}
