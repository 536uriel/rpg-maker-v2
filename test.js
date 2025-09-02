
import SITE_URL from "./production-config.js";
import Timer from "./timer.js";
import Rect from "./Rect.js";
import Keyboard from "./Keyboard.js";
import { stopMoveWhenCollide, stopNpcsMoveWhenCollide, overlap } from "./collision.js";
import Board from "./Board.js";
import { Sprite } from "./Sprite.js";
import Camera from "./Camera.js";
import Npc from "./Npc.js";
import { rotate_in_center, createPoolBg, createBlueHouse, createOrangeHouse, createRedHouse } from "./helpers.js";
import { poolWithBridge, example2, example3, example4 } from "./examples.js";

// Initialize CodeMirror
//editors for the precode 
var editor1 = CodeMirror.fromTextArea(document.getElementById("editor1"), {
    mode: "javascript",  // Syntax highlighting mode
    lineNumbers: true,   // Show line numbers
    theme: "default"
});

//editor for the draw function
var editor2 = CodeMirror.fromTextArea(document.getElementById("editor2"), {
    mode: "javascript",  // Syntax highlighting mode
    lineNumbers: true,   // Show line numbers
    theme: "default"

});


var div_show_mouse = document.getElementById("show-mouse-pos");
div_show_mouse.style.display = "inline-block"
div_show_mouse.style.fontSize = "1.2rem"
div_show_mouse.style.marginLeft = "20px"
div_show_mouse.style.color = "rgb(96, 117, 156)"


var body = document.body,
    html = document.documentElement;

var cwidth = Math.max(body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth);

var cheight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

var callback = () => { };

document.getElementById("btns-img").src = SITE_URL + "/assets/wasd-btns.jpeg"


//default rect size
var rectW = 50;
var rectH = 50;

var canvas = document.getElementById("screen");
canvas.width = (cwidth / 2) - 50;
var screenRect = canvas.getBoundingClientRect();
var ctx = canvas.getContext("2d")
var board = new Board(canvas, 50)
var sprite = new Sprite();
var camera = new Camera(canvas);
var levelSizeWidth = canvas.width * 4;
var levelSizeHeight = canvas.width * 4;

let divtxt = document.getElementById("canvas-size-text");
divtxt.style.display = "inline-block"
divtxt.style.fontSize = "1.5rem"
divtxt.style.marginLeft = "30px"
divtxt.style.color = "rgb(96, 117, 156)"
divtxt.innerText = "size " + canvas.width + " X " + canvas.height;


editor1.setSize((cwidth / 2) - 30, 120);
editor2.setSize((cwidth / 2) - 30, 200);




var commands = [
    "rect(x, y)",
    "player.gravity = 3",
    "nextCustume()",
    "nextBlock()",
    "addNpc(x, y, speedx, speedy)",
    "setNpc(npcNumber, x, y, speedx, speedy)",
    "setNpcCostume(npcNumber, costumeNum)",
    "whenAttackDeleteNpc()",
    "print(text, x, y, fontSize, color)",
    "createPool(x, y)",
    "createBlueHouse(x, y)",
    "createOrangeHouse(x, y)",
    "createRedHouse(x, y)",
    "addBridge(x, y)",
    "clearBackground()",
    "bg(color)",
    "getNpcsLen()",
    "getNpcPosX(npcNumber)",
    "getNpcPosY(npcNumber)",
    "isCollideWithNpc(npcNumber)",
    "isCollideWithAnyNpcs()",
    "isSwordAttcksNpcs()",
    "deleteNpc(npcNumber)",
    "player.pos.x = 200",
    "player.pos.y = 200",
    "isBlocksCollideWithAnyNpcs()"
]

var clist = document.getElementById("commands");

commands.forEach(command => {
    let li = document.createElement("li");

    li.innerText = command;

    li.addEventListener("click", () => {
        editor1.setValue(editor1.getValue() + "\n" + command);
    })

    clist.appendChild(li)
});


var alist = document.getElementById("commends-drop-down");

commands.forEach(command => {
    let a = document.createElement("a");

    a.innerText = command;
    a.id = "commends-drop-a"

    a.addEventListener("click", () => {
        editor1.setValue(editor1.getValue() + "\n" + command);
    })

    alist.appendChild(a);
});


document.getElementById("e1").addEventListener("click", () => {
    poolWithBridge(editor1);
});

document.getElementById("e2").addEventListener("click", () => {
    example2(editor1, editor2);
});

document.getElementById("e3").addEventListener("click", () => {
    example3(editor1, editor2);
});

document.getElementById("e4").addEventListener("click", () => {
    example4(editor1, editor2);
});


function cleanCode() {
    editor1.setValue("");
    editor2.setValue("");
}



// Function to execute code as online console
function runCode() {
    try {
        // Get the code from CodeMirror
        var preCode = editor1.getValue();
        var code = editor2.getValue();

        // Redirect console.log to display in the output div
        var outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ''; // Clear previous output

        var originalConsoleLog = console.log;
        console.log = function (message) {
            outputDiv.innerHTML += message + '<br>';
            originalConsoleLog.apply(console, arguments);
        };


        //for the output div 
        new Function(preCode)();
        new Function(code)();

        // Run the JavaScript code dinamicly 
        /*
        new Function(code)();
        is equelevant to: 
        function(){
            console.log("code")
        }
        */
        callback = () => {
            //for execute p5 code

            new Function(code)();
        }



        // Restore original console.log
        console.log = originalConsoleLog;
    } catch (error) {
        document.getElementById("output").innerHTML = "Error: " + error.message;
    }
}



document.getElementById("run-btn").addEventListener("click", runCode);
document.getElementById("clean-btn").addEventListener("click", cleanCode);



var mousePos = { x: 0, y: 0 }
var timer = new Timer();
var keyboard = new Keyboard();
var costume = 2;

var ground_sprite;
var grass_sprite;
var water_sprite;

var sword_sprite;

var squere_sprite;

var npcs = new Npc();



sprite.set_sprites().then(() => {

    ground_sprite = sprite.sprites.get('ground');
    grass_sprite = sprite.sprites.get('grass');
    water_sprite = sprite.sprites.get('water');

    sword_sprite = sprite.sprites.get('sword');

    var sword = new Rect(0, 0, 48, 32, sword_sprite, camera);
    sword.attackDuration = 0;
    sword.attack = false;
    sword.deg = 0;
    sword.pos = { x: 0, y: 0 }

    squere_sprite = ground_sprite;

    var player = new Rect(camera.x, camera.y, 50, 50, sprite.sprites.get('player-run-4'), camera);
    player.velocity = { x: 0, y: 0 };
    player.pos = { x: 200, y: 200 };
    player.gravity = 0;

    player.attack = function () {
        sword.x = this.r;
        sword.y = this.t;
        sword.attackDuration = 2;
    }

    //!?is usable?
    player.slower = 0;

    window.player = player;

    //set player input movement
    Keyboard.set_player(keyboard, player);


    var rects = [
        new Rect(0, 0, 50, 50, sprite.sprites.get('grass'), camera),
        new Rect(300, 0, 50, 50, sprite.sprites.get('grass'), camera)
    ]

    board.setGrid(0, 0, rects[0]);
    board.setGrid(0, 0, rects[1]);

    //initiate background positions
    let rects_pos = [
        [1, 3], [4, 5], [1, 1]
    ]

    let drawBackground = board.createBackground(ground_sprite, rects_pos, rectW, rectH, camera, canvas, levelSizeWidth, levelSizeHeight);

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

    window.createPool = function (x, y) {
        createPoolBg(sprite, rectW, rectH, x, y, camera, board, player);
    }

    window.createBlueHouse = function (x, y) {
        createBlueHouse(sprite, rectW, rectH, x, y, camera, board, player)
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


    npcs.addNpc(sprite, "1player-run-1", 100, 250, 1, 0);
    var drawNpcsLayer = npcs.createNpcsLayer(board.backgroundWidth, board.backgroundHeight);


    document.addEventListener("mousemove", (e) => {

        mousePos.x = e.clientX - screenRect.left
        mousePos.y = e.clientY - screenRect.top

    });


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
        //to prevent errors -> for new there is only 3 costumes!!
        if (costumeNum >= 1 && costumeNum <= 3) {
            npcs.rects[npcNumber].costume = costumeNum;
        }
    }

    window.setNpc = function (npcNumber, x, y, speedx, speedy) {
        npcs.rects[npcNumber].pos.x = x;
        npcs.rects[npcNumber].pos.y = y;
        npcs.rects[npcNumber].velocity.x = speedx;
        npcs.rects[npcNumber].velocity.y = speedy;

    }

    window.getNpcPosX = function (npcNumber) {
        return npcs.rects[npcNumber].pos.x;
    }

    window.getNpcPosY = function (npcNumber) {
        return npcs.rects[npcNumber].pos.y;
    }

    window.nextCustume = function nextCustume() {
        switch (costume) {
            case 1:
                costume = 2;
                break;

            case 2:
                costume = 3;
                break;

            case 3:
                costume = 1;
                break;

            default:
                costume = 1;
                break;
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

    window.rect = function rect(x, y) {
        console.log("run rect")
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


    timer.update = function (deltaTime) {
        ctx.clearRect(0, 0, canvas.width * 4, canvas.height * 4)


        drawBackground(ctx);

        npcs.update();
        drawNpcsLayer(ctx, npcs.rects, camera, sprite);

        player.velocity.y += player.gravity / 60;

        if (sword.attackDuration > 0) {
            sword.deg += 7;
            //draw sword with rotation
            rotate_in_center(ctx, sword, sword.deg)
            sword.attackDuration -= 0.1;
            sword.attack = true;
        } else {
            sword.deg = 0;
            sword.attack = false;
        }


        stopMoveWhenCollide(player, board.getAllSubjectsFromGrid(), player.velocity.x, player.velocity.y, camera, canvas, sprite);



        player.draw_preciclly_sprite(ctx, sprite.getSpriteAnimation(costume + 'player-run-', player, 10, 4));

        sword.pos.x = player.rp;
        sword.pos.y = player.tp;

        div_show_mouse.innerText = "x: " + player.pos.x + ", y: " + player.pos.y;

        callback();



        npcs.iterateNpcs(npcRect => {
            stopNpcsMoveWhenCollide(npcRect, board.getAllSubjectsFromGrid(), npcRect.velocity.x, npcRect.velocity.y, sprite);
        });

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

    timer.start()


});

