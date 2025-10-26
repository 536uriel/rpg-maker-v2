//@ component start from here:
class UpwardColorRgb {
    constructor() {
        this.red = 100;
        this.green = 0;
        this.blue = 0;

        this.ored = 150;
        this.ogreen = 250;
        this.oblue = 250;
    }

    getRgbColorStr() {
        if (this.red <= 220) {
            this.red += 30;
        } else {
            if (this.green <= 220) {
                this.green += 30;
            } else {
                if (this.blue <= 240) {
                    this.blue += 10;
                }
            }
        }

        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }


    getOpositeRgbColorStr() {
        if (this.ored >= 40) {
            this.ored -= 30;
        } else {
            if (this.ogreen >= 40) {
                this.ogreen -= 30;
            } else {
                if (this.oblue >= 20) {
                    this.oblue -= 10;
                }
            }
        }

        return `rgb(${this.ored}, ${this.ogreen}, ${this.oblue})`;
    }
}


export class BlocksComponent {

    constructor(commands, commands2) {

        const rgbColor = new UpwardColorRgb();

        this.commands = commands;
        this.commands2 = commands2;

        // Converts numbers in parentheses into <input> fields
        function replaceNumbersWithInputs(element) {
            const text = element.textContent.trim();
            const match = text.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\(([^)]*)\)([\s\S]*)$/);
            if (!match) return;

            const funcName = match[1];
            const args = match[2].split(',').map(s => s.trim());
            const trailingText = match[3];

            element.innerHTML = '';
            element.append(document.createTextNode(funcName + '('));

            args.forEach((arg, i) => {
                const input = document.createElement('input');
                if (crypto != null && crypto != undefined) {
                    input.name = crypto.randomUUID();
                }
                input.type = 'text';
                input.value = arg;
                input.style.width = '50px';
                input.style.margin = '0 4px';
                element.append(input);
                if (i < args.length - 1) {
                    element.append(document.createTextNode(', '));
                }
            });

            element.append(document.createTextNode(')'));
            if (trailingText) element.append(document.createTextNode(trailingText));
        }


        var lencmds = commands.length;

        var sidenavAlist = document.getElementById("sidenav-commends-drop-down");

        commands.forEach((command, index) => {
            let a = document.createElement("a");

            a.innerText = command;

            if (crypto != null && crypto != undefined) {
                let uuid = crypto.randomUUID();
                a.id = uuid;
                a.setAttribute("data-id", uuid);
            } else {
                a.setAttribute("data-id", index);
            }

            a.draggable = "true"
            a.classList.add("draggable")
            a.style.background = rgbColor.getRgbColorStr();
            a.style.color = rgbColor.getOpositeRgbColorStr();
            replaceNumbersWithInputs(a);

            sidenavAlist.appendChild(a);
        });


        commands2.forEach((command, index) => {
            let a = document.createElement("a");

            a.innerText = command;

            if (crypto != null && crypto != undefined) {
                let uuid = crypto.randomUUID();
                a.id = uuid;
                a.setAttribute("data-id", uuid);
            } else {
                a.setAttribute("data-id", lencmds + index);
            }

            a.draggable = "true"
            a.classList.add("draggable")
            a.style.background = rgbColor.getRgbColorStr();
            a.style.color = rgbColor.getOpositeRgbColorStr();
            replaceNumbersWithInputs(a);

            sidenavAlist.appendChild(a);
        });

        ///////

        (["target1", "target2"]).forEach((targetStr, index_target) => {


            let target = document.getElementById(targetStr);

            let draggedEl = null;
            let offsetX = 0;
            let offsetY = 0;



            // Start dragging (source or clone)
            document.addEventListener('dragstart', e => {

                const el = e.target;
                if (el.classList.contains('draggable') || el.classList.contains('clone')) {
                    draggedEl = el;
                    const rect = el.getBoundingClientRect();
                    offsetX = e.clientX - rect.left;
                    offsetY = e.clientY - rect.top;
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        id: el.dataset.id,
                        isClone: el.classList.contains('clone'),
                        instanceId: el.dataset.instanceId || null
                    }));
                }
            });

            target.addEventListener('dragover', e => e.preventDefault());

            // Drop inside target
            target.addEventListener('drop', e => {
                e.preventDefault();
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const rect = target.getBoundingClientRect();
                const x = e.clientX - rect.left - offsetX;
                const y = e.clientY - rect.top - offsetY;

                // Case 1: dragging an existing clone inside target -> move it
                if (data.isClone && draggedEl && target.contains(draggedEl)) {
                    draggedEl.style.left = x + 'px';
                    draggedEl.style.top = y + 'px';
                    return;
                }

                // Case 2: dragging from source -> create new clone
                const original = document.querySelector(`.draggable[data-id="${data.id}"]`);
                const clone = original.cloneNode(true);
                clone.classList.add('clone');

                let tmpuuid = crypto.randomUUID();
                if (tmpuuid) {
                    clone.id = tmpuuid;
                } else {
                    clone.id = original.id + "clone";
                }

                clone.style.left = x + 'px';
                clone.style.top = y + 'px';
                clone.setAttribute('draggable', 'true');
                clone.dataset.instanceId = Math.random().toString(36).slice(2);
                target.appendChild(clone);
            });

            // Detect end of drag (for removal when dropped outside)
            document.addEventListener('dragend', e => {

                if (!draggedEl) return;
                const el = draggedEl;
                draggedEl = null;

                if (!el.classList.contains('clone')) return;

                const rect = target.getBoundingClientRect();

                //!need to fix
                const insideLeftRight =
                    e.pageX >= rect.left &&
                    e.pageX <= rect.right

                // alert(e.pageX + ",(>=) " + rect.left + ",,,"
                //     + e.pageX + ",(<=) " + rect.right + ",,,"
                //     + e.pageY + ",(>=) " + rect.top + ",,,"
                //     + e.pageY + ",(<=) " + rect.bottom + ",,,"
                // )
                // Remove clone if dropped outside
                if (!insideLeftRight) el.remove();
            });

        });
    }

    // Builds the text string back (with current input values)

    getCommandString(element) {
        let result = '';
        for (const node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                result += node.textContent;
            } else if (node.tagName === 'INPUT') {
                result += node.value;
            }
        }
        return result.trim();
    }

    setInputsNumsBySameCommandString(elem, command) {

        //gets only inputs elements inside a
        let inputs = elem.querySelectorAll('input[type="text"]');

        if (inputs.length == 0) {
            return;
        }

        //takes values from commands
        let strNumsArr = ((command.split("(")[1]).split(")")[0]).split(",");

        //filter the numbers values only from strCommand
        strNumsArr = strNumsArr.filter(strNum => typeof parseInt(strNum) === 'number' && !isNaN(parseInt(strNum)));
        
        strNumsArr.forEach((strNum, i) => {
            
            if (typeof parseInt(inputs[i].value) === 'number' && !isNaN(parseInt(inputs[i].value))) {
                console.log(parseInt(inputs[i].value))
                let num = parseInt(strNum);
                inputs[i].value = num;
            }
        });

    }

}
