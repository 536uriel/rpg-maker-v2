// checks overlapping objects
export function overlap(subject, rect) {
    return subject.bp > rect.t
        && subject.tp < rect.b
        && subject.rp > rect.l
        && subject.lp < rect.r;
}

/* Iterate over all obstables that overlap subject and execute the function. */
export function intersection(subject, obstacles, fn) {

    obstacles.filter(obstacle => {
        return overlap(subject, obstacle)
    }).forEach(fn);
}


export function stopMoveWhenCollide(subject, obstacles, x, y, camera, canvas, sprite) {


    subject.pos.x += x

    const water = sprite.sprites.get('water');
    const bridge = sprite.sprites.get('bridge');
    const upstairs = sprite.sprites.get("upstairs");
    const downstairs = sprite.sprites.get("downstairs");



    intersection(subject, obstacles, obstacle => {

        if (obstacle.sprite != water && obstacle.sprite != bridge && obstacle.sprite != upstairs && obstacle.sprite != downstairs) {
            //if subject move to right
            if (x > 0) {

                if (subject.rp > obstacle.lp) {
                    //תקן לסוף השמאל
                    subject.rp = obstacle.lp;
                }

            } else if (x < 0) {
                //תקן לסוף הימין
                subject.lp = obstacle.rp;
            }
        }

    });


    subject.pos.y += y

    intersection(subject, obstacles, obstacle => {

        if (obstacle.sprite != water && obstacle.sprite != bridge && obstacle.sprite != upstairs && obstacle.sprite != downstairs) {

            if (y > 0) {

                if (subject.bp > obstacle.tp) {
                    //תקן לסוף הלמעלה
                    subject.bp = obstacle.tp;
                    subject.jump = false;
                }

            } else if (y < 0) {
                if (subject.tp < obstacle.bp) {
                    //תקן לסוף הלמטה
                    subject.tp = obstacle.bp;
                }
            }
        }

    });

    camera.x = subject.pos.x - canvas.width / 2;
    camera.y = -(subject.pos.y - canvas.height / 2);
}


export function stopNpcsMoveWhenCollide(subject, obstacles, x, y, sprite) {


    subject.pos.x += x

    const water = sprite.sprites.get('water');
    const bridge = sprite.sprites.get('bridge');
    const upstairs = sprite.sprites.get("upstairs");
    const downstairs = sprite.sprites.get("downstairs");

    intersection(subject, obstacles, obstacle => {

        if (obstacle.sprite != water && obstacle.sprite != bridge && obstacle.sprite != upstairs && obstacle.sprite != downstairs) {
            //if subject move to right
            if (x > 0) {

                if (subject.rp > obstacle.lp) {
                    //תקן לסוף השמאל
                    subject.rp = obstacle.lp;
                }

            } else if (x < 0) {
                //תקן לסוף הימין
                subject.lp = obstacle.rp;
            }
        }

    });

    subject.x = subject.pos.x

    subject.pos.y += y



    intersection(subject, obstacles, obstacle => {

        if (obstacle.sprite != water && obstacle.sprite != bridge && obstacle.sprite != upstairs && obstacle.sprite != downstairs) {

            if (y > 0) {

                if (subject.bp > obstacle.tp) {
                    //תקן לסוף הלמעלה
                    subject.bp = obstacle.tp;
                    subject.jump = false;
                }

            } else if (y < 0) {
                if (subject.tp < obstacle.bp) {
                    //תקן לסוף הלמטה
                    subject.tp = obstacle.bp;
                }
            }
        }


    });

    subject.y = subject.pos.y

}




