export function poolWithBridge(editor1) {
    let e1 = `createPool(350, 100)
addBridge(350, 200)
addBridge(400, 200)
addBridge(450, 200)`;

    editor1.setValue(editor1.getValue() + "\n" + e1);
}