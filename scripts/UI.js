import { Vector } from "./util.js";
import { canvas } from "./elements.js";
import { fromScreenCoordinates } from "./renderUtil.js";
export var DragState;
(function (DragState) {
    DragState[DragState["FREE"] = 0] = "FREE";
    DragState[DragState["DRAGGING"] = 1] = "DRAGGING";
})(DragState || (DragState = {}));
export var Mode;
(function (Mode) {
    Mode[Mode["DEFAULT"] = 0] = "DEFAULT";
    Mode[Mode["SELECT_FREE"] = 1] = "SELECT_FREE";
    Mode[Mode["SELECT_PIN"] = 2] = "SELECT_PIN";
    Mode[Mode["ERASE"] = 3] = "ERASE";
    Mode[Mode["PLACE"] = 4] = "PLACE";
})(Mode || (Mode = {}));
export class UIState {
    constructor() {
        this.dragState = DragState.FREE;
        this.mouseScreenPosition = new Vector(); // stores old values of x and y
        this.clipboard = null;
        this.placeTileType = null;
        this.mode = Mode.DEFAULT;
    }
}
export function getMouseScreenCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return new Vector(mouseX, mouseY);
}
export function getMousePosition(e, c) {
    return fromScreenCoordinates(getMouseScreenCoordinates(e), c);
}
