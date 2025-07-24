import { Vector } from "./util.js"
import { PlaneTiling, TileType } from "./logic.js"
import { canvas } from "./elements.js"
import { fromScreenCoordinates, Camera } from "./renderUtil.js"


export enum DragState
{
	FREE, DRAGGING
}
export enum Mode
{
	DEFAULT, SELECT_FREE, SELECT_PIN, ERASE, PLACE 
}



export class UIState
{
	dragState: DragState = DragState.FREE
	mouseScreenPosition: Vector = new Vector() // stores old values of x and y
	clipboard: PlaneTiling | null = null
	placeTileType: TileType | null = null
	mode: Mode = Mode.DEFAULT
}

export function getMouseScreenCoordinates(e : MouseEvent)
{
	const rect = canvas.getBoundingClientRect();
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;
	return new Vector(mouseX, mouseY)
}

export function getMousePosition(e: MouseEvent, c : Camera) : Vector
{
	return fromScreenCoordinates(getMouseScreenCoordinates(e),c);
}

