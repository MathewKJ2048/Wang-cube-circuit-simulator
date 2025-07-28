import { Vector } from "./util.js"
import { PlaneTiling, TileType } from "./logic.js"
import { canvas } from "./elements.js"
import { fromScreenCoordinates, Camera } from "./render_util.js"
import type { PerspectiveCamera } from "three";
import { getPerspectiveCamera } from "./preview.js";


export class DragState
{
	static FREE = 1;
	static DRAGGING = 2
}
export class Mode
{
	static DEFAULT = 0 
	static SELECT_FREE = 1
	static SELECT_PIN = 2
	static ERASE = 3
	static PLACE = 4
}


export type PickedToken = TileType | PlaneTiling | null



export class UIState // to do with the main canvas
{
	camera: Camera = new Camera() // camera used to render the canvas
	perspectiveCamera : PerspectiveCamera = getPerspectiveCamera()
	dragState: DragState = DragState.FREE // checks whether the mouse is dragging
	mouseScreenPosition: Vector = new Vector() // stores old values of x and y
	private pickedToken : PickedToken = null;
	mode: Mode = Mode.DEFAULT
	gridEnabled: boolean = true
	regexEnabled: boolean = false
	searchQuery: string = ""
	public setPickedToken(pt: PickedToken) : void
	{
		this.pickedToken = pt
		if(this.pickedToken === null && this.mode === Mode.PLACE)this.mode = Mode.DEFAULT
	}
	public getPickedToken() : PickedToken
	{
		return this.pickedToken
	}
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

