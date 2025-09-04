import SITE_URL from "./production-config.js";

export function load_image(w, h, src) {
    let img = new Image(w, h)
    return new Promise((res, rej) => {
        img.src = src;
        img.onload = function () {
            res(img);
        }
    })
}


//define sprite object which contains size and canvas object as image for drawing. 
export class Sprite {
    constructor(tile_size_w = 16, tile_size_h = 16, size_w = 50, size_h = 50) {
        this.tile_size_w = tile_size_w;
        this.tile_size_h = tile_size_h;
        this.size_w = size_w;
        this.size_h = size_h;
        this.sprites = new Map();
    }

    //$this func is mainly for outer class
    async set_sprites() {

        try {

            await load_image(50, 50, SITE_URL + '/assets/sprites.png').then((img) => {

                this.set_ground_sprite(img);
                this.set_grass_sprite(img);
                this.set_water_sprite(img);
                this.set_waterPool_sprite(img);
                this.set_blueHouse_sprite(img);
                this.set_orangeHouse_sprite(img);
                this.set_redHouse_sprite(img);
                this.set_bridge_sprite(img);
                this.set_upstairs_sprite(img);
                this.set_downstairs_sprite(img);
                this.set_blueWall_sprite(img);
                this.set_shelf_sprite(img);
                this.set_floor_sprite(img);

            });

        } catch (err) {
            console.log(err)
        }



        try {

            await load_image(50, 50, SITE_URL + "/assets/wepons_16.png").then((img) => {
                this.set_sword_sprite(img);
            });

        } catch (err) {
            console.log(err)
        }

        try {

            await load_image(50, 50, SITE_URL + '/assets/spr_run_strip8.png').then((img) => {

                this.set_player_sprites(img);

            });

        } catch (err) {
            console.log(err)
        }

        try {

            await load_image(50, 50, SITE_URL + '/assets/PC Computer - Braid - Princess.png').then((img) => {
                this.set_player_sprites3(img);
            });

        } catch (err) {
            console.log(err);
        }



        try {

            await load_image(50, 50, SITE_URL + '/assets/—Pngtree—sprite sheet of the flash_5268150.png'
            ).then((img) => {

                this.set_player_sprites2(img);
            });

        } catch (err) {
            console.log(err)
        }

    }

    set_floor_sprite(img) {
        const floor_sprite = this.loadSprite_preciclly(img, 287, 603, 43, 31);
        this.sprites.set("floor", floor_sprite);
    }

    set_blueWall_sprite(img) {
        const blueWall_sprite = this.loadSprite_preciclly(img, 490, 45, 28, 80);
        this.sprites.set("blueWall", blueWall_sprite);
    }

    set_shelf_sprite(img) {
        const can_img = this.loadSprite(img, 8, 31, this.size_w, this.size_h);
        this.sprites.set('shelf', can_img);
    }

    set_upstairs_sprite(img) {
        const can_img = this.loadSprite(img, 2, 31, this.size_w, this.size_h);
        this.sprites.set('upstairs', can_img);
    }

    set_downstairs_sprite(img) {
        const can_img = this.loadSprite(img, 2, 32, this.size_w, this.size_h);
        this.sprites.set('downstairs', can_img);
    }


    set_waterPool_sprite(img) {

        this.sprites.set('waterPool', []);

        for (let y = 8; y < 12; y++) {
            for (let x = 6; x < 9; x++) {
                const can_img = this.loadSprite(img, x, y, this.size_w, this.size_h);

                let blocks = this.sprites.get('waterPool');
                blocks.push(can_img);
                this.sprites.set('waterPool', blocks);
            }
        }

    }

    set_bridge_sprite(img) {
        const can_img = this.loadSprite(img, 13, 8, this.size_w, this.size_h);
        this.sprites.set('bridge', can_img);
    }

    set_blueHouse_sprite(img) {

        this.sprites.set('blueHouse', []);

        for (let y = 6; y < 8; y++) {
            for (let x = 33; x < 35; x++) {
                const can_img = this.loadSprite(img, x, y, this.size_w, this.size_h);

                let blocks = this.sprites.get('blueHouse');
                blocks.push(can_img);
                this.sprites.set('blueHouse', blocks);
            }
        }

    }

    set_orangeHouse_sprite(img) {

        this.sprites.set('orangeHouse', []);

        for (let y = 6; y < 8; y++) {
            for (let x = 51; x < 53; x++) {
                const can_img = this.loadSprite(img, x, y, this.size_w, this.size_h);

                let blocks = this.sprites.get('orangeHouse');
                blocks.push(can_img);
                this.sprites.set('orangeHouse', blocks);
            }
        }

    }

    set_redHouse_sprite(img) {

        this.sprites.set('redHouse', []);

        for (let y = 16; y < 18; y++) {
            for (let x = 51; x < 53; x++) {
                const can_img = this.loadSprite(img, x, y, this.size_w, this.size_h);

                let blocks = this.sprites.get('redHouse');
                blocks.push(can_img);
                this.sprites.set('redHouse', blocks);
            }
        }

    }

    set_ground_sprite(img) {
        const can_img = this.loadSprite(img, 3, 1, this.size_w, this.size_h);
        this.sprites.set('ground', can_img);
    }

    set_grass_sprite(img) {
        const can_img = this.loadSprite(img, 0, 2, this.size_w, this.size_h);
        this.sprites.set('grass', can_img);
    }

    set_water_sprite(img) {
        const can_img = this.loadSprite(img, 4, 1, this.size_w, this.size_h);
        this.sprites.set('water', can_img);
    }

    set_sword_sprite(img) {
        const sword_img = this.loadSprite(img, 0, 21, this.size_w, this.size_h);
        this.sprites.set("sword", sword_img);
    }


    set_player_sprites(img) {
        //tile size..
        let tsize = 8
        const player_run_1 = this.loadSprite_preciclly(img,
            5 * tsize - 1, 3 * tsize - 1, tsize * 2 + 2, tsize * 2);

        const player_run_2 = this.loadSprite_preciclly(img,
            17 * tsize - 1, 3 * tsize - 1, tsize * 2 + 2, tsize * 2);

        const player_run_3 = this.loadSprite_preciclly(img,
            29 * tsize - 1, 3 * tsize - 1, tsize * 2 + 2, tsize * 2);

        const player_run_4 = this.loadSprite_preciclly(img,
            41 * tsize, 3 * tsize - 3, tsize * 2, tsize * 2);


        this.sprites.set('1player-run-1', player_run_1);
        this.sprites.set('1player-run-2', player_run_2);
        this.sprites.set('1player-run-3', player_run_3);
        this.sprites.set('1player-run-4', player_run_4);
    }




    set_player_sprites2(img) {
        //tile size..
        let tsize = 16
        const space_between = tsize * 30;
        const player_run_1 = this.loadSprite_preciclly(img,
            16 * tsize, 15 * tsize, tsize * 42, tsize * 42);

        const player_run_2 = this.loadSprite_preciclly(img,
            space_between + (tsize * 42), 15 * tsize, tsize * 42, tsize * 50);

        const player_run_3 = this.loadSprite_preciclly(img,
            space_between * 2 + (tsize * 42) * 1.5, 15 * tsize, tsize * 42, tsize * 48);

        const player_run_4 = this.loadSprite_preciclly(img,
            20 * tsize, 25 * tsize + (tsize * 42), tsize * 42, tsize * 46);


        this.sprites.set('2player-run-1', player_run_1);
        this.sprites.set('2player-run-2', player_run_2);
        this.sprites.set('2player-run-3', player_run_3);
        this.sprites.set('2player-run-4', player_run_4);
    }


    set_player_sprites3(img) {


        const player_run_1 = this.loadSprite_preciclly(img,
            970, 160, 120, 140);

        const player_run_2 = this.loadSprite_preciclly(img,
            1090, 160, 120, 140);

        const player_run_3 = this.loadSprite_preciclly(img,
            1220, 160, 120, 140);

        const player_run_4 = this.loadSprite_preciclly(img,
            1350, 160, 120, 140);


        this.sprites.set('3player-run-1', player_run_1);
        this.sprites.set('3player-run-2', player_run_2);
        this.sprites.set('3player-run-3', player_run_3);
        this.sprites.set('3player-run-4', player_run_4);
    }



    //$this func is mainly for outer class
    drawSprite(ctx, sprite_name, tile_x, tile_y) {
        ctx.drawImage(this.sprites.get(sprite_name), tile_x * this.tile_size_w, tile_y * this.tile_size_h,
            this.size_w, this.size_h);
    }

    //$this func is mainly for outer class
    getSpriteAnimation(characterStr, subject, frame_dist, frames_len) {

        //return sprite by frame and distance of subject
        function routeFrames(characterStr, sprites, distance, frame_dist, frames_len) {
            let frame = characterStr + Math.floor((distance / frame_dist) % frames_len + 1);


            if (subject.x <= 0 || subject.y <= 0) {
                frame = characterStr + 1;
            }

            let sprite = new Sprite();
            sprite = sprites.get(frame);
            return sprite;
        }

        //route the frames acording to pos sidtance (and not the actual dist on canvas)
        let dist = Math.abs(subject.pos.x)

        return routeFrames(characterStr, this.sprites, dist, frame_dist, frames_len);
    }

    loadSprite_preciclly(img, cut_from_x, cut_from_y,
        tile_size_w, tile_size_h) {



        let newCanvasElement = document.createElement("canvas");
        newCanvasElement.width = tile_size_w;
        newCanvasElement.height = tile_size_h;
        let temp_ctx = newCanvasElement.getContext("2d");
        temp_ctx.drawImage(img, cut_from_x,
            cut_from_y, tile_size_w, tile_size_h,
            0, 0, tile_size_w, tile_size_h);

        return newCanvasElement;

    }

    loadSprite(img, cut_from_tile_x, cut_from_tile_y, canvas_w, canvas_h,
        tile_size_w = this.tile_size_w, tile_size_h = this.tile_size_h) {


        let newCanvasElement = document.createElement("canvas");
        newCanvasElement.width = canvas_w;
        newCanvasElement.height = canvas_h;
        let temp_ctx = newCanvasElement.getContext("2d");
        temp_ctx.drawImage(img, cut_from_tile_x * tile_size_w,
            cut_from_tile_y * tile_size_h, tile_size_w, tile_size_h,
            0, 0, canvas_w, canvas_h);

        return newCanvasElement;

    }

}