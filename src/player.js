"use strict";
export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 25;
        this.heigth = 25;
        this.speed = 55;
        this.health = 100;
        this.damage = 20;
        this.hitSpeed = 2; //One hit each 3 seconds
        this.collisionBox;
        this.hitCoolDown = 0;//Time counter from one hit to the next
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
        this.positionCenter = {
            x: 0,
            y: 0,
        };
        this.coordinate = {
            x: Math.floor(this.position.x/this.tileWidth),
            y: Math.floor(this.position.y/this.tileHeigth),
        };
        this.destination = {
            x: this.tileWidth * 4 + this.width,
            y: this.tileWidth * 9 + this.heigth/2,
        }
        //this.xE = 100;
        // this.yE = 0;
        document.addEventListener("mousedown", event => {
            this.destination.x = event.clientX - (this.mouseCalibration.left + this.width/2);
            this.destination.y = event.clientY - (this.mouseCalibration.top + this.heigth/2);
            // this.xE = event.clientX;
            // this.yE = event.clientY;
        })
    }
//========================draw=========================
    draw(context) {
        context.drawImage(this.texture, 45, 35, 40, 55, this.position.x, this.position.y, this.width, this.heigth);
        context.beginPath();
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y - 5, this.width * (this.health/100), 3);
        context.closePath();
        
        //context.fill(this.collisionBox);
    }

    //========================update=========================
    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        this.positionCenter.x = this.position.x + (this.width/2);
        this.positionCenter.y = this.position.y + (this.width/2);
        this.xE -= deltaTime
       console.log(" Player health: " + this.health + " Enemy health: " + this.game.enemies[3].health );
    //    console.log( "P Cooldown: " + this.xE  +" Player health: " + this.health + " Enemy health: " + this.game.enemies[3].health );
        this.collisionBox = new Path2D();
        this.collisionBox.arc(this.position.x + this.width/2,this.position.y + this.width/2, this.width/2, 0, 2 * Math.PI);  

        if(this.hitCoolDown  > 0 ) {
            this.hitCoolDown -= deltaTime;
            if(this.hitCoolDown < 0){
                this.hitCoolDown = 0;
            }
        }

        if(!deltaTime) {
            return;
        }
        let xDistance = this.destination.x - this.position.x;//Keep track of the distance between player click on the canvas and current position of the player
        let yDistance = this.destination.y - this.position.y;//Keep track of the distance between player click on the canvas and current position of the player
        let xRightLock = false
        let xLeftLock = false
        let yBellowLock = false
        let yAboveLock = false
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
                       
                       for (let i = 0; i < this.game.enemies.length; i++) {
                           if((this.game.enemies[i].distanceFromPlayer <= this.width && this.game.enemies[i].vCollisionNorm.x < 0)){
                                xRightLock = true;
                            } 
                            if(this.game.enemies[i].health <= 0 && this.game.enemies[i].distanceFromPlayer <= this.width){
                                xRightLock = false;
                            }
                    }
                    if(!xRightLock){
                        this.position.x += (deltaTime * this.speed);
                    }
                       
                    }
                }
                if(xDistance < 0){
                    //Get the x coordenate to the left of the player. 
                    let xToTheLeft = Math.floor((this.position.x - 1)/this.tileWidth);
                    //If the tile to the left is walkable keep moving on this axis
                    if(this.mapLayout[this.coordinate.y][xToTheLeft].walkable && this.position.x - 2 > 0){
                        
                        for (let i = 0; i < this.game.enemies.length; i++) {
                            if((this.game.enemies[i].distanceFromPlayer <= this.width && this.game.enemies[i].vCollisionNorm.x > 0)){
                                xLeftLock = true;
                            }
                            if(this.game.enemies[i].health <= 0 && this.game.enemies[i].distanceFromPlayer <= this.width){
                                xLeftLock = false;
                            }
                        }
                        if(!xLeftLock){
                            this.position.x -= (deltaTime * this.speed) ;
                        }
                    }
                }
            }
            if(yDistance !== 0){
                if(yDistance > 0){
                    //Get the y coordenate bellow of the player. 
                    let yToTheDown = Math.floor((this.position.y + this.heigth + 1)/this.tileHeigth);
                    if(this.mapLayout[yToTheDown][this.coordinate.x].walkable && this.position.y + this.heigth + 2 < this.canvasHeigth){
                        
                        for (let i = 0; i < this.game.enemies.length; i++) {
                            if((this.game.enemies[i].distanceFromPlayer <= this.width && this.game.enemies[i].vCollisionNorm.y < 0)){
                                yBellowLock = true;
                            } 
                            if(this.game.enemies[i].health <= 0 && this.game.enemies[i].distanceFromPlayer <= this.width){
                                yBellowLock = false;
                            }
                        }
                        if(!yBellowLock){
                            this.position.y += (deltaTime * this.speed) ;
                        }

                    }
                }
                //Get the y coordenate above of the player. 
                if(yDistance < 0){
                    let yToTheAbove = Math.floor((this.position.y - 1)/this.tileHeigth);
                    if(this.mapLayout[yToTheAbove][this.coordinate.x].walkable && this.position.y - 2 > 0){
                        for (let i = 0; i < this.game.enemies.length; i++) {
                            if((this.game.enemies[i].distanceFromPlayer <= this.width && this.game.enemies[i].vCollisionNorm.y > 0)){
                                yAboveLock = true;
                            }
                            if(this.game.enemies[i].health <= 0){
                                yAboveLock = false;
                            }
                        }
                        if(!yAboveLock){
                            this.position.y -= (deltaTime * this.speed) ;
                        }
                    }
                }
            }
        }
    }
}
