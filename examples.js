export function poolWithBridge(editor1, editor2) {
  let e1 = `// כתוב כאן קוד ולחץ על הפעל קוד 
clearBackground()      /* נקה רקע */
bg("aliceblue")     /* צבע רקע בצבע */
createPool(350, 100)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)

addBridge(350, 150)
addBridge(450, 250)
bg("DeepSkyBlue")

addBigHouse(500,100)        /* (x,y) צור בית גדול במיקום*/
addBigHouse(500,250)        /* (x,y) צור בית גדול במיקום*/

addShootingBoss(5, 450,200)        /* (difficulty ,x, y) הוסף אוייב מכשף */
addShootingBoss(2, 400, 350)        /* (difficulty ,x, y) הוסף אוייב מכשף */

setNpcCostume(0, random(1,9))       /* (npc_number, costum_number)הגדר מספר תלבושת לאוייב */

player.life = 10       /* קבע חיים של שחקן ל10 */
time = 0

lastSpawn = 0;  // הזמן שבו יצרנו אויב לאחרונה

`;

  editor1.setValue(editor1.getValue() + "\n" + e1);

  const c2 = `print('חיים:  ' + player.life, 100, 100, 30, 'red')     /* ('text',x,y,font_width, 'color')הדפס כיתוב */
time += 1/60
print('זמן:  ' + Math.round(time), 100, 50, 30, 'yellow')     /* ('text',x,y,font_width, 'color')הדפס כיתוב */

if(time - lastSpawn >= 5){
  addShootingBoss(random(1,10), random(300,450), random(50,450))        /* (difficulty ,x, y) הוסף אוייב מכשף */
  setNpcCostume(0, random(1,9))       /* (npc_number, costum_number)הגדר מספר תלבושת לאוייב */
  lastSpawn = time; // עדכון הזמן האחרון
}  

  `

  editor2.setValue(editor2.getValue() + "\n" + c2);
}


export function example2(editor1, editor2) {
  const c1 = `clearBackground()      /* נקה רקע */
bg("LimeGreen")     /* צבע רקע בצבע */
player.pos.x = 200     /* מיקום שחקן ברוחב */
player.pos.y = 200     /* מיקום שחקן בגובה */

addGiantHouse(300,150)         /* (x,y) צור בית ענק במיקום*/

addDoor(350,300)      /* (x,y) צור דלת במיקום */

addThisLevel()     /* הוסף בלוקים במסך לשלב נפרד */
clearBackground()      /* נקה רקע */


createGridFloor(50,50,5,5)        /* צור רצפה מרוצפת */

createBlueWall(50,50, 1, 6)     /* הוסף קיר כחול */
createBlueWall(50,200, 1, 4)     /* הוסף קיר כחול */


createBlueWall(100, 50, 2, 1)     /* הוסף קיר כחול */
createBlueWall(200, 50, 1, 1)     /* הוסף קיר כחול */
createBlueWall(250, 50, 2, 1)     /* הוסף קיר כחול */

createBlueWall(350,50, 1, 6)     /* הוסף קיר כחול */
createBlueWall(350,200, 1, 4)     /* הוסף קיר כחול */

createBlueWall(100, 350, 2, 1)     /* הוסף קיר כחול */
createBlueWall(200, 350, 2, 1)     /* הוסף קיר כחול */
createBlueWall(250, 350, 2, 1)     /* הוסף קיר כחול */


addDownstairs(300,300)       /* הוסף מדרגות למטה */

addShelf(100,100)     /* הוסף מדף */
addShelf(100,300)     /* הוסף מדף */


addThisLevel()     /* הוסף בלוקים במסך לשלב נפרד */
clearBackground()      /* נקה רקע */

drawLevelBlocksByNumber(0)

player.level = 0      /* מספר שלב של השחקן */
player.life = 10       /* קבע חיים של שחקן ל10 */

`
  editor1.setValue(editor1.getValue() + "\n" + c1);

  const c2 = `
// כתוב כאן קוד ולחץ על הפעל קוד 
//לעולמים

if(isCollideWithDoor()){
  player.pos.x = 200     /* מיקום שחקן ברוחב */
  player.pos.y = 250     /* מיקום שחקן בגובה */
  clearBackground()      /* נקה רקע */
  player.level += 1;
  drawLevelBlocksByNumber(player.level)
  addShootingBoss(2, 250, 100)        /* (difficulty ,x, y) הוסף אוייב מכשף */
}    

if(isCollideWithDownstairs()){
  player.pos.x = 200     /* מיקום שחקן ברוחב */
  player.pos.y = 250     /* מיקום שחקן בגובה */
  clearBackground()      /* נקה רקע */
  player.level -= 1;
  drawLevelBlocksByNumber(player.level)
}  
  
showCurrentLevel(100,100, fontSize = 25, color = 'purple');

if(player.level == 0){ bg("LightGreen")}else{bg("aqua")}

whenAttackDeleteNpc()      /* כאשר שחקן תוקף מחק אוייב */
print("חיים : " + player.life, 100, 50, 30, 'red')     /* ('text',x,y,font_width, 'color')הדפס כיתוב */

`

  editor2.setValue(editor2.getValue() + "\n" + c2);

}



export function example3(editor1, editor2) {

  let addStrLevelCode1 = `
addShootingBoss(2, 100,100)        /* (difficulty ,x, y) הוסף אוייב מכשף */
setNpcCostume(0, 6)       /* (npc_number, costum_number)הגדר מספר תלבושת לאוייב */
addShootingBoss(2, 200,300)        /* (difficulty ,x, y) הוסף אוייב מכשף */
setNpcCostume(1, 4)       /* (npc_number, costum_number)הגדר מספר תלבושת לאוייב */
addBigHouse(50,300)        /* (x,y) צור בית גדול במיקום*/

text = "שלום לך"
font = 20
color = "purple"

text2 = "שלום לך"
font2 = 20
color2 = "green"
  `

  const c1 = `
// כתוב כאן קוד שיפעל פעם אחת 
clearBackground()
bg("DarkTurquoise")     /* צבע רקע בצבע */

player.pos.x = 200     /* מיקום שחקן ברוחב */
player.pos.y = 100     /* מיקום שחקן בגובה */

addGiantHouse(300,150)         /* (x,y) צור בית ענק במיקום*/

addDoor(350,300)      /* (x,y) צור דלת במיקום */

addThisLevel()     /* הוסף בלוקים במסך לשלב נפרד */
clearBackground()      /* נקה רקע */


createGridFloor(50,50,5,5)        /* צור רצפה מרוצפת */

createBlueWall(50,50, 1, 6)     /* הוסף קיר כחול */
createBlueWall(50,200, 1, 4)     /* הוסף קיר כחול */


createBlueWall(100, 50, 2, 1)     /* הוסף קיר כחול */
createBlueWall(200, 50, 1, 1)     /* הוסף קיר כחול */
createBlueWall(250, 50, 2, 1)     /* הוסף קיר כחול */

createBlueWall(350,50, 1, 6)     /* הוסף קיר כחול */
createBlueWall(350,200, 1, 4)     /* הוסף קיר כחול */

createBlueWall(100, 350, 2, 1)     /* הוסף קיר כחול */
createBlueWall(200, 350, 2, 1)     /* הוסף קיר כחול */
createBlueWall(250, 350, 2, 1)     /* הוסף קיר כחול */


addDownstairs(300,300)       /* הוסף מדרגות למטה */

addShelf(100,100)     /* הוסף מדף */
addShelf(100,300)     /* הוסף מדף */


addThisLevel()     /* הוסף בלוקים במסך לשלב נפרד */
clearBackground()      /* נקה רקע */

drawLevelBlocksByNumber(0)

player.level = 0      /* מספר שלב של השחקן */
player.life = 20       /* קבע חיים של שחקן ל20 */

${addStrLevelCode1}

`
  editor1.setValue(editor1.getValue() + "\n" + c1);


  let addStrLevelCode2 = `
  setNpcDetination(0, 1, 400, 100)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */
setNpcDetination(0, 2, 100, 200)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */
setNpcDetination(0, 3, 350, 350)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */

setNpcDetination(1, 1, 400, 100)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */
setNpcDetination(1, 2, 100, 200)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */
setNpcDetination(1, 3, 350, 350)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */
printTextToNpc(0,text, font, color)  /*(npcNum = 0, text = 'text', font = 20, color = red)*/
if(player.pos.x > 400){
  	text = "לאן אתה בורח?"; font = 40;color = "red"
}else{
    text = "שלום"; font = 20; color = "purple"
}

printTextToNpc(1,text2, font2, color2)  /*(npcNum = 0, text = 'text', font = 20, color = red)*/
if(player.pos.x > 400){
  	text2 = "פחדן!!, תפוס אותו"; font2 = 30;color2 = "pink"
}else{
    text2 = "מי אתה?"; font2 = 20; color2 = "green"
}

  `;

  const c2 = `
  if(isCollideWithDoor()){
  deleteNpc();
  player.pos.x = 200     /* מיקום שחקן ברוחב */
  player.pos.y = 250     /* מיקום שחקן בגובה */
  clearBackground()      /* נקה רקע */
  player.level += 1;
  drawLevelBlocksByNumber(player.level)
  addShootingBoss(2, 250, 100)        /* (difficulty ,x, y) הוסף אוייב מכשף */
}    

if(isCollideWithDownstairs()){
  deleteNpc();
  player.pos.x = 200     /* מיקום שחקן ברוחב */
  player.pos.y = 100     /* מיקום שחקן בגובה */
  clearBackground()      /* נקה רקע */
  player.level -= 1;
  drawLevelBlocksByNumber(player.level)

  ${addStrLevelCode1}
}  
  
showCurrentLevel(100,100, fontSize = 25, color = 'purple');

if(player.level == 0){ bg("LightGreen")
 ${addStrLevelCode2} 
 }else{bg("aqua")}

whenAttackDeleteNpc()      /* כאשר שחקן תוקף מחק אוייב */
print("חיים : " + player.life, 100, 50, 30, 'red')     /* ('text',x,y,font_width, 'color')הדפס כיתוב */

    `

  editor2.setValue(editor2.getValue() + "\n" + c2);

}

export function example4(editor1, editor2) {
  const c1 = `

// דוגמה לקוד מוכן:
clearBackground()      /* נקה רקע */
bg("#3ed652")     /* צבע רקע בצבע */

for(let i = 2;i < 11;i++){
	for(let j of ([1,5])){
  		rect(50 * i, j * 50)     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  
  	for(let j of ([2,3,4])){
  		rect(50 * i, j * 50, "water")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  
}

for(let a = 1;a < 6;a++){
	for(let b of ([1,10])){
  	rect(50 * b, 50 * a, "grass")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  	for(let b of ([2,9])){
  	rect(50 * b, 50 * a, "ground")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
}

addBridge(300, 250)        /* הוסף גשר */
addBridge(250, 250)        /* הוסף גשר */
createPool(550, 50)       /* (x,y) צור בריכה */
createOrangetree(550, 250)     /* הוסף עץ תפוזים */

for(let a = 9;a < 14;a++){
  for(let b of ([2,3])){
    addBridge(50 * a, 50 * b)        /* הוסף גשר */
  }
}
addBigHouse(450,300)        /* (x,y) צור בית גדול במיקום*/



// דוגמה לקוד מוכן:
clearBackground()      /* נקה רקע */
bg("#3ed652")     /* צבע רקע בצבע */

deleteNpc()

for(let i = 2;i < 11;i++){
	for(let j of ([1,5])){
  		rect(50 * i, j * 50)     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  
  	for(let j of ([2,3,4])){
  		rect(50 * i, j * 50, "water")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  
}

for(let a = 1;a < 6;a++){
	for(let b of ([1,10])){
  	rect(50 * b, 50 * a, "grass")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  	for(let b of ([2,9])){
  	rect(50 * b, 50 * a, "ground")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
}

addBridge(300, 250)        /* הוסף גשר */
addBridge(250, 250)        /* הוסף גשר */
createPool(550, 50)       /* (x,y) צור בריכה */
createOrangetree(550, 250)     /* הוסף עץ תפוזים */

for(let a = 9;a < 14;a++){
  for(let b of ([2,3])){
    addBridge(50 * a, 50 * b)        /* הוסף גשר */
  }
}
addBigHouse(450,300)        /* (x,y) צור בית גדול במיקום*/



clearBackground()      /* נקה רקע */
bg("#3ed652")     /* צבע רקע בצבע */

for(let i = 2;i < 11;i++){
	for(let j of ([1,5])){
  		rect(50 * i, j * 50)     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  
  	for(let j of ([2,3,4])){
  		rect(50 * i, j * 50, "water")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  
}

for(let a = 1;a < 6;a++){
	for(let b of ([1,10])){
  	rect(50 * b, 50 * a, "grass")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
  	for(let b of ([2,9])){
  	rect(50 * b, 50 * a, "ground")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
	}
}

addBridge(300, 250)        /* הוסף גשר */
addBridge(250, 250)        /* הוסף גשר */
createPool(550, 50)       /* (x,y) צור בריכה */
createOrangetree(550, 250)     /* הוסף עץ תפוזים */

for(let a = 9;a < 14;a++){
  for(let b of ([2,3])){
    addBridge(50 * a, 50 * b)        /* הוסף גשר */
  }
}
addBigHouse(450,300)        /* (x,y) צור בית גדול במיקום*/

deleteNpc()

addNpc(350, 150,1,0)       /* (x,y,speedx,speedy) הוסף אוייב */
rect(650, 150, "grass")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */
rect(650, 200, "grass")     /*  (x,y,('ground'||'grass'||'water')) צור בלוק אדמה במיקום */

playerText = "בוא אחרי"
playerColorText = "yellow"
playerFontText = 20

isMission1Complete = false
isMission2Started = false

npcText = "אני בא"
npcColorText = "blue"
npcFontText= 20

helpToNpc = false

startMission3 = false


setNpcCostume(0, 6)       /* (npc_number, costum_number)הגדר מספר תלבושת לאוייב */



time = 0
lastTime = 0
posTime = false

makeActionOnce = true
makeAction2Once = true

// הגדירו כאן משימה 2
makeActionsAtMission = function(){    
  			addNpc(250, 250, 0, 1)
      }

`
  editor1.setValue(editor1.getValue() + "\n" + c1);

  const c2 = `

// כתוב כאן קוד ולחץ על הפעל קוד 
 print(playerText , player.x, player.y, playerFontText, playerColorText)     /* ('text',x,y,font_width, 'color')הדפס כיתוב */
printTextToNpc(0, npcText, npcFontText, npcColorText)  /*(npcNum = 0, text = 'text', font = 20, color = red)*/

if(player.pos.x > 700){
  playerText = "למה נשארת מאחור?"
  playerColorText = "red"
  playerFontText = 25
}else{
  if(getNpcPosX(0) < 550){
  playerText = "בוא אחרי"
  playerColorText = "yellow"
  playerFontText = 20
  }
}

if(getNpcPosX(0) > 550){
    npcText = "אני תקוע"
    npcColorText = "purple"
	npcFontText= 30
  
  if(isCollideWithNpc(0)){
  	helpToNpc = true
  }
  
  if(player.pos.x > 700){
    	playerText = "חכה אני בא"
    	playerColorText = "green"
    	playerFontText = 27
	}
}

if(helpToNpc == true && isMission1Complete == false){
  if(player.pos.x < 800){
  	setNpc(0, player.pos.x - 50, player.pos.y, 1, 0)        /* (npc_number,x,y,speedx,speedy)הגדר אוייב */
  	}else{      
      helpToNpc = false
      isMission1Complete = true;
    }
  }
  
if(isMission1Complete == true){
    npcText = "תודה רבה לך"
    npcColorText = "blue"
	npcFontText= 30
  
    playerText = "משימה 1 הושלמה"
	playerColorText = "purple"
	playerFontText = 25
  if(getNpcPosY(0) < 400){
  		setNpcDetination(0, 1, 600, 450)      /* (npcNumber, destNum, x, y) הגדר מיקום הגעה לאוייב */
  	}else{
      setNpc(0, 600, 450, 0, 0)        /* (npc_number,x,y,speedx,speedy)הגדר אוייב */
      isMission2Started = true
    }
  }

if(isMission2Started == true){
    npcText = "יש לי משימה בשבילך"
	npcColorText = "red"
	npcFontText= 25
  
  if(player.pos.y > 350){
    playerText = "מה אתה צריך?"
	  playerColorText = "yellow"
	  playerFontText = 25
    
  npcText = "יש לי גנב בבית ואני מפחד"
	npcColorText = "red"
	npcFontText= 30
	posTime = true
    
  }
}

if(!posTime){
    lastTime = time;
	time += 1/60
}
    print('time: ' + Math.round(time), 100, 100, 20, 'red')     /* ('text',x,y,font_width, 'color')הדפס כיתוב */

if(posTime == true && makeActionOnce == true){
  missionsPopup(2, "האם מקבל משימה?", makeActionsAtMission).then(func => {
  	func();
  })
  makeActionOnce = false;
}

if(getNpcsLen() >= 1 && posTime == true && startMission3 == false){
	if(isSwordAttcksNpcs() == 1){
		deleteNpc(1);
		startMission3 = true
        posTime = false

	}
}

if(startMission3 == true){
        npcText = "שוב תודה לך"
		npcColorText = "blue"
		npcFontText= 23  
}
    `

  editor2.setValue(editor2.getValue() + "\n" + c2);

}