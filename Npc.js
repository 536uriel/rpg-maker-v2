import Rect from "./Rect.js";
import { set_tracking_object } from "./helpers.js";
import { overlap } from "./collision.js";

export default class Npc {
    constructor() {
        this.rects = [];
    }

    createNpcsLayer(bgW, bgH) {

        var npcLayer = document.createElement("canvas");
        npcLayer.width = bgW;
        npcLayer.height = bgH;

        let pen = npcLayer.getContext("2d");

        return function drawNpcsLayer(ctx, npcs, camera, spriteSheet) {

            npcs.forEach(npc => {

                //clear layer before drawing
                pen.clearRect(0, 0, bgW, bgH);

                //to avoid undefined errors
                if (!("costume" in npc)) {
                    npc.costume = 1;
                }

                //$ start newcode

                if ("magicBall" in npc) {
                    npc.magicBall.draw_preciclly_sprite(pen, npc.magicBall.sprite);
                }

                //$ end newcode

                //draw npc on layer
                npc.draw_preciclly_sprite(pen, spriteSheet.getSpriteAnimation(npc.costume + "player-run-", npc, 10, 4));

                //draw layer on canvas
                ctx.drawImage(npcLayer, -camera.x, camera.y);

            });
        }
    }

    addNpc(spriteSheet, spriteName, x = 0, y = 0, velx = 0, vely = 0, npcCostume = 1) {
        let npc = new Rect(x, y, 50, 50, spriteSheet.sprites.get(spriteName));
        //pos - for the functionallity and not for the actual drawing
        npc.pos.x = x;
        npc.pos.y = y;

        npc.costume = npcCostume;

        //create velocity to npc
        npc.velocity = { x: velx, y: vely }

        this.rects.push(npc);
    }

    //$ start newcode

    addShootingBoss(spriteSheet, spriteName, difficulty = 1, x = 0, y = 0, velx = 0, vely = 0, npcCostume = 1) {


        let npc = new Rect(x, y, 50, 50, spriteSheet.sprites.get(spriteName));
        //pos - for the functionallity and not for the actual drawing
        npc.pos.x = x;
        npc.pos.y = y;

        npc.costume = npcCostume;

        //create velocity to npc
        npc.velocity = { x: velx, y: vely }

        npc.difficulty = difficulty;

        let magicBall = new Rect(x, y, 50, 50, spriteSheet.sprites.get("magicBall"));

        magicBall.velocity = { x: npc.difficulty, y: npc.difficulty }

        magicBall.difficulty = difficulty;

        npc.magicBall = magicBall;

        npc.magicAttack = true;

        npc.update = function (player, sword) {
            //$ start newcode

            //update magicBall pos by velocity (with no blocks collision in count)
            this.magicBall.pos.x += this.magicBall.velocity.x;
            this.magicBall.pos.y += this.magicBall.velocity.y;

            // //# update pos for lgoic reasons (for the actual drawing on canvas)
            this.magicBall.x = this.magicBall.pos.x;
            this.magicBall.y = this.magicBall.pos.y;

            if (this.magicAttack) {
                set_tracking_object(player, this.magicBall, this.difficulty);
            } else {
                set_tracking_object(this, this.magicBall, this.difficulty);
            }

            //!the player must be first in overlap because his x doesnt change, only his pos.x
            if (overlap(player, this.magicBall)) {
                //$ add newcode
                player.life -= 1;
                //set magicBall to boss posission
                this.magicBall.pos.x = this.pos.x;
                this.magicBall.pos.y = this.pos.y;
                // //# update pos for lgoic reasons (for the actual drawing on canvas)
                this.magicBall.x = this.x;
                this.magicBall.y = this.y;
            }

            if (overlap(sword, this.magicBall) && sword.attack) {
                this.magicAttack = false;
            }

            if (overlap(this, this.magicBall) && this.magicAttack == false) {
                npc.bossDefeat = true;
            }




            //$ end newcode

        }

        npc.bossDefeat = false;
        npc.boss = true;
        this.rects.push(npc);
    }

    //$ end newcode


    //# update pos for lgoic reasons (for the actual drawing on canvas)
    update(player, sword) {
        this.iterateNpcs((npc, index) => {

            npc.pos.x = npc.x;
            npc.pos.y = npc.y;

            if ("boss" in npc && "bossDefeat" in npc) {
                if (npc.boss == true) {
                    npc.update(player, sword);
                    if(npc.bossDefeat == true){
                        if("deleteNpc" in window){
                            window.deleteNpc(index)
                        }
                        
                    }
                }
            }

        })
    }

    iterateNpcs(callback) {
        this.rects.forEach((rect, i) => {
            callback(rect, i);
        })
    }



}