"use strict";
export default class Player {
    constructor(game) {
        this.width = 25;
        this.heigth = 25;
        this.speed = 55;

        this.tileWidth = game.tileWidth; //px
        this.tileHeigth = game.tileHeigth; //px
        this.mapLayout = game.map.mapLayout;
        this.canvasWidth = game.canvasWidth;
        this.canvasHeigth = game.canvasHeigth;
        this.texture = new Image();
        this.texture.src= './textures/Unit/medievalUnit_01.png';
        this.mouseCalibration = {
            top: game.canvasPositionOnViewport.top,
            left: game.canvasPositionOnViewport.left,
        }
        this.position = {
            x: this.tileWidth * 4 + this.width,
            y: this.tileWidth * 9 + this.heigth/2,
        };
        this.coordinate = {
            x: Math.floor(this.position.x/this.tileWidth),
            y: Math.floor(this.position.y/this.tileHeigth),
        };
        this.destination = {
            x: this.tileWidth * 4 + this.width,
            y: this.tileWidth * 9 + this.heigth/2,
        }
        document.addEventListener("mousedown", event => {
            this.destination.x = event.clientX - (this.mouseCalibration.left + this.width/2);
            this.destination.y = event.clientY - (this.mouseCalibration.top + this.heigth/2);
        })
    }
//========================draw=========================
    draw(context) {
        // context.drawImage(this.texture, 64,0,   this.position.x, this.position.y, this.width,this.heigth);
        context.drawImage(this.texture, 45, 35, 40, 55, this.position.x, this.position.y, this.width, this.heigth);
    }

    //========================update=========================
    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        
              if(!deltaTime) {
                  return;
              }
        let xDistance = this.destination.x - this.position.x;//Keep track of the distance between player click on the canvas and current position of the player
        let yDistance = this.destination.y - this.position.y;//Keep track of the distance between player click on the canvas and current position of the player
        
        //Based on the player position and how big are the tiles it is possible to extract in what coordinate of the 10x10 grid the player is in
        this.coordinate.x = Math.floor(this.position.x/this.tileWidth);
        this.coordinate.y = Math.floor(this.position.y/this.tileHeigth);

        //If destination is not the same as the current position it means that there are a distance to be traveled. Inside this if the x and y axis are deat separatly like x = left and right and y up and down
        if(this.destination.x !== this.position.x || this.destination.y !== this.position.y){

            if(xDistance !== 0){
                if(xDistance > 0){
                    //Get the x coordenate to the right of the player. 
                    let xToTheRight = Math.floor((this.position.x + this.width + 1)/this.tileWidth); 
                    //If the tile to the right is walkable keep moving on this axis
                    if(this.mapLayout[this.coordinate.y][xToTheRight].walkable && this.position.x + this.width + 2 < this.canvasWidth){
                        this.position.x += (deltaTime * this.speed);
                    }
                }
                if(xDistance < 0){
                    //Get the x coordenate to the left of the player. 
                    let xToTheLeft = Math.floor((this.position.x - 1)/this.tileWidth);
                    //If the tile to the left is walkable keep moving on this axis
                    if(this.mapLayout[this.coordinate.y][xToTheLeft].walkable && this.position.x - 2 > 0){
                        this.position.x -= (deltaTime * this.speed) ;
                    }
                }
            }
            if(yDistance !== 0){
                if(yDistance > 0){
                    //Get the y coordenate bellow of the player. 
                    let yToTheDown = Math.floor((this.position.y + this.heigth + 1)/this.tileHeigth);
                    if(this.mapLayout[yToTheDown][this.coordinate.x].walkable && this.position.y + this.heigth + 2 < this.canvasHeigth){
                        this.position.y += (deltaTime * this.speed) ;
                    }
                }
                //Get the y coordenate above of the player. 
                if(yDistance < 0){
                    let yToTheAbove = Math.floor((this.position.y - 1)/this.tileHeigth);
                    if(this.mapLayout[yToTheAbove][this.coordinate.x].walkable && this.position.y - 2 > 0){
                        this.position.y -= (deltaTime * this.speed) ;
                    }
                }
            }
        }
    }
}
