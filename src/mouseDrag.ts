import { Camera, toScreenCoordinates, fromScreenCoordinates } from "./render.js";
import { Point } from "./util.js"


import { UIState, DragState, getMouseScreenCoordinates } from "./UI.js";

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
			let current = getMouseScreenCoordinates(e,canvas)
			let diff = current.sub(ui_state.mousePoint).scale(1/c.zoom)
			c.p.x += diff.x
			c.p.y += diff.y
		}
		ui_state.mousePoint = getMouseScreenCoordinates(e,canvas)
	})
}