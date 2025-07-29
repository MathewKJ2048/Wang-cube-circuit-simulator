import { Vector } from "./util.js"
import { PlaneTiling, TileType, WangFile } from "./logic.js"
import { canvas } from "./elements.js"
import { fromScreenCoordinates, Camera, snapToGrid } from "./render_util.js"
import type { PerspectiveCamera } from "three";
import { getPerspectiveCamera } from "./preview.js";


export class DragState
{
	static readonly FREE = 1
	static readonly DRAGGING = 2
}
export class Mode
{
	static readonly DEFAULT = 1
	static readonly SELECT = 2
	static readonly ERASE = 3
	static readonly PLACE = 4
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
	public setPickedToken(pt: PickedToken, wf : WangFile) : void // conditions: picked token must be part of wangfile, and is tied to the mode - mode cannot be PLACe when picker is null
	{
		if(TileType.isTileType(pt) && !wf.tileTypes.some(tt => TileType.equals(tt,pt)))console.log("PT INTEGRITY VIOLATED - TILETYPE")
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

export function getMousePositionSnapped(e : MouseEvent, c : Camera) : Vector
{
	return snapToGrid(getMousePosition(e,c))
}
