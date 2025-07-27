import { canvas } from "./elements.js";
import { UIState, DragState, getMouseScreenCoordinates } from "./UI.js";



export function setUpMouseDrag(ui_state: UIState) : void
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
			let diff = current.sub(ui_state.mouseScreenPosition).scale(1/ui_state.camera.zoom)
			ui_state.camera.r.x -= diff.x
			ui_state.camera.r.y += diff.y // direction of drag is opposite
		}
		ui_state.mouseScreenPosition = getMouseScreenCoordinates(e)
	})
}