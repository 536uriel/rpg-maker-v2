import Rect from "./Rect.js";
import SITE_URL from "./production-config.js";

export function setVariable(varName, value){
    window[varName] = value;
}

export function getVariable(varName){
    return window[varName];
}

export function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

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

//$ start new chanege
export function set_tracking_object(ob1, ob2, velocity, func) {
    if (ob1.pos.x < ob2.pos.x) {
        ob2.velocity.x = -velocity;
    } else {
        ob2.velocity.x = velocity;

    }

    if (ob1.pos.y < ob2.pos.y) {
        ob2.velocity.y = -velocity;
    } else {
        ob2.velocity.y = velocity;

    }

    if (func) {
        func(ob1, ob2, velocity);
    }
}

//$ end new chanege

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



export function createOrangetreeBg(spriteSheet, blockWidth, blockHeight, otx, oty, camera, board, player) {
    const sprites = spriteSheet.sprites.get('orangeTree');

    otx = Math.round(otx / blockWidth);
    oty = Math.round(oty / blockHeight);

    if (otx < 0) {
        otx = 0
    }

    if (oty < 0) {
        oty = 0
    }

    let i = 0;


    for (let y = oty; y < oty + 3; y++) {
        for (let x = otx; x < otx + 2; x++) {
            board.setGrid(x, y, (new Rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight, sprites[i], camera)), player.pos);

            i++;
        }
    }

}


export function createTreeBg(spriteSheet, blockWidth, blockHeight, tx, ty, camera, board, player) {
    const sprites = spriteSheet.sprites.get('tree');

    tx = Math.round(tx / blockWidth);
    ty = Math.round(ty / blockHeight);

    if (tx < 0) {
        tx = 0
    }

    if (ty < 0) {
        ty = 0
    }

    let i = 0;


    for (let y = ty; y < ty + 3; y++) {
        for (let x = tx; x < tx + 2; x++) {
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

export function createOrangeHouse(spriteSheet, blockWidth, blockHeight, hx, hy, camera, board, player) {
    const sprites = spriteSheet.sprites.get('orangeHouse');

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

export function createRedHouse(spriteSheet, blockWidth, blockHeight, hx, hy, camera, board, player) {
    const sprites = spriteSheet.sprites.get('redHouse');

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



export function popup(str = "") {

    //safty check
    if(SITE_URL === undefined){
        SITE_URL = "";
    }

    let srcImg = SITE_URL + "/assets/wasd-btns.jpeg";

    const overlay = document.createElement("div");
    overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,0.5);
    display:flex; align-items:center; justify-content:center; z-index:9999;
  `;

    const popup = document.createElement("div");
    popup.style.cssText = `
    background:white; padding:20px; border-radius:10px; 
    box-shadow:0 0 20px rgba(0,0,0,0.3); text-align:center; 
    max-width:300px; font-family:sans-serif;
  `;
    popup.innerHTML = `
    <h3 style="margin-top:0">ברוכים הבאים לעורך קוד עולם משחק</h3>
    <p>${str}</p>
    <div>
        <p style="margin-top: 1rem; text-align: center;"> בתמונה אפשר לראות את הכפתורים הנוספים לתזוזת השחקן          
        <img style="float: right;" src="${srcImg}" width="100" height="70" alt="" srcset="">
        </p>
    </div>
    <button style="
      background:#007bff; color:white; border:none; margin-top: 2rem;
      padding:8px 14px; border-radius:6px; cursor:pointer;
    ">הבנתי</button>
  `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    popup.querySelector("button").onclick = () => overlay.remove();
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };

};

