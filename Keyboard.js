import { intersection } from "./collision.js";

export default class keyboard {

    constructor() {
        this.keys = new Map()
    }

    addKey(key, f) {
        this.keys.set(key, f);

        (['keydown', 'keyup']).forEach(state => {
            document.addEventListener(state, (e) => {
                let code = e.keyCode;


                if (code == key) {
                    this.keys.get(key)(state);
                }
            })

        })
    }

    static set_player(keyboard, entity, board) {
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

    }

}

