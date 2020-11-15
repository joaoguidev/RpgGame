"use strict";
import Card from "./player.js";
//const { default: Card } = require("./card");
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let lastTime = 0;
const CANVAS_WIDTH = 800; //px
const CANVAS_HEIGTH = 600; //px

//========================Constructors=========================
let card = new Card();








//==============================Game Loop============================
function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    context.save();
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
    //==========Update and draw stuff in here============
    
    card.draw(context);
    //===================================================
    requestAnimationFrame(gameLoop);
}
gameLoop();
