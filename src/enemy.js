"use strict";
export default class Enemy {
    constructor(game, spawnPositionX,spawnPositionY) {
        this.game = game;
        this.width = 25;
        this.heigth = 25;
        this.health = 100;
        this.damage = 10;
        this.collisionBox;
        this.hitSpeed = 2; //One hit each 3 seconds
        this.hitCoolDown = 0;//Time counter from one hit to the next
        this.speed = game.player.speed * 0.5;
        this.tileWidth = game.tileWidth; //px
        this.tileHeigth = game.tileHeigth; //px
        this.mapLayout = game.map.mapLayout;
        this.hearingPower= this.tileWidth * 2;//This is how far the player mst be to alert the enemy. In px.
        this.chasePlayer = false;
        this.canvasWidth = game.canvasWidth;
        this.canvasHeigth = game.canvasHeigth;
        this.texture = new Image();
        this.position = {
            x: spawnPositionX,
            y: spawnPositionY
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
            x: spawnPositionX,
            y: spawnPositionY
        }
        this.gotHit = {
            x: null,
            y: null
        }
        this.distancecollision = Math.floor(Math.hypot(this.game.player.positionCenter.x - this.positionCenter.x, this.game.player.positionCenter.y - this.positionCenter.y ));
        this.vCollisionNorm = {x: (this.game.player.positionCenter.x - this.positionCenter.x) / this.distancecollision, y: (this.game.player.positionCenter.y - this.positionCenter.y) / this.distancecollision};

        this.distanceFromPlayer = Math.hypot(game.player.position.x - this.position.x, game.player.position.y - this.position.y);
       
        document.addEventListener("mousedown", event => {
            this.gotHit.x = event.clientX;
            this.gotHit.y = event.clientY;

        })
    
       this.initialize();
    }
    
    
    initialize(){
    }
    
    //========================draw=========================
    draw(context) {
        if(this.chasePlayer){
            this.texture.src= './textures/Unit/medievalUnit_21.png';
            context.beginPath();
            context.fillStyle = 'red';
            context.fillRect(this.position.x, this.position.y - 5, this.width * (this.health/100), 3);
            context.closePath();
           
        }
        if(this.health <= 0){
            context.save();
            context.translate(this.positionCenter.x, this.positionCenter.y);
            context.rotate(90 * Math.PI / 180);
            context.translate(-this.position.x, -this.position.y);
            context.drawImage(this.texture, 45, 35, 40, 55, this.position.x, this.position.y, this.width, this.heigth);
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.restore();
            this.speed = 0;
            this.health = 0;
            this.damage = 0;
        } else {
            context.drawImage(this.texture, 45, 35, 40, 55, this.position.x, this.position.y, this.width, this.heigth);
        }
        
        if(context.isPointInPath(this.collisionBox, this.gotHit.x, this.gotHit.y)) {
            if(this.game.player.hitCoolDown === 0  && this.distanceFromPlayer <= this.width + 2){
                this.health -= this.game.player.damage;
                this.game.player.hitCoolDown = this.game.player.hitSpeed;
            }
            this.gotHit.x = null;
            this.gotHit.y = null;
        }

        

    }
    
    //========================update=========================
    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime, context){
        if(!deltaTime) {
            return;
        }
        

        //========Cool down after attack=====
        if(this.hitCoolDown  > 0 ) {
            this.hitCoolDown -= deltaTime;
            if(this.hitCoolDown < 0){
                this.hitCoolDown = 0;
            }
        }


       // console.log("Player health: " + this.game.player.health + " Enemy health: " + this.health );

        if(this.distanceFromPlayer <= this.width + 2 && this.hitCoolDown === 0) {
            this.game.player.health -= this.damage;
            this.hitCoolDown = this.hitSpeed;
        }














        this.positionCenter.x = this.position.x + (this.width/2);
        this.positionCenter.y = this.position.y + (this.width/2);

        this.collisionBox = new Path2D();
        this.collisionBox.arc(this.position.x + this.width/2,this.position.y + this.width/2, this.width/2, 0, 2 * Math.PI);  
        

        //Keep track of the distance between player click on the canvas and current position of the player
        let xDistance = this.destination.x - this.position.x;
        let yDistance = this.destination.y - this.position.y;
        this.distancecollision = Math.floor(Math.hypot(this.game.player.positionCenter.x - this.positionCenter.x, this.game.player.positionCenter.y - this.positionCenter.y ));
       // console.log(distancecollision);
        this.vCollisionNorm = {x: (this.game.player.positionCenter.x - this.positionCenter.x) / this.distancecollision, y: (this.game.player.positionCenter.y - this.positionCenter.y) / this.distancecollision};
       // console.log(vCollisionNorm);
        
        //Keeps track of the player distance.
        this.distanceFromPlayer = Math.floor(Math.hypot(this.game.player.position.x - this.position.x, this.game.player.position.y - this.position.y));
        
        //If the enemy gets hearingPower close from the enemy it starts to chase the player
        if( Math.abs(this.distanceFromPlayer) < this.hearingPower){
            this.chasePlayer = true;
        }
        //If enemy was alerted by the player presence it will chace it.
        if(this.chasePlayer){
            this.destination.x = this.game.player.position.x;
            this.destination.y = this.game.player.position.y;
        }
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
                      //  if(!context.isPointInPath(this.collisionBox, this.game.player.position.x + this.game.player.width, this.game.player.position.y)){
                          //   }
                          if(this.distanceFromPlayer > this.width && this.vCollisionNorm.x > 0){
                              this.position.x += (deltaTime * this.speed);
                          }
                        
                    }
                }
                if(xDistance < 0){
                    //Get the x coordenate to the left of the player. 
                    let xToTheLeft = Math.floor((this.position.x - 1)/this.tileWidth);
                    //If the tile to the left is walkable keep moving on this axis
                    if(this.mapLayout[this.coordinate.y][xToTheLeft].walkable && this.position.x - 2 > 0){
                      //  if(!context.isPointInPath(this.collisionBox, this.game.player.position.x, this.game.player.position.y)){
                          //   }
                          if(this.distanceFromPlayer > this.width && this.vCollisionNorm.x < 0){
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
                        if(this.distanceFromPlayer > this.width && this.vCollisionNorm.y > 0){
                            this.position.y += (deltaTime * this.speed) ;
                        }
                    }
                }
                //Get the y coordenate above of the player. 
                if(yDistance < 0){
                    let yToTheAbove = Math.floor((this.position.y - 1)/this.tileHeigth);
                    if(this.mapLayout[yToTheAbove][this.coordinate.x].walkable && this.position.y - 2 > 0){
                        if(this.distanceFromPlayer > this.width && this.vCollisionNorm.y < 0){
                            this.position.y -= (deltaTime * this.speed) ;
                        }
                    }
                }
            }
        }
    }
}
