"use strict";
import Game from "./game.js";
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let lastTime = 0;
const TILE_WIDTH = 40;//px
const TILE_HEIGTH = 40;//px
const TOTALTILESON_X = 10;//Number of tiles !!!!!!!!!!!!!!!!
const TOTALTILESON_Y = 10;//Number of tiles !!!!!!!!!!!!!!!!
const CANVAS_WIDTH = TOTALTILESON_X * TILE_WIDTH; //px
const CANVAS_HEIGTH = TOTALTILESON_Y * TILE_HEIGTH; //px
//Setting the canvas size based on the map size
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGTH;

var currentSecond = 0, frameCount = 0, framesLastSecond = 0;//scsddddsfdsefwaefasdvSdvsadvsagsgsafgd
context.font = "bold 10pt sans-serif";


let game = new Game(CANVAS_WIDTH, CANVAS_HEIGTH, TILE_WIDTH, TILE_HEIGTH, TOTALTILESON_X, TOTALTILESON_Y);


game.start();




//==============================Game Loop============================
function gameLoop(timeStamp) {
    var sec = Math.floor(Date.now()/1000);
    if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }
    //Clear canvas for current frame
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    //deltaTime: Amount of time elapsed since last frame. It is important to update positions based on the elapsed time.
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    //==========Update and draw the game in here============
    game.update(deltaTime);
    game.draw(context);

    //===================================================


    context.fillStyle = "green";
	context.fillText("FPS: " + framesLastSecond, 10, 20);
    window.requestAnimationFrame(gameLoop);
}
//Start Game Loop
window.requestAnimationFrame(gameLoop);
