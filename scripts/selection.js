import { Mode, getMousePosition } from "./UI.js";
import { Vector } from "./util.js";
import { canvas, selectButton } from "./elements.js";
export class SelectionZone {
    constructor() {
        this.topLeft = new Vector();
        this.bottomRight = new Vector();
    }
}
export function setupSelection(ui_state, selectionZone, c) {
    selectButton.addEventListener('click', (e) => {
        ui_state.mode = Mode.SELECT_FREE;
        console.log(Mode[ui_state.mode]);
    });
    canvas.addEventListener('click', (e) => {
        if (ui_state.mode == Mode.SELECT_FREE) {
            ui_state.mode = Mode.SELECT_PIN;
            selectionZone.topLeft = getMousePosition(e, c);
            selectionZone.bottomRight = getMousePosition(e, c);
        }
        else if (ui_state.mode == Mode.SELECT_PIN) {
            ui_state.mode = Mode.DEFAULT;
        }
        console.log(Mode[ui_state.mode]);
    });
    canvas.addEventListener('mousemove', (e) => {
        if (ui_state.mode == Mode.SELECT_PIN) {
            selectionZone.bottomRight = getMousePosition(e, c);
        }
    });
}
