//@ component start from here:
export class BlocksComponent {

    constructor(commands, commands2) {

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
                    input.id = crypto.randomUUID();
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
            a.classList.add("green")
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
            a.classList.add("blue")
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
                const inside =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                // Remove clone if dropped outside
                if (!inside) el.remove();
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

}
