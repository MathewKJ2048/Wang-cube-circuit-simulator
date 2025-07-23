import { Vector } from "./util.js"


export enum DragState
{
	FREE, DRAGGING
}



export class UIState
{
	dragState: DragState = DragState.FREE
	mouseScreenPosition: Vector = new Vector() // stores old values of x and y
}

export function getMouseScreenPosition(e : MouseEvent, canvas : HTMLCanvasElement)
{
	const rect = canvas.getBoundingClientRect();
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;
	return new Vector(mouseX, mouseY)
}