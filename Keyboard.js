import { intersection } from "./collision.js";

export default class keyboard {

    constructor() {
        this.keys = new Map();

        //for touch support fix - Disable zoom with viewport
        this.lastTouchEnd = 0;

        document.addEventListener('touchend', function (event) {
            const now = Date.now();
            if (now - this.lastTouchEnd <= 300) {
                event.preventDefault();
            }
            this.lastTouchEnd = now;
        }, false);

    }

    addTouchSeppurt(elem, f) {


        (["touchstart", "touchend"]).forEach(touchState => {
            elem.addEventListener(touchState, (e) => {
                f(touchState);
            })
        })

    }

    addKey(key, f) {
        this.keys.set(key, f);

        (['keydown', 'keyup']).forEach(state => {
            document.addEventListener(state, (e) => {
                let code = e.keyCode;


                if (code == key) {
                    if (code == 37 || code == 38 ||
                        code == 39 || code == 40) {
                        e.preventDefault();
                    }
                    this.keys.get(key)(state);
                }
            })

        })
    }

    static set_player(keyboard, entity) {

        //(key): ENTER -> attack
        keyboard.addKey(13, function (state) {
            if (state == 'keydown') {
                entity.attack();
            }
        })

        //(key): 0 -> attack
        keyboard.addKey(48, function (state) {
            if (state == 'keydown') {
                entity.attack();
            }
        })

        //right
        keyboard.addKey(68, function (state) {
            if (state == 'keydown') {
                entity.velocity.x = 5
            } else {
                entity.velocity.x = 0
            }
        })

        entity.jump = false;
        //up
        keyboard.addKey(87, function (state) {
            if (entity.gravity == 0) {
                if (state == 'keydown') {
                    entity.velocity.y = -5
                } else {
                    entity.velocity.y = 0
                }
            } else {
                if (state == 'keydown' && !entity.jump) {
                    entity.velocity.y = -5;
                    entity.jump = true;
                }

            }
        })

        //left
        keyboard.addKey(65, function (state) {
            if (state == 'keydown') {
                entity.velocity.x = -5
            } else {
                entity.velocity.x = 0
            }
        })


        //down
        keyboard.addKey(83, function (state) {
            if (state == 'keydown') {
                entity.velocity.y = 5
            } else {
                entity.velocity.y = 0
            }
        })

        //set input arrows:
        //right
        keyboard.addKey(39, function (state) {
            if (state == 'keydown') {
                entity.velocity.x = 5
            } else {
                entity.velocity.x = 0
            }
        })

        //up
        keyboard.addKey(38, function (state) {
            if (entity.gravity == 0) {
                if (state == 'keydown') {
                    entity.velocity.y = -5
                } else {
                    entity.velocity.y = 0
                }
            } else {
                if (state == 'keydown' && !entity.jump) {
                    entity.velocity.y = -5;
                    entity.jump = true;
                }

            }
        })

        //left
        keyboard.addKey(37, function (state) {
            if (state == 'keydown') {
                entity.velocity.x = -5
            } else {
                entity.velocity.x = 0
            }
        })

        //down
        keyboard.addKey(40, function (state) {
            if (state == 'keydown') {

                entity.velocity.y = 5
            } else {
                entity.velocity.y = 0
            }
        })

        try {

            let swordBtn = document.getElementById("swordBtn");
            let leftBtn = document.getElementById("leftBtn");
            let upBtn = document.getElementById("upBtn");
            let rightBtn = document.getElementById("rightBtn");
            let downBtn = document.getElementById("downBtn");

            keyboard.addTouchSeppurt(swordBtn, (touchState) => {
                if (touchState == "touchstart") {
                    entity.attack();
                }
            });

            keyboard.addTouchSeppurt(leftBtn, (touchState) => {
                if (touchState == 'touchstart') {
                    entity.velocity.x = -5
                } else {
                    entity.velocity.x = 0
                }
            });

            keyboard.addTouchSeppurt(rightBtn, (touchState) => {
                if (touchState == 'touchstart') {
                    entity.velocity.x = 5
                } else {
                    entity.velocity.x = 0
                }
            });

            keyboard.addTouchSeppurt(upBtn, (touchState) => {
                if (touchState == 'touchstart') {
                    entity.velocity.y = -5
                } else {
                    entity.velocity.y = 0
                }
            });

            keyboard.addTouchSeppurt(downBtn, (touchState) => {
                if (touchState == 'touchstart') {
                    entity.velocity.y = 5
                } else {
                    entity.velocity.y = 0
                }
            });


        } catch (err) {
            alert(err);
        }

    }

}

