"use strict";
export default class Player {
    constructor(game) {
        this.width = 20;
        this.heigth = 20;
        this.position = {
            x: 100,
            y: 100,
        };
        // this.isDragging = false;
        // document.addEventListener("mousedown", event => {
        //     this.position.x = event.clientX;
        //     this.position.y = event.clientY;
        // })
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
        this.position.x += 1/deltaTime;
    }
}
