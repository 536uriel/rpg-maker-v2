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
        await this.set_ground_sprite();
        await this.set_grass_sprite();
        await this.set_water_sprite();
        try {
            await this.set_player_sprites();

        } catch (error) {
            console.log(err);
        }
        try {
            await this.set_player_sprites2();

        } catch (err) {
            console.log(err);
        }

    }

    async set_ground_sprite() {
        const can_img = await this.loadSprite(SITE_URL + '/assets/sprites.png', 3, 1, this.size_w, this.size_h);
        this.sprites.set('ground', can_img);
    }

    async set_grass_sprite() {
        const can_img = await this.loadSprite(SITE_URL + '/assets/sprites.png', 0, 2, this.size_w, this.size_h);
        this.sprites.set('grass', can_img);
    }

    async set_water_sprite() {
        const can_img = await this.loadSprite(SITE_URL + '/assets/sprites.png', 4, 1, this.size_w, this.size_h);
        this.sprites.set('water', can_img);
    }

    async set_sword_sprite() {
        const sword_img = await this.loadSprite(SITE_URL + "/assets/wepons_16.png", 0, 21, this.size_w, this.size_h);
        this.sprites.set("sword", sword_img);
    }


    async set_player_sprites() {
        //tile size..
        let tsize = 8
        const player_run_1 = await this.loadSprite_preciclly(SITE_URL + '/assets/spr_run_strip8.png',
            5 * tsize - 1, 3 * tsize - 1, tsize * 2 + 2, tsize * 2);

        const player_run_2 = await this.loadSprite_preciclly(SITE_URL + '/assets/spr_run_strip8.png',
            17 * tsize - 1, 3 * tsize - 1, tsize * 2 + 2, tsize * 2);

        const player_run_3 = await this.loadSprite_preciclly(SITE_URL + '/assets/spr_run_strip8.png',
            29 * tsize - 1, 3 * tsize - 1, tsize * 2 + 2, tsize * 2);

        const player_run_4 = await this.loadSprite_preciclly(SITE_URL + '/assets/spr_run_strip8.png',
            41 * tsize, 3 * tsize - 3, tsize * 2, tsize * 2);


        this.sprites.set('1player-run-1', player_run_1);
        this.sprites.set('1player-run-2', player_run_2);
        this.sprites.set('1player-run-3', player_run_3);
        this.sprites.set('1player-run-4', player_run_4);
    }


    async set_player_sprites2() {
        //tile size..
        let tsize = 16
        const space_between = tsize * 30;
        const player_run_1 = await this.loadSprite_preciclly(SITE_URL + '/assets/—Pngtree—sprite sheet of the flash_5268150.png',
            20 * tsize, 15 * tsize, tsize * 42, tsize * 42);

        const player_run_2 = await this.loadSprite_preciclly(SITE_URL + '/assets/—Pngtree—sprite sheet of the flash_5268150.png',
            space_between + (tsize * 42), 15 * tsize, tsize * 42, tsize * 50);

        const player_run_3 = await this.loadSprite_preciclly(SITE_URL + '/assets/—Pngtree—sprite sheet of the flash_5268150.png',
            space_between * 2 + (tsize * 42) * 1.5, 15 * tsize, tsize * 42, tsize * 48);

        const player_run_4 = await this.loadSprite_preciclly(SITE_URL + '/assets/—Pngtree—sprite sheet of the flash_5268150.png',
            20 * tsize, 25 * tsize + (tsize * 42), tsize * 42, tsize * 46);


        this.sprites.set('2player-run-1', player_run_1);
        this.sprites.set('2player-run-2', player_run_2);
        this.sprites.set('2player-run-3', player_run_3);
        this.sprites.set('2player-run-4', player_run_4);
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

    loadSprite_preciclly(src, cut_from_x, cut_from_y,
        tile_size_w, tile_size_h) {
        return new Promise((res, rej) => {
            load_image(50, 50, src).then((img) => {

                let newCanvasElement = document.createElement("canvas");
                newCanvasElement.width = tile_size_w;
                newCanvasElement.height = tile_size_h;
                let temp_ctx = newCanvasElement.getContext("2d");
                temp_ctx.drawImage(img, cut_from_x,
                    cut_from_y, tile_size_w, tile_size_h,
                    0, 0, tile_size_w, tile_size_h);

                res(newCanvasElement);

            });
        })

    }

    loadSprite(src, cut_from_tile_x, cut_from_tile_y, canvas_w, canvas_h,
        tile_size_w = this.tile_size_w, tile_size_h = this.tile_size_h) {
        return new Promise((res, rej) => {
            load_image(50, 50, src).then((img) => {

                let newCanvasElement = document.createElement("canvas");
                newCanvasElement.width = canvas_w;
                newCanvasElement.height = canvas_h;
                let temp_ctx = newCanvasElement.getContext("2d");
                temp_ctx.drawImage(img, cut_from_tile_x * tile_size_w,
                    cut_from_tile_y * tile_size_h, tile_size_w, tile_size_h,
                    0, 0, canvas_w, canvas_h);

                res(newCanvasElement);

            });
        })

    }

}