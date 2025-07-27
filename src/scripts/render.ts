import {Vector} from './util.js'
import { Camera, fromScreenCoordinates, toScreenCoordinates } from './render_util.js'
import { canvas, ctx } from './elements.js'
import { UIState } from './UI.js'





export function renderGrid(ui_state: UIState): void
{
	if(!ui_state.gridEnabled)return;	
	const c: Camera = ui_state.camera

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



function renderBackground(): void
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width,canvas.height)
}


export function render(ui_state: UIState): void
{
	renderBackground()
	renderGrid(ui_state)
}






