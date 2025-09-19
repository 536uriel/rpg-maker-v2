export function poolWithBridge(editor1) {
  let e1 = `createPool(350, 100)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)
bg("DeepSkyBlue")`;

  editor1.setValue(editor1.getValue() + "\n" + e1);
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

`
  editor1.setValue(editor1.getValue() + "\n" + c1);

  const c2 = `// כתוב כאן קוד ולחץ על הפעל קוד 
//לעולמים

if(isCollideWithDoor()){
  player.pos.x = 200     /* מיקום שחקן ברוחב */
  player.pos.y = 200     /* מיקום שחקן בגובה */
  clearBackground()      /* נקה רקע */
  player.level += 1;
  drawLevelBlocksByNumber(player.level)
}    

if(isCollideWithDownstairs()){
  player.pos.x = 200     /* מיקום שחקן ברוחב */
  player.pos.y = 200     /* מיקום שחקן בגובה */
  clearBackground()      /* נקה רקע */
  player.level -= 1;
  drawLevelBlocksByNumber(player.level)
}  
  
showCurrentLevel(100,100, fontSize = 25, color = 'purple');

if(player.level == 0){ bg("LightGreen")}else{bg("aqua")}

`

  editor2.setValue(editor2.getValue() + "\n" + c2);

}



export function example3(editor1, editor2) {
  const c1 = `
// כתוב כאן קוד שיפעל פעם אחת 
clearBackground()
x = 100
y = 100
sx = 1
sy = 0
addNpc(x, y, 0, 0)
addNpc(100, 100, 2, 0)

createPool(350, 100)
createPool(500, 100)
createPool(650, 100)

addBridge(350, 150)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)

addBridge(500, 200)
addBridge(550, 200)
addBridge(550, 250)
addBridge(600, 200)


createBlueHouse(350,300)
createOrangeHouse(450,300)
createRedHouse(600,300)

addBridge(550, 300)
addBridge(550, 350)

bg("MediumTurquoise")

`
  editor1.setValue(editor1.getValue() + "\n" + c1);

  const c2 = `// כתוב כאן קוד שיפעל לעולמים 

print("e1 pos x: " + getNpcPosX(0) + " , e1 pos y: " +getNpcPosY(0),50,50, 20, "red")

if(!isBlocksCollideWithAnyNpcs()){
x += sx
y += sy
setNpc(0, x, y, 0, 0)
}


if(x > 298){
  sx = 0
  sy = 1
}

if(y >= 200){
  y = 200
  sx = 1
  sy = 0
}

print("p1", player.x , player.y , 20, "blue")
print("e1", x - player.pos.x + player.x, y - player.pos.y  + player.y, 20, "red")

whenAttackDeleteNpc()
if(getNpcsLen() < 1){
x = 100
y = 100
sx = 1
sy
addNpc(x, y, 0, 0)
}
    `

  editor2.setValue(editor2.getValue() + "\n" + c2);

}

export function example4(editor1, editor2) {
  const c1 = `// הקוד שפועל פעם אחת
clearBackground()
bg("Wheat")
addNpc(100,100,1, 0)
addNpc(100,100,0, 1)

addNpc(100,100,3, 0)
addNpc(100,100,0, 3)

createPool(350, 100)
addBridge(350, 150)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)
`
  editor1.setValue(editor1.getValue() + "\n" + c1);

  const c2 = `// הקוד שפועל לעולמים
whenAttackDeleteNpc()

for(var i = 0; i < getNpcsLen(); i++){
  
  if(getNpcPosX(i) >= 200 ){
    setNpc(i, getNpcPosX(i), getNpcPosY(i), 0, 1)
    }
  
    if(getNpcPosY(i) >= 200){
    	setNpc(i, getNpcPosX(i) , 200, 1, 0)
  }
}
    `

  editor2.setValue(editor2.getValue() + "\n" + c2);

}