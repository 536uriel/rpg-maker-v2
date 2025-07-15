export default class Rect {
    constructor(x, y, w, h, sprite, camera) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.sprite = sprite
        this.camera = camera;
        this.pos = {
            x:this.x,
            y:this.y
        }
    }


    get t() {
        return this.y;
    }

    get l() {
        return this.x;
    }

    get r() {
        return this.x + this.w;
    }

    get b() {
        return this.y + this.h;
    }

    set t(v) {
        this.y = v;
    }

    set l(v) {
        this.x = v;
    }

    set r(v) {
        this.x = v - this.w;
    }

    set b(v) {
        this.y = v - this.h;
    }







    get tp() {
        return this.pos.y;
    }

    get lp() {
        return this.pos.x;
    }

    get rp() {
        return this.pos.x + this.w;
    }

    get bp() {
        return this.pos.y + this.h;
    }

    set tp(v) {
        this.pos.y = v;
    }

    set lp(v) {
        this.pos.x = v;
    }

    set rp(v) {
        this.pos.x = v - this.w;
    }

    set bp(v) {
        this.pos.y = v - this.h;
    }

    draw(ctx, camera) {

        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h)

    }

    draw_preciclly_sprite(ctx, sprite) {
        ctx.drawImage(sprite, this.x, this.y, this.w, this.h)
    }
}