
import SITE_URL from "./production-config.js";
import Timer from "./timer.js";
import Rect from "./Rect.js";
import Keyboard from "./Keyboard.js";
import { stopMoveWhenCollide, stopNpcsMoveWhenCollide, overlap } from "./collision.js";
import Board from "./Board.js";
import { Sprite } from "./Sprite.js";
import Camera from "./Camera.js";
import Npc from "./Npc.js";
import { rotate_in_center, popup } from "./helpers.js";
import { poolWithBridge, example2, example3, example4 } from "./examples.js";
import { BlocksComponent } from "./blocks-editor-component.js";
import { setWindowsCommandsAfterSetSprites, setWindowsCommandsInsideUpdate } from "./WindowsCommands.js";


function isEmptyOrNull(str) {
    return str == null || (typeof str === 'string' && str.trim().length === 0);
}

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
var callback2 = () => { };



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
    "addGiantHouse(100,100)         /* (x,y) צור בית ענק במיקום*/",
    "addBigHouse(100,100)        /* (x,y) צור בית גדול במיקום*/",
    "addDoor(100,100)      /* (x,y) צור דלת במיקום */",
    "rect(100, 100)     /*  (x,y) צור בלוק במיקום */",
    "createPool(100, 100)       /* (x,y) צור בריכה */",
    "createBlueHouse(100, 100)      /* (x,y) צור בית כחול */",
    "createOrangeHouse(100, 100)        /* צור בית כתום */",
    "createRedHouse(100, 100)       /* צור בית אדום */",
    "addBridge(100, 100)        /* הוסף גשר */",
    "clearBackground()      /* נקה רקע */",
    "bg('LightGreen')     /* צבע רקע בצבע */",
    "addUpstairs(100, 100)     /* הוסף מדרגות למעלה */",
    "addDownstairs(100, 100)       /* הוסף מדרגות למטה */",
    "createBlueWall(100, 100, 2, 4)     /* (x,y,width,height) הוסף קיר כחול */",
    "createFloor(100, 100, 3, 3)        /* (x,y,width,height) הוסף רצפה */",
    "addShelf(100, 100)     /* הוסף מדף */",
    "createRoom()       /* הוסף חדר עם חלל פנים */",
    "createOrangetree(100, 100)     /* הוסף עץ תפוזים */",
    "createTree(100, 100)       /* הוסף עץ */",
    "createGridFloor(100, 100, 10, 10)        /* (x,y,width,height) צור רצפה מרוצפת */"

]

var commands2 = [
    "nextCustume()      /* התלבושת הבאה */",
    "nextBlock()        /* הבלוק הבא */",
    "setVariable(varName, value)    /*   יצירת - או - החלפת משתנה עם ערך */",
    "getVariable(varName)   /* קבלת ערך המשתנה על פי השם */",
    "addNpc(250, 250, 1, 0)       /* (x,y,speedx,speedy) הוסף אוייב */",
    "addShootingBoss(2, 100,100)        /* (difficulty ,x, y) הוסף אוייב מכשף */",
    "setNpc(0, 250, 250, 1, 0)        /* (npc_number,x,y,speedx,speedy)הגדר אוייב */",
    "setNpcCostume(0, 1)       /* (npc_number, costum_number)הגדר מספר תלבושת לאוייב */",
    "setNpcDetination(0, 1, 100, 100)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */",
    "setNpcSpeed(0, 1, 0)       /* (npcNumber, speedx, speedy) הגדר מהירות אוייב */",
    "whenAttackDeleteNpc()      /* כאשר שחקן תוקף מחק אוייב */",
    "player.life = 10       /* קבע חיים של שחקן ל10 */",
    "print('text', 100, 100, 20, 'red')     /* ('text',x,y,font_width, 'color')הדפס כיתוב */",
    "random(1,10)       /* קבל מספר אקראי בטוווח של 2 מספרים */",
    "getNpcsLen()",
    "getNpcPosX(0)",
    "getNpcPosY(0)",
    "isCollideWithNpc(0)",
    "isCollideWithAnyNpcs()",
    "isSwordAttcksNpcs()",
    "deleteNpc(0)",
    "player.pos.x = 200     /* מיקום שחקן ברוחב */",
    "player.pos.y = 200     /* מיקום שחקן בגובה */",
    "player.level       /* מספר שלב של השחקן */",
    "isBlocksCollideWithAnyNpcs()",
    "isCollideWithUpstairs()        /* האם השחקן נוגע במדרגה למעלה */",
    "isCollideWithDownstairs()      /* האם השחקן נוגע במדרגה למטה */",
    "isCollideWithDoor()        /* שחקן נוגע בדלת */",
    "addThisLevel()     /* הוסף בלוקים במסך לשלב נפרד */",
    "deleteLastLevel()      /* מחק שלב האחרון שנוצר */",
    "drawLevelBlocksByNumber(n)     /* צייר שלב לפי מספרו */",
    "showCurrentLevel(100, 100, fontSize = 30, color = 'black')     /* הדפס מספר שלב נוכחי */",
    "player.gravity = 3     /* הוסף כוח נפילה לשחקן */"
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

//* commands2
var clist = document.getElementById("commands2");

commands2.forEach(command => {
    let li = document.createElement("li");

    li.innerText = command;

    li.addEventListener("click", () => {
        editor1.setValue(editor1.getValue() + "\n" + command);
    })

    clist.appendChild(li)
});


var alist = document.getElementById("commends-drop-down2");

commands2.forEach(command => {
    let a = document.createElement("a");

    a.innerText = command;
    a.id = "commends-drop-a"

    a.addEventListener("click", () => {
        editor1.setValue(editor1.getValue() + "\n" + command);
    })

    alist.appendChild(a);
});
//*/

document.getElementById("e1").addEventListener("click", () => {
    poolWithBridge(editor1, editor2);
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
    editor1.setValue(`clearBackground()      /* נקה רקע */
bg("aliceblue")     /* צבע רקע בצבע */`);
    editor2.setValue("");

}


//$save code with the student name to local storage

//open popup
document.getElementById("popupBtn").addEventListener("click", openPopup);

//closepopup
document.getElementById("closePopupBtn").addEventListener("click", closePopup);


//save to local storage
document.getElementById("saveCodeToLocalStorageBtn").addEventListener("click", saveCodeToLocalStorage);

//get code by stu name and project name from local storage
document.getElementById("getCodeFromLocalStorageBtn").addEventListener("click", getCodeFromLocalStorage);

const overlay = document.getElementById("overlay");

function openPopup() {
    overlay.style.display = "flex";
}
function closePopup() {
    overlay.style.display = "none";
}

function saveCodeToLocalStorage(event) {
    try {
        event.preventDefault();
    } catch (err) {
        console.log(err)
    }


    let studentName = document.getElementById("studentName").value;
    let projectName = document.getElementById("projectName").value;

    const e1Text = editor1.getValue();
    const e2Text = editor2.getValue();

    const target1BlockEditor = document.getElementById("target1");

    const target2BlockEditor = document.getElementById("target2");


    const data = {
        e1Text, e2Text
    }


    if (!isEmptyOrNull(studentName) && !isEmptyOrNull(projectName)) {
        localStorage.setItem(studentName + ":" + projectName, JSON.stringify(data));


        try {

            const target1Childrens = target1BlockEditor.children;
            let target1NodesData = [];

            for (let i = 0; i < target1Childrens.length; i++) {

                target1NodesData.push({
                    left: target1Childrens[i].style.left, top: target1Childrens[i].style.top,
                    command: window.blocksComponent.getCommandString(target1Childrens[i])
                });


            }

            const target2Childrens = target2BlockEditor.children;
            let target2NodesData = [];


            for (let i = 0; i < target2Childrens.length; i++) {

                target2NodesData.push({
                    left: target2Childrens[i].style.left, top: target2Childrens[i].style.top,
                    command: window.blocksComponent.getCommandString(target2Childrens[i])
                });

            }


            localStorage.setItem(studentName + ":" + projectName + "blocks1", JSON.stringify({ target1NodesData }));
            localStorage.setItem(studentName + ":" + projectName + "blocks2", JSON.stringify({ target2NodesData }));
        } catch (err) {
            console.log(err)
        }


        alert("הקוד נשמר בשם");
        closePopup();
    } else {
        alert("לא סיפקת שם או שם פרוייקט");
        closePopup();
    }

}

function getCodeFromLocalStorage(event) {

    try {
        event.preventDefault();
    } catch (err) {
        console.log(err)
    }

    let studentName = document.getElementById("studentName").value;
    let projectName = document.getElementById("projectName").value;

    let stringData = localStorage.getItem(studentName + ":" + projectName);

    if (stringData != null) {
        let data = JSON.parse(stringData);

        editor1.setValue(data.e1Text);
        editor2.setValue(data.e2Text);


        //!need to fix
        try {

            const sidenavChildrens = document.getElementById("sidenav-commends-drop-down").children;

            let target1Data = JSON.parse(localStorage.getItem(studentName + ":" + projectName + "blocks1"));

            const target1NodesData = target1Data.target1NodesData;
            console.log(target1NodesData)

            const target1 = document.getElementById("target1");

            for (let i = 0; i < target1NodesData.length; i++) {

                let target1DataTmp = target1NodesData[i];

                for (let j = 0; j < sidenavChildrens.length; j++) {

                    let original = sidenavChildrens[j];

                    if (window.blocksComponent.getCommandString(original).split("(")[0] == target1DataTmp.command.split("(")[0]) {

                        let clone = original.cloneNode(true);
                        clone.classList.add('clone');

                        let tmpuuid = crypto.randomUUID();
                        if (tmpuuid) {
                            clone.id = tmpuuid;
                        } else {
                            clone.id = original.id + "clone";
                        }

                        window.blocksComponent.setInputsNumsBySameCommandString(clone, target1DataTmp.command);

                        clone.style.left = target1DataTmp.left;
                        clone.style.top = target1DataTmp.top;
                        clone.setAttribute('draggable', 'true');
                        clone.dataset.instanceId = Math.random().toString(36).slice(2);
                        target1.appendChild(clone);
                    }
                }

            }


        } catch (err) {
            console.log(err);
        }

        try {
            const sidenavChildrens = document.getElementById("sidenav-commends-drop-down").children;

            let target2Data = JSON.parse(localStorage.getItem(studentName + ":" + projectName + "blocks2"));

            const target2NodesData = target2Data.target2NodesData;

            const target2 = document.getElementById("target2");

            for (let i = 0; i < target2NodesData.length; i++) {

                let target2DataTmp = target2NodesData[i];

                for (let j = 0; j < sidenavChildrens.length; j++) {

                    let original = sidenavChildrens[j];

                    if (window.blocksComponent.getCommandString(original).split("(")[0] == target2DataTmp.command.split("(")[0]) {

                        let clone = original.cloneNode(true);
                        clone.classList.add('clone');

                        let tmpuuid = crypto.randomUUID();
                        if (tmpuuid) {
                            clone.id = tmpuuid;
                        } else {
                            clone.id = original.id + "clone";
                        }

                        window.blocksComponent.setInputsNumsBySameCommandString(clone, target2DataTmp.command);

                        clone.style.left = target2DataTmp.left;
                        clone.style.top = target2DataTmp.top;
                        clone.setAttribute('draggable', 'true');
                        clone.dataset.instanceId = Math.random().toString(36).slice(2);
                        target2.appendChild(clone);
                    }
                }

            }



        } catch (err) {
            console.log(err)
        }

        alert("הקוד נטען בהצלחה");
        closePopup();
    } else {
        alert("לא נמצא פרוייקט עם השם שהזנת")
        closePopup();
    }

}

// Close when clicking outside popup
window.onclick = function (e) {
    if (e.target === overlay) {
        closePopup();
    }
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

window.debugMod = false;
document.getElementById("dubug-btn").addEventListener("click", function () {
    window.debugMod = !window.debugMod;
});

document.getElementById("dubug-btn2").addEventListener("click", function () {
    window.debugMod = !window.debugMod;
});


window.blocksComponent = new BlocksComponent(commands, commands2);

document.getElementById("run-blocks-btn").addEventListener("click", e => {
    try {



        let target1Commends = document.getElementById("target1").children;
        let target2Commends = document.getElementById("target2").children;

        let target1CommendsStr = "";

        //clean code:
        target1CommendsStr += "clearBackground()\n";
        target1CommendsStr += "bg('aliceblue')\n";

        let target2CommendsStr = "";

        target1CommendsStr += editor1.getValue() + "\n";
        target2CommendsStr += editor2.getValue() + "\n";


        for (let i = 0; i < target1Commends.length; i++) {
            target1CommendsStr += window.blocksComponent.getCommandString(target1Commends[i]) + "\n";
        }

        for (let i = 0; i < target2Commends.length; i++) {
            target2CommendsStr += window.blocksComponent.getCommandString(target2Commends[i])
        }


        //execute code blocks:
        new Function(target1CommendsStr)();
        new Function(target2CommendsStr)();

        callback2 = () => {

            new Function(target2CommendsStr)();
        }

    } catch (err) {
        console.log(err);
    }

})



var mousePos = { x: 0, y: 0 }
var timer = new Timer();
var keyboard = new Keyboard();
window.costume = 2;

var squere_sprite;

var npcs = new Npc();

var levels = [];


sprite.set_sprites().then(() => {

    window.ground_sprite = sprite.sprites.get('ground');
    window.grass_sprite = sprite.sprites.get('grass');
    window.water_sprite = sprite.sprites.get('water');
    window.sword_sprite = sprite.sprites.get('sword');

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
    player.level = 0;
    player.life = 10;

    player.attack = function () {
        sword.x = this.r;
        sword.y = this.t;
        sword.attackDuration = 2;
    }

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

    //# newDebugCode

    let drawDebugBackground = board.createDebugBackground(rectW, camera, levelSizeWidth, levelSizeHeight);

    //$ end newDebugCode

    npcs.addNpc(sprite, "1player-run-1", 100, 250, 1, 0);
    var drawNpcsLayer = npcs.createNpcsLayer(board.backgroundWidth, board.backgroundHeight);


    document.addEventListener("mousemove", (e) => {

        mousePos.x = e.clientX - screenRect.left
        mousePos.y = e.clientY - screenRect.top

    });


    setWindowsCommandsAfterSetSprites(sprite, board, npcs,
        levels, rectW, rectH, camera, player);

    timer.update = function (deltaTime) {

        window.deltaTime = deltaTime;

        ctx.clearRect(0, 0, canvas.width * 4, canvas.height * 4)


        drawBackground(ctx);
        if (window.debugMod) {
            drawDebugBackground(ctx, mousePos, camera);
        }

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

        //# change - update npcs after seting player posiotion

        sword.pos.x = player.rp;
        sword.pos.y = player.tp;

        npcs.update(player, sword);
        drawNpcsLayer(ctx, npcs.rects, camera, sprite);



        div_show_mouse.innerText = "x: " + Math.round(player.pos.x) + ", y: " + Math.round(player.pos.y);

        callback();
        callback2();


        npcs.iterateNpcs(npcRect => {
            stopNpcsMoveWhenCollide(npcRect, board.getAllSubjectsFromGrid(), npcRect.velocity.x, npcRect.velocity.y, sprite);
        });



        setWindowsCommandsInsideUpdate(sprite, board, npcs,
            rectW, rectH, camera, player,
            squere_sprite, sword, ctx);


    }


    timer.start()


});


function switchElementVisability(elem) {
    let displayData = elem.getAttribute("style-display-data");

    if (elem.style.display == "none") {
        //for preventing logic bugs
        if (displayData != null) {
            elem.style.display = displayData;
        } else {
            elem.style.display = "block"
        }
    } else {
        elem.style.display = "none"
    }
}

function setElementStyleDisplayData(elem) {
    elem.setAttribute("style-display-data", getComputedStyle(elem, null).display);
}


var navbarElement = document.getElementById("navbarComponent");
var editorsContainer = document.getElementById("editors-container");
var cmdlist1 = document.getElementById("commands");
var cmdlist2 = document.getElementById("commands2");
var outputElem = document.getElementById("output");
var runBtn = document.getElementById("run-btn");

var sidenav = document.getElementById("sidenav");
var inputBlocksContainer = document.getElementById("input-blocks-container");
var runBlocksBtn = document.getElementById("run-blocks-btn");


setElementStyleDisplayData(navbarElement);
setElementStyleDisplayData(editorsContainer);
setElementStyleDisplayData(cmdlist1);
setElementStyleDisplayData(cmdlist2);
setElementStyleDisplayData(outputElem);
setElementStyleDisplayData(runBtn);


setElementStyleDisplayData(sidenav);
setElementStyleDisplayData(inputBlocksContainer);
setElementStyleDisplayData(runBlocksBtn);


sidenav.style.display = "none";
inputBlocksContainer.style.display = "none";
runBlocksBtn.style.display = "none";


var switchComponentsBtn = document.getElementById("switch-components-btn");
switchComponentsBtn.innerText = "עבור למצב בלוקים"

switchComponentsBtn.addEventListener("click", e => {
    switchElementVisability(sidenav);
    switchElementVisability(inputBlocksContainer);
    switchElementVisability(cmdlist1);
    switchElementVisability(cmdlist2);
    switchElementVisability(outputElem);
    switchElementVisability(runBtn);

    switchElementVisability(navbarElement);
    switchElementVisability(editorsContainer);
    switchElementVisability(runBlocksBtn);

    //switch switchComponentsBtn inner text 
    if (inputBlocksContainer.style.display == "none") {
        switchComponentsBtn.innerText = "עבור למצב בלוקים"
    } else {
        switchComponentsBtn.innerText = "עבור למצב עורך קוד"
    }

});

let pstr1 = `<p>תזכורת: המקש 0 מיועד למכת חרב
    וכדי לצאת ממצב בדיקה יש ללחוץ עליו פעם נוספת </p>`;

let pstr2 = `<p>לא לשכוח שכל פעם שרוצים להפעיל את שורות הקוד או הבלוקים
    יש ללחוץ על ״הפעל קוד״ או על ״הפעל בלוקים״ כל פעם מחדש</p>`;

let pstr3 = `<p>כדי לעבור ממצב עריכה רגיל למצב בניית בלוקים 
    וכן להפך - יש ללחוץ על הכפתור <strong class="orange">עבור למצב אחר</strong> </p>`;

popup(pstr1 + pstr2 + pstr3);






