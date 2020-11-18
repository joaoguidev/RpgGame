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
        this.enemies = [
            new Enemy(this, 50, 80),
            new Enemy(this, 350, 80),
            new Enemy(this, 550, 80),
            new Enemy(this, 500, 500),
            new Enemy(this, 70, 500),
        ]
        //Array of game objects that enables it to be update and drawn looping through it. Just add the object here and it will be updated and drawn.
        this.gameObjects = [this.map, this.player, this.enemies[0], this.enemies[1], this.enemies[2], this.enemies[3], this.enemies[4] ];
        
    }

    update(deltaTime, context) {
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }
    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }


    draw(context) {
        this.gameObjects.forEach((object) => object.draw(context));
    }
}
