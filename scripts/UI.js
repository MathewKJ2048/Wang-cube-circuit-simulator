import { Vector } from "./util.js";
export var DragState;
(function (DragState) {
    DragState[DragState["FREE"] = 0] = "FREE";
    DragState[DragState["DRAGGING"] = 1] = "DRAGGING";
})(DragState || (DragState = {}));
export class UIState {
    constructor() {
        this.dragState = DragState.FREE;
        this.mouseScreenPosition = new Vector(); // stores old values of x and y
    }
}
export function getMouseScreenPosition(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return new Vector(mouseX, mouseY);
}
