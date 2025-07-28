import { Vector } from "./util.js"
import { canvas } from "./elements.js"


export const CONNECTION_FRACTION = 0.5
// assume core size is m and connection size is c
// c = f*m
// m+c/2+c/2 = 1
// m+c = 1
// m = 1/(1+f)
// c = f/(1+f)

export function getCoreSize() : number
{
	return 1/(1+CONNECTION_FRACTION)
}
export function getConnectionSize(): number
{
	return CONNECTION_FRACTION/(1+CONNECTION_FRACTION)
}

export class Camera
{
	r : Vector = new Vector() // position vector
	zoom : number = 50
}

export function toScreenCoordinates(p : Vector, c : Camera): Vector
{
	return new Vector(canvas.width/2 + (p.x-c.r.x)*c.zoom, canvas.height/2 - (p.y-c.r.y)*c.zoom)
}

export function fromScreenCoordinates(p : Vector, c : Camera): Vector
{
	return new Vector((p.x-canvas.width/2)/c.zoom + c.r.x, (canvas.height/2 - p.y)/c.zoom + c.r.y)
}

export function isOnScreen(p : Vector, c : Camera)
{
	let sc = toScreenCoordinates(p,c)
	return 0 <= sc.x && sc.x <= canvas.width && 0 <= sc.y && sc.y <= canvas.height
}

export function snapToGrid(r : Vector): Vector
{
	const r_ = new Vector(Math.round(r.x),Math.round(r.y))
	return r_
}

