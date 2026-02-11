import Rect from "./Rect.js";
import { overlap } from "./collision.js";
import { createPoolBg, createBlueHouse, createOrangeHouse, createRedHouse, createOrangetreeBg, createTreeBg, getRandomIntInclusive, setVariable, getVariable } from "./helpers.js";

export function setWindowsCommandsAfterSetSprites(sprite, board, npcs,
    levels, rectW, rectH, camera, player) {

    window.ground_sprite = sprite.sprites.get('ground');
    window.grass_sprite = sprite.sprites.get('grass');
    window.water_sprite = sprite.sprites.get('water');

    window.addShootingBoss = function (difficulty, x, y) {

        npcs.addShootingBoss(sprite, "1player-run-1", difficulty, x, y);

    }

    //@ new code

    window.setVariable = setVariable;
    window.getVariable = getVariable;

    //@end new code

    window.random = getRandomIntInclusive;


    window.bg = function (color) {
        document.getElementById("screen").style.backgroundColor = color;
    }

    window.clearBackground = function () {
        board.clearGrid();

        if (window.deleteNpc && npcs.rects.length > 0) {
            npcs.rects.forEach((n, i) => {
                window.deleteNpc(i);
            });

        }
    }

    window.addThisLevel = function () {
        levels.push(board.getAllSubjectsFromGrid());
    }

    window.deleteLastLevel = function () {
        if (levels.length > 0) {
            levels.pop();
        }
    }

    window.rectWithSprite = function (x, y, w, h, rect_sprite) {

        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, w, h, rect_sprite, camera)), player.pos);
    }

    window.drawLevelBlocksByNumber = function (levelNum) {
        if (levelNum >= 0 && levelNum < levels.length) {

            board.clearGrid();
            levels[levelNum].forEach(rect => {

                if (rect != undefined) {
                    window.rectWithSprite(rect.x, rect.y, rect.w, rect.h, rect.sprite);
                }
            });

        }

    }



    window.addDoor = function (x, y) {
        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let door_sprite = sprite.sprites.get('door');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, Math.round(rectW * 1.5), rectH * 2 + 10, door_sprite, camera)), player.pos);
    }

    window.addBigHouse = function (x, y) {
        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let bigHouse_sprite = sprite.sprites.get('bigHouse');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, 100, 150, bigHouse_sprite, camera)), player.pos);
    }

    window.addGiantHouse = function (x, y) {
        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let giantHouse_sprite = sprite.sprites.get('giantHouse');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, 200, 250, giantHouse_sprite, camera)), player.pos);
    }



    window.addShelf = function (x, y) {
        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let shelf_sprite = sprite.sprites.get('shelf');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, rectW, rectH, shelf_sprite, camera)), player.pos);
    }

    window.createFloor = function (x, y, size_w, size_h) {
        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let floor_sprite = sprite.sprites.get('floor');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, rectW * size_w, rectH * size_h, floor_sprite, camera)), player.pos);
    }

    window.createGridFloor = function (x, y, gwith, gheight) {
        for (let i = 1; i <= gwith; i++) {
            for (let j = 1; j <= gheight; j++) {
                window.createFloor(x + (i * 50), y + (j * 50), 1, 1)
            }
        }
    }

    window.createBlueWall = function (x, y, size_w, size_h) {
        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let blueWall_sprite = sprite.sprites.get('blueWall');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, rectW * size_w, rectH * size_h, blueWall_sprite, camera)), player.pos);
    }

    window.showCurrentLevel = function (x, y, fontSize = 30, color = "black") {
        window.print("קומה מספר: " + window.player.level, x, y, fontSize, color);
    }

    window.createPool = function (x, y) {
        createPoolBg(sprite, rectW, rectH, x, y, camera, board, player);
    }



    window.createOrangetree = function (x, y) {
        createOrangetreeBg(sprite, rectW, rectH, x, y, camera, board, player);
    }

    window.createTree = function (x, y) {
        createTreeBg(sprite, rectW, rectH, x, y, camera, board, player);
    }



    window.createBlueHouse = function (x, y) {
        createBlueHouse(sprite, rectW, rectH, x, y, camera, board, player)
    }

    window.createRoom = function (x = 0, y = 0) {

        window.createFloor(x + 300, y + 200, 3, 2)        /* הוסף רצפה */
        window.createFloor(x + 300, y + 300, 3, 2)        /* הוסף רצפה */

        window.createBlueWall(x + 300, y + 150, 3, 1)     /* הוסף קיר כחול */
        window.createBlueWall(x + 450, y + 150, 1, 5)     /* הוסף קיר כחול */
        window.createBlueWall(x + 250, y + 150, 1, 5)     /* הוסף קיר כחול */

        window.createBlueWall(x + 400, y + 350, 1, 1)     /* הוסף קיר כחול */
    }

    window.createOrangeHouse = function (x, y) {
        createOrangeHouse(sprite, rectW, rectH, x, y, camera, board, player)
    }

    window.createRedHouse = function (x, y) {
        createRedHouse(sprite, rectW, rectH, x, y, camera, board, player)
    }


    window.addBridge = function (x, y) {

        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let bridge_sprite = sprite.sprites.get('bridge');
        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, rectW, rectH, bridge_sprite, camera)), player.pos);

    }


    window.addUpstairs = function (x, y) {

        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let upstairs_sprite = sprite.sprites.get("upstairs");
        const newUpstairsRect = new Rect(x * rectW, y * rectH, rectW, rectH, upstairs_sprite, camera)
        board.setGrid(x, y, newUpstairsRect, player.pos);

    }

    window.isCollideWithUpstairs = function () {
        let blocks = board.getAllSubjectsFromGrid();
        let upstairs_sprite = sprite.sprites.get("upstairs");

        for (let i = 0; i < blocks.length; i++) {
            if (overlap(player, blocks[i]) && blocks[i].sprite == upstairs_sprite) {
                return true;
            }
        }

        return false;
    }

    window.addDownstairs = function (x, y) {

        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        let downstairs_sprite = sprite.sprites.get("downstairs");
        const newDownstairsRect = new Rect(x * rectW, y * rectH, rectW, rectH, downstairs_sprite, camera);
        board.setGrid(x, y, newDownstairsRect, player.pos);

    }
}




export function setWindowsCommandsInsideUpdate(sprite, board, npcs,
    rectW, rectH, camera, player,
    squere_sprite, sword, ctx) {

    window.isCollideWithDownstairs = function () {
        let blocks = board.getAllSubjectsFromGrid();
        let downstairs_sprite = sprite.sprites.get("downstairs");

        for (let i = 0; i < blocks.length; i++) {
            if (overlap(player, blocks[i]) && blocks[i].sprite == downstairs_sprite) {
                return true;
            }
        }

        return false;
    }

    window.isCollideWithDoor = function () {
        let blocks = board.getAllSubjectsFromGrid();
        let door_sprite = sprite.sprites.get("door");

        for (let i = 0; i < blocks.length; i++) {
            if (overlap(player, blocks[i]) && blocks[i].sprite == door_sprite) {
                return true;
            }
        }

        return false;
    }


    window.print = function (text, x, y, fontSize = 20, color = "black") {
        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }


    window.getNpcsLen = function () { return npcs.rects.length; }

    window.addNpc = function (x, y, speedx, speedy, npcCostume = 1) {
        npcs.addNpc(sprite, npcCostume + "player-run-1", x, y, speedx, speedy, npcCostume);
    }

    window.setNpcCostume = function (npcNumber, costumeNum) {
        //to prevent errors -> for new there is only 9 costumes!!
        if (costumeNum >= 1 && costumeNum <= 9) {
            npcs.rects[npcNumber].costume = costumeNum;
        }
    }

    window.setNpc = function (npcNumber, x, y, speedx = 0, speedy = 0) {
        npcs.rects[npcNumber].pos.x = x;
        npcs.rects[npcNumber].pos.y = y;
        npcs.rects[npcNumber].velocity.x = speedx;
        npcs.rects[npcNumber].velocity.y = speedy;

    }

    window.setNpcSpeed = function (npcNumber, speedx, speedy) {
        npcs.rects[npcNumber].velocity.x = speedx;
        npcs.rects[npcNumber].velocity.y = speedy;
    }

    window.setNpcDetination = function (npcNumber, destNum, x, y) {

        if (npcs.rects.length > 0 && npcNumber < npcs.rects.length) {



            if (!("d" in npcs.rects[npcNumber])) {
                npcs.rects[npcNumber].d = 1;
            }

            if (destNum == npcs.rects[npcNumber].d) {

                if (npcs.rects[npcNumber].pos.x < x - 50) {
                    npcs.rects[npcNumber].velocity.x = 1;
                }

                if (npcs.rects[npcNumber].pos.x > x + 50) {
                    npcs.rects[npcNumber].velocity.x = -1;
                }

                if (npcs.rects[npcNumber].pos.y < y - 50) {
                    npcs.rects[npcNumber].velocity.y = 1;
                }

                if (npcs.rects[npcNumber].pos.y > y + 50) {
                    npcs.rects[npcNumber].velocity.y = -1;
                }


                if (npcs.rects[npcNumber].pos.x >= x - 50 &&
                    npcs.rects[npcNumber].pos.y >= y - 50 &&
                    npcs.rects[npcNumber].pos.x <= x + 50 &&
                    npcs.rects[npcNumber].pos.y <= y + 50
                ) {
                    npcs.rects[npcNumber].d++;
                }
            }

        }
    }

    window.getNpcPosX = function (npcNumber) {
        return npcs.rects[npcNumber].pos.x;
    }

    window.getNpcPosY = function (npcNumber) {
        return npcs.rects[npcNumber].pos.y;
    }

    window.nextCustume = function nextCustume() {
        costume += 1;

        if (costume > 9) {
            costume = 1;
        }

    }

    window.nextBlock = function nextBlock() {
        switch (squere_sprite) {
            case ground_sprite:
                squere_sprite = grass_sprite;
                break;

            case grass_sprite:
                squere_sprite = water_sprite;
                break;

            case water_sprite:
                squere_sprite = ground_sprite;
                break;

            default:
                squere_sprite = ground_sprite;
                break;
        }
    }

    window.rect = function (x, y) {

        x = Math.round(x / rectW);
        y = Math.round(y / rectH);

        if (x < 0) {
            x = 0
        }

        if (y < 0) {
            y = 0
        }

        board.setGrid(x, y, (new Rect(x * rectW, y * rectH, rectW, rectH, squere_sprite, camera)), player.pos);
    }

    window.whenAttackDeleteNpc = function () {
        let num = window.isSwordAttcksNpcs()
        if (num != -1) {
            window.deleteNpc(num)
        }
    }

    window.isCollideWithNpc = function (npcNumber) {
        if (overlap(player, npcs.rects[npcNumber])) {
            return true;
        } else {
            return false;
        }
    }

    window.isCollideWithAnyNpcs = function () {

        for (let i = 0; i < npcs.rects.length; i++) {
            if (overlap(player, npcs.rects[i])) {
                return true;
            }
        }

        return false;

    }

    window.isBlocksCollideWithAnyNpcs = function () {

        const tmpRects = board.getAllSubjectsFromGrid();

        for (let i = 0; i < tmpRects.length; i++) {
            for (let j = 0; j < npcs.rects.length; j++) {
                try {
                    if (overlap(npcs.rects[j], tmpRects[i])
                        && tmpRects[i].sprite != sprite.sprites.get("bridge")
                        && tmpRects[i].sprite != sprite.sprites.get("water")) {
                        return true;
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }

            }
        }

        return false;

    }


    window.isSwordAttcksNpcs = function () {

        for (let i = 0; i < npcs.rects.length; i++) {
            if (overlap(sword, npcs.rects[i]) && sword.attack) {
                return i;
            }
        }

        return -1;

    }

    window.deleteNpc = function (npcNumber) {
        if (npcs.rects.length >= 1) {
            npcs.rects.splice(npcNumber, 1);
        }
    }


}
