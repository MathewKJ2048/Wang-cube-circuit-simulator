import { Camera, toScreenCoordinates, fromScreenCoordinates } from "./renderUtil.js";
import { Vector } from "./util.js"


import { UIState, DragState, getMouseScreenPosition } from "./UI.js";

export function implementMouseDrag(ui_state: UIState, c : Camera, canvas : HTMLCanvasElement) : void
{
	canvas.addEventListener("mouseup",(e)=>{
		ui_state.dragState = DragState.FREE
	})
	canvas.addEventListener("mousedown",(e)=>{
		ui_state.dragState = DragState.DRAGGING
	})
	canvas.addEventListener("mousemove",(e) =>{
		if(ui_state.dragState === DragState.DRAGGING)
		{
			let current = getMouseScreenPosition(e,canvas)
			let diff = current.sub(ui_state.mouseScreenPosition).scale(1/c.zoom)
			c.r.x += diff.x
			c.r.y += diff.y
		}
		ui_state.mouseScreenPosition = getMouseScreenPosition(e,canvas)
	})
}