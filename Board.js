import Rect from "./Rect.js";

export default class Board {
    constructor(canvas, unitSize) {
        this.w = canvas.width
        this.h = canvas.height
        this.unitSize = unitSize
        this.grid = [];

        //initiate grid:
        for (let y = 0; y < Math.round(this.h / this.unitSize) * 4; y++) {
            this.grid.push([])
            for (let x = 0; x < Math.round(this.w / this.unitSize) * 4; x++) {
                this.grid[y].push([])
            }
        }
    }

    setGrid(x, y, val, playerpos) {
        console.log(val, playerpos)
        this.grid[y][x] = val;
    }

    getVal(x, y) {
        return this.grid[y][x];
    }

    iterateGrid(func) {
        this.grid.forEach(row => {
            row.forEach(col => {

                if (col.x) {
                    func(col);
                }
            })
        })
    }

    getAllSubjectsFromGrid() {
        let rects = []
        this.grid.forEach(row => {
            row.forEach(col => {

                if (col.x) {
                    rects.push(col)
                }
            })
        })

        return rects;
    }

    //create background by the given sprite and positions
    createBackground(sprite, rects, rw, rh, camera, canvas, levelSizeWidth, levelSizeHeight) {

        let backgroundSprite = document.createElement('canvas');
        backgroundSprite.width = levelSizeWidth;
        backgroundSprite.height = levelSizeHeight;
        let ctxBackground = backgroundSprite.getContext('2d');


        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                for (let i = 0; i < rects.length; i++) {
                    if (rects[i][0] == row && rects[i][1] == col) {
                        this.setGrid(col, row, new Rect(col * rw + canvas.width / 2, row * rh + canvas.height / 2, rw, rh, sprite, camera))
                    }
                }
            }
        }

        let draw = () => {
            this.getAllSubjectsFromGrid().forEach(rect => {
                ctxBackground.drawImage(rect.sprite, rect.x, rect.y, rect.w, rect.h)
            })
        }



        return function drawBackground(ctx) {


            //draw object as image
            draw();
            //draw background image on main canvas
            ctx.drawImage(backgroundSprite, -camera.x, camera.y)
        }

    }



}

