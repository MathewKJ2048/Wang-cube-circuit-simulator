import { canvas } from "./elements.js";
import { DragState, getMouseScreenCoordinates } from "./UI.js";
export function implementMouseDrag(ui_state, c) {
    canvas.addEventListener("mouseup", (e) => {
        ui_state.dragState = DragState.FREE;
    });
    canvas.addEventListener("mousedown", (e) => {
        ui_state.dragState = DragState.DRAGGING;
    });
    canvas.addEventListener("mousemove", (e) => {
        if (ui_state.dragState === DragState.DRAGGING) {
            let current = getMouseScreenCoordinates(e);
            let diff = current.sub(ui_state.mouseScreenPosition).scale(1 / c.zoom);
            c.r.x -= diff.x;
            c.r.y += diff.y; // direction of drag is opposite
        }
        ui_state.mouseScreenPosition = getMouseScreenCoordinates(e);
    });
}
