import { Point } from "./util.js"


export enum DragState
{
	FREE, DRAGGING
}



export class UIState
{
	dragState: DragState = DragState.FREE
	mousePoint: Point = new Point() // stores old values of x and y
}

export function getMouseScreenCoordinates(e : MouseEvent, canvas : HTMLCanvasElement)
{
	const rect = canvas.getBoundingClientRect();
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;
	return new Point(mouseX, mouseY)
}