export function poolWithBridge(editor1) {
  let e1 = `createPool(350, 100)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)`;

  editor1.setValue(editor1.getValue() + "\n" + e1);
}


export function example2(editor1, editor2) {
  const c1 = `// כתוב כאן קוד שיפעל פעם אחת 
clearBackground()
x = 100
y = 100
sx = 1
sy = 0
addNpc(x, y, 0, 0)
addNpc(100, 100, 2, 0)

createPool(350, 100)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)

`
  editor1.setValue(editor1.getValue() + "\n" + c1);

  const c2 = `// כתוב כאן קוד שיפעל לעולמים 
x += sx
y += sy

setNpc(0, x, y, 0, 0)

if(x > 300){
  sx = 0
  sy = 1
}

if(y > 200){
  sx = 1
  sy = 0
}

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

export function example3(editor1, editor2) {
  const c1 = `// הקוד שפועל פעם אחת
clearBackground()

addNpc(100,100,1, 0)
addNpc(100,100,0, 1)

addNpc(100,100,3, 0)
addNpc(100,100,0, 3)

createPool(350, 100)
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