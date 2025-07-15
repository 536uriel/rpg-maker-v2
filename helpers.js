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

export function frame_ivvesabilty_animation(rect){

}

