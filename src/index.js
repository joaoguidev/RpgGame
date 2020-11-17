"use strict";
/*Sources: 
https://kenney.nl/
https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-smooth-canvas-animation
https://www.youtube.com/channel/UCHpHBzk4fz3oeQ31hmCreGg/videos
https://www.youtube.com/watch?v=3EMxBkqC4z0&t=2079s
*/
import Game from "./game.js";
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let canvasPositionOnViewport = canvas.getBoundingClientRect();
let lastTime = 0;
let deltaTime = 0;
const TILE_WIDTH = 64; //px
const TILE_HEIGTH = 64; //px
const TOTALTILESON_X = 10; //Number of tiles !!!!!!!!!!!!!!!! Rafactor this later !!!!!!
const TOTALTILESON_Y = 10; //Number of tiles !!!!!!!!!!!!!!!!Rafactor this later !!!!!!
const CANVAS_WIDTH = TOTALTILESON_X * TILE_WIDTH; //px
const CANVAS_HEIGTH = TOTALTILESON_Y * TILE_HEIGTH; //px
//Setting the canvas size based on the map size
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGTH;
// window.addEventListener('resize', ()=>{
//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;
// })

//==============================Context Settings============================
context.font = "bold 10pt sans-serif";
//CAUTION!!! Improve quality and sharpness of 'new Image()' on the game. If the hit in performance is too great erase it CAUTION!!! 
context.imageSmoothingEnabled = true;
context.imageSmoothingQuality = 'high';

//==============================Game Start============================
let game = new Game(
    CANVAS_WIDTH,
    CANVAS_HEIGTH,
    TILE_WIDTH,
    TILE_HEIGTH,
    TOTALTILESON_X,
    TOTALTILESON_Y,
    canvasPositionOnViewport,
);
game.start();

//==============================Game Loop============================
function gameLoop(timeStamp) {
    //Clear canvas for current frame
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    //deltaTime: Amount of time elapsed since last frame. It is important to update positions based on the elapsed time.
    deltaTime = (timeStamp - lastTime) / 1000; //In seconds
    lastTime = timeStamp;
    //limit deltatime to 0.1 because if the computer accesssing it is too slow this number will be too large and multiplied by the speed of an object would break the game
    deltaTime = Math.min(deltaTime, 0.1);
    //==========Update and draw the game in here============
    game.update(deltaTime);
    game.draw(context);
    //Loop again
    window.requestAnimationFrame(gameLoop);
}
//Start Game Loop
window.requestAnimationFrame(gameLoop);
