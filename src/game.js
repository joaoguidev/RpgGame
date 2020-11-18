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
        this.gameStates = {
            menu: 0,
            running: 1,
            gameOver: 2,
            finished: 3,
            
        }
        this.currentGameState = this.gameStates.menu;
        document.addEventListener("mousedown", event => {
           if(this.currentGameState === this.gameStates.menu){
                this.currentGameState = this.gameStates.running;
                this.start();
           }
           if(this.currentGameState === this.gameStates.finished){
                alert("To the website")
            }
            if(this.currentGameState === this.gameStates.gameOver){
                location.reload()
            }

        })
    }

    start() {
        //========================Game Objects=========================
        switch (this.currentGameState) {
            case this.gameStates.menu:
                
                break;
        
            case this.gameStates.gameOver:
                return
                break;
            case this.gameStates.finished:
                return
                break;
            default:

                this.map = new Map(this);        
                this.player = new Player(this);
                this.enemies = [
                    new Enemy(this, 50, 80),
                    new Enemy(this, 300, 100),
                    new Enemy(this, 550, 80),
                    new Enemy(this, 500, 500),
                    new Enemy(this, 70, 500),
                ]
                //Array of game objects that enables it to be update and drawn looping through it. Just add the object here and it will be updated and drawn.
                this.gameObjects = [this.map, this.player, this.enemies[0], this.enemies[1], this.enemies[2], this.enemies[3], this.enemies[4] ];
                
                break;
        }

    }

    update(deltaTime) {
        switch (this.currentGameState) {
            case this.gameStates.menu:

                break;
            case this.gameStates.gameOver:
                return
                break;
            case this.gameStates.finished:
                return
                break;
            default:
                this.gameObjects.forEach((object) => object.update(deltaTime));
                break;
        }

    }


    draw(context) {
        switch (this.currentGameState) {
            case this.gameStates.menu:
                context.rect(0, 0, this.canvasWidth, this.canvasWidth);
                context.fillStyle = "black";
                context.fill();
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(
                    "Click To Start The Game",
                    this.canvasWidth/2,
                    this.canvasWidth/2
                  );
                break;
        
            case this.gameStates.gameOver:
                context.rect(0, 0, this.canvasWidth, this.canvasWidth);
                context.fillStyle = "black";
                context.fill();
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(
                    "Game Over! Click to try again",
                    this.canvasWidth/2,
                    this.canvasWidth/2
                  );
                return
                break;
            case this.gameStates.finished:
                context.rect(0, 0, this.canvasWidth, this.canvasWidth);
                context.fillStyle = "black";
                context.fill();
                context.fillStyle = "white";
                context.textAlign = "center";
                context.fillText(
                    "Click to read the collected lenses",
                    this.canvasWidth/2,
                    this.canvasWidth/2
                  );
                return
                break;
            default:
                this.gameObjects.forEach((object) => object.draw(context));
                break;
        }
    }
}
