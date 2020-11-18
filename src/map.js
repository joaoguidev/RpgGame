"use strict";
import Sand from "./terrainTiles/sand.js"
import BookStand from "./terrainTiles/bookStand.js"
import Dirt from "./terrainTiles/dirt.js"
import ForestDense from "./terrainTiles/forestDense.js"
import ForestLight from "./terrainTiles/forestLight.js"
import Grass from "./terrainTiles/grass.js"
import Pavement from "./terrainTiles/pavement.js"
import RoadE from "./terrainTiles/roadE.js"
import RoadES from "./terrainTiles/roadES.js"
import RoadN from "./terrainTiles/roadN.js"
import RoadNE from "./terrainTiles/roadNE.js"
import RoadNS from "./terrainTiles/roadNS.js"
import RoadNSE from "./terrainTiles/roadNSE.js"
import RoadNSW from "./terrainTiles/roadNSW.js"
import RoadNSWE from "./terrainTiles/roadNSWE.js"
import RoadNW from "./terrainTiles/roadNW.js"
import RoadNWE from "./terrainTiles/roadNWE.js"
import RoadS from "./terrainTiles/roadS.js"
import RoadW from "./terrainTiles/roadW.js"
import RoadWE from "./terrainTiles/roadWE.js"
import RoadWES from "./terrainTiles/roadWES.js"
import RoadWS from "./terrainTiles/roadWS.js"
import WaterA from "./terrainTiles/waterA.js"
import WaterB from "./terrainTiles/waterB.js"
import CampFire from "./terrainTiles/campFire.js"
import BookStandEmpty from "./terrainTiles/bookStandEmpty.js"
import Wood from "./terrainTiles/wood.js"
import Rock from "./terrainTiles/rock.js"

export default class Map {
    constructor(game) {
        this.game = game;
        this.tileWidth = game.tileWidth;//px
        this.tileHeigth = game.tileHeigth;//px
        this.totalTilesOn_X = game.totalTilesOn_X;//Number of tiles
        this.totalTilesOn_Y = game.totalTilesOn_Y;//Number of tiles

        //this section works as a enum in order to be used to designate the tiles and objcts available to be placed mapLayout 
        this.tileType = {
            bookStand:"bookStand",
            bookStandEmpty:"bookStandEmpty",
            dirt:"dirt",
            forestDense:"forestDense",
            forestLight:"forestLight",
            grass:"grass",
            pavement:"pavement",
            roadE:"roadE",
            roadES:"roadES",
            roadN:"roadN",
            roadNE:"roadNE",
            roadNS:"roadNS",
            roadNSE:"roadNSE",
            roadNSW:"roadNSW",
            roadNSWE:"roadNSWE",
            roadNW:"roadNW",
            roadNWE:"roadNWE",
            roadS:"roadS",
            roadW:"roadW",
            roadWE:"roadWE",
            roadWES:"roadWES",
            roadWS:"roadWS",
            sand:"sand",
            waterA:"waterA",
            waterB:"waterB",
            campFire:"campFire",
            wood:"wood",
            rock:"rock",
        }

        //This is where the map is drawn. Changing the tyleType here changes it on the map
        this.mapLayout = [
            [this.tileType.roadS , this.tileType.bookStand, this.tileType.grass, this.tileType.forestDense, this.tileType.grass, this.tileType.bookStand, this.tileType.roadS, this.tileType.forestDense, this.tileType.bookStand, this.tileType.roadS], 
            [this.tileType.roadNS , this.tileType.grass, this.tileType.grass, this.tileType.forestDense, this.tileType.grass, this.tileType.grass, this.tileType.roadNS, this.tileType.forestDense, this.tileType.grass, this.tileType.roadNS], 
            [this.tileType.roadNE , this.tileType.roadWE, this.tileType.roadWS, this.tileType.forestLight, this.tileType.grass, this.tileType.roadES, this.tileType.roadNW, this.tileType.forestDense, this.tileType.grass, this.tileType.roadNS], 
            [this.tileType.grass , this.tileType.grass, this.tileType.roadNS, this.tileType.rock, this.tileType.forestLight, this.tileType.roadNS, this.tileType.forestLight, this.tileType.wood, this.tileType.grass, this.tileType.roadNS], 
            [this.tileType.forestLight , this.tileType.grass, this.tileType.roadNSE, this.tileType.roadWE, this.tileType.roadWE, this.tileType.roadNSWE, this.tileType.roadWE, this.tileType.roadWE, this.tileType.roadWE, this.tileType.roadNW], 
            [this.tileType.forestDense , this.tileType.forestLight, this.tileType.roadNS, this.tileType.forestLight, this.tileType.forestLight, this.tileType.roadNS, this.tileType.forestLight, this.tileType.forestDense, this.tileType.forestLight, this.tileType.grass], 
            [this.tileType.grass , this.tileType.grass, this.tileType.roadNS, this.tileType.forestDense, this.tileType.roadES, this.tileType.roadNWE, this.tileType.roadWE, this.tileType.roadWS, this.tileType.forestDense, this.tileType.forestDense], 
            [this.tileType.grass , this.tileType.roadES, this.tileType.roadNW, this.tileType.forestDense, this.tileType.roadNS, this.tileType.grass, this.tileType.forestLight, this.tileType.roadNE, this.tileType.roadWE, this.tileType.roadWS], 
            [this.tileType.grass , this.tileType.roadNS, this.tileType.grass, this.tileType.forestDense, this.tileType.roadNS, this.tileType.grass, this.tileType.forestDense, this.tileType.grass, this.tileType.grass, this.tileType.roadNS], 
            [this.tileType.bookStand , this.tileType.roadN, this.tileType.grass, this.tileType.forestDense, this.tileType.roadN, this.tileType.forestLight, this.tileType.forestDense, this.tileType.grass, this.tileType.bookStand, this.tileType.roadN], 
        ];
        this.initializeTiles();
    }

    initializeTiles(){
        let currentPosX = 0;
        let currentPosY = 0;
        
        //This is used to build the map object taking in consideration the tile types assigned on the mapLayout above
        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++){
            currentPosY = tileCoordenateY * this.tileHeigth;
            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
                currentPosX = tileCoordenateX * this.tileWidth;
                switch (this.mapLayout[tileCoordenateY][tileCoordenateX]) {
                    case "bookStand":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new BookStand(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "dirt":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Dirt(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "forestDense":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new ForestDense(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "forestLight":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new ForestLight(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "grass":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Grass(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "pavement":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Pavement(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadE":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadE(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadES":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadES(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadN":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadN(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNE":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNE(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNS":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNS(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNSE":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNSE(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNSW":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNSW(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNSWE":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNSWE(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNW":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNW(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadNWE":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadNWE(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadS":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadS(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadW":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadW(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadWE":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadWE(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadWES":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadWES(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "roadWS":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new RoadWS(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "sand":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Sand(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "waterA":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new WaterA(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "waterB":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new WaterB(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "campFire":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new CampFire(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "bookStandEmpty":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new BookStandEmpty(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "wood":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Wood(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    case "rock":
                        this.mapLayout[tileCoordenateY][tileCoordenateX] = new Rock(this, currentPosX, currentPosY, tileCoordenateX, tileCoordenateY);
                        break;
                    default:
                        console.log("problem here");
                        break;
                }
            }
        }
    }

    draw(context) {

        //Go through all tiles and draw it
        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++) {
            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
               this.mapLayout[tileCoordenateY][tileCoordenateX].draw(context);
            }
        }
    }
    //Update the position taking in consideration the elapsed time since the last frame. This makes the movement coherent with processing in different speeds. 
    update(deltaTime){
        if(!deltaTime) {
            return;
        }
        //Go through all tiles and update it
        for (let tileCoordenateY = 0; tileCoordenateY < this.totalTilesOn_Y; tileCoordenateY++) {
            for (let tileCoordenateX = 0; tileCoordenateX < this.totalTilesOn_X; tileCoordenateX++) {
               this.mapLayout[tileCoordenateY][tileCoordenateX].update(deltaTime);
            }
        }
    }
}
