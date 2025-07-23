import { Vector } from "./util.js"

export class Camera
{
	r : Vector = new Vector() // position vector
	zoom : number = 50
}

export function toScreenCoordinates(p : Vector, c : Camera, canvas : HTMLCanvasElement): Vector
{
	return new Vector(canvas.width/2 + (p.x-c.r.x)*c.zoom, canvas.height/2 - (p.y-c.r.y)*c.zoom)
}

export function fromScreenCoordinates(p : Vector, c : Camera, canvas : HTMLCanvasElement): Vector
{
	return new Vector((p.x-canvas.width/2)/c.zoom + c.r.x, (canvas.height/2 - p.y)/c.zoom + c.r.y)
}

export function isOnScreen(p : Vector, c : Camera, canvas : HTMLCanvasElement)
{
	let sc = toScreenCoordinates(p,c,canvas)
	return 0 <= sc.x && sc.x <= canvas.width && 0 <= sc.y && sc.y <= canvas.height
}