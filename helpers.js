import Rect from "./Rect.js";

//rotate object in his center
export function rotate_in_center(ctx, rect, deg) {

    //translate the canvas to the center of the rect and rotate by degrees
    ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
    ctx.rotate(deg * Math.PI / 180);
    //return the cnvas to the normal postion
    ctx.translate(-(rect.x + rect.w / 2), -(rect.y + rect.h / 2));
    rect.draw(ctx)

    //rotate the canvas to the normal position...
    ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
    ctx.rotate(-deg * Math.PI / 180);
    ctx.translate(-(rect.x + rect.w / 2), -(rect.y + rect.h / 2));


}

export function set_tracking_object(ob1, ob2, velocity, func) {
    if (ob1.x < ob2.x) {
        ob2.velocity.x = -velocity;
    } else {
        ob2.velocity.x = velocity
    }

    if (ob1.y < ob2.y) {
        ob2.velocity.y = -velocity;
    } else {
        ob2.velocity.y = velocity
    }

    if (func) {
        func(ob1, ob2, velocity);
    }
}

export function dist(ob1, ob2) {
    return Math.sqrt((ob1.x - ob2.x) ^ 2 + (ob1.y - ob2.y) ^ 2);
}

export function createPoolBg(spriteSheet, blockWidth, blockHeight, poolX, poolY, camera, board, player) {
    const sprites = spriteSheet.sprites.get('waterPool');

    poolX = Math.round(poolX / blockWidth);
    poolY = Math.round(poolY / blockHeight);

    if (poolX < 0) {
        poolX = 0
    }

    if (poolY < 0) {
        poolY = 0
    }

    let i = 0;


    for (let y = poolY; y < poolY + 4; y++) {
        for (let x = poolX; x < poolX + 3; x++) {
            board.setGrid(x, y, (new Rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight, sprites[i], camera)), player.pos);

            i++;
        }
    }

}


export function createBlueHouse(spriteSheet, blockWidth, blockHeight, hx, hy, camera, board, player) {
    const sprites = spriteSheet.sprites.get('blueHouse');

    hx = Math.round(hx / blockWidth);
    hy = Math.round(hy / blockHeight);

    if (hx < 0) {
        hx = 0
    }

    if (hy < 0) {
        hy = 0
    }

    let i = 0;


    for (let y = hy; y < hy + 2; y++) {
        for (let x = hx; x < hx + 2; x++) {
            board.setGrid(x, y, (new Rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight, sprites[i], camera)), player.pos);

            i++;
        }
    }

}

