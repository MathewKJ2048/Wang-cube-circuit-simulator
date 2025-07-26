import { Camera } from "./render_util.js";
import { canvas } from "./elements.js";



import { UIState, DragState, getMouseScreenCoordinates } from "./UI.js";

export function implementMouseDrag(ui_state: UIState, c : Camera) : void
{
	canvas.addEventListener("mouseup",()=>{
		ui_state.dragState = DragState.FREE
	})
	canvas.addEventListener("mousedown",()=>{
		ui_state.dragState = DragState.DRAGGING
	})
	canvas.addEventListener("mousemove",(e) =>{
		if(ui_state.dragState === DragState.DRAGGING)
		{
			let current = getMouseScreenCoordinates(e)
			let diff = current.sub(ui_state.mouseScreenPosition).scale(1/c.zoom)
			c.r.x -= diff.x
			c.r.y += diff.y // direction of drag is opposite
		}
		ui_state.mouseScreenPosition = getMouseScreenCoordinates(e)
	})
}