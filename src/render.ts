import {Vector} from './util.js'
import { Camera, fromScreenCoordinates, toScreenCoordinates } from './renderUtil.js'
import {zoomInButton, zoomOutButton} from "./elements.js"
import { canvas, ctx } from './elements.js'
import { SelectionZone } from './selection.js'
import { UIState, Mode } from './UI.js'


export function renderSelectionZone(sz : SelectionZone, c: Camera, ui_state: UIState): void
{
	if (ui_state.mode !== Mode.SELECT_PIN) return
	let tl: Vector = toScreenCoordinates(sz.topLeft,c)
	let br: Vector = toScreenCoordinates(sz.bottomRight,c)
	ctx.strokeStyle = "blue"
	ctx.beginPath()
	ctx.moveTo(tl.x,tl.y)
	ctx.lineTo(tl.x,br.y)
	ctx.lineTo(br.x,br.y)
	ctx.lineTo(br.x,tl.y)
	ctx.lineTo(tl.x,tl.y)
	ctx.stroke()
}


export function renderGrid(c : Camera): void
{
	

	let min_x = Math.floor(fromScreenCoordinates(new Vector(0,0),c).x)
	let max_x = Math.ceil(fromScreenCoordinates(new Vector(canvas.width,0),c).x)
	let max_y = Math.ceil(fromScreenCoordinates(new Vector(0,0),c).y)
	let min_y = Math.floor(fromScreenCoordinates(new Vector(0,canvas.height),c).y)

	ctx.strokeStyle = "white"
	for (let i = min_x-0.5; i <= max_x+0.5; i++)
	{
		
		let start = toScreenCoordinates(new Vector(i,min_y-0.5),c)
		let end = toScreenCoordinates(new Vector(i,max_y+0.5),c)
		ctx.beginPath();
		ctx.moveTo(start.x,start.y)
		ctx.lineTo(end.x,end.y)
		ctx.stroke();
	}
	for (let i = min_y-0.5; i <= max_y+0.5; i++)
	{
		let start = toScreenCoordinates(new Vector(min_x-0.5,i),c)
		let end = toScreenCoordinates(new Vector(max_x+0.5,i),c)
		ctx.beginPath();
		ctx.moveTo(start.x,start.y)
		ctx.lineTo(end.x,end.y)
		ctx.stroke();
	}
}

export function renderBackground(c : Camera): void
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width,canvas.height)
}






