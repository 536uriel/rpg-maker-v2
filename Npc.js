import Rect from "./Rect.js";

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

    //update pos for lgoic reasons
    update() {
        this.iterateNpcs(npc => {

            npc.pos.x = npc.x;
            npc.pos.y = npc.y;
        })
    }

    iterateNpcs(callback) {
        this.rects.forEach(rect => {
            callback(rect);
        })
    }



}