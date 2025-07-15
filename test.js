
import SITE_URL from "./production-config.js";
import Timer from "./timer.js";
import Rect from "./Rect.js";
import Keyboard from "./Keyboard.js";
import { stopMoveWhenCollide } from "./collision.js";
import Board from "./Board.js";
import { Sprite } from "./Sprite.js";
import Camera from "./Camera.js";

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
    "player.pos.x = 200",
    "player.pos.y = 200"
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

var squere_sprite;



sprite.set_sprites().then(() => {

    ground_sprite = sprite.sprites.get('ground');
    grass_sprite = sprite.sprites.get('grass');
    water_sprite = sprite.sprites.get('water');

    squere_sprite = ground_sprite;



    var player = new Rect(camera.x, camera.y, 50, 50, sprite.sprites.get('player-run-4'), camera);
    player.velocity = { x: 0, y: 0 };
    player.pos = { x: 200, y: 200 };
    player.gravity = 0;
    
    //!?is usable?
    player.slower = 0;

    window.player = player;

    //set player input movement
    Keyboard.set_player(keyboard, player, board);


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


    document.addEventListener("mousemove", (e) => {

        mousePos.x = e.clientX - screenRect.left
        mousePos.y = e.clientY - screenRect.top

    });

    window.nextCustume = function nextCustume() {
        if (costume == 2) {
            costume = 1;
        } else {
            costume = 2;
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


    timer.update = function (deltaTime) {
        ctx.clearRect(0, 0, canvas.width * 4, canvas.height * 4)


        drawBackground(ctx)

        player.velocity.y += player.gravity / 60;

        stopMoveWhenCollide(player, board.getAllSubjectsFromGrid(), player.velocity.x, player.velocity.y, camera, canvas, sprite);



        player.draw_preciclly_sprite(ctx, sprite.getSpriteAnimation(costume + 'player-run-', player, 10, 4))

        div_show_mouse.innerText = "x: " + player.pos.x + ", y: " + player.pos.y;

        callback()
    }

    timer.start()


});

