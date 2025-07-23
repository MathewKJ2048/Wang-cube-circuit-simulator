import {Point} from './util.js'

export class Camera
{
	p : Point = new Point()
	zoom : number = 50
}

export function toScreenCoordinates(p : Point, c : Camera, canvas : HTMLCanvasElement): Point
{
	return new Point(canvas.width/2 + (p.x-c.p.x)*c.zoom, canvas.height/2 - (p.y-c.p.y)*c.zoom)
}

export function fromScreenCoordinates(p : Point, c : Camera, canvas : HTMLCanvasElement): Point
{
	return new Point((p.x-canvas.width/2)/c.zoom + c.p.x, (canvas.height/2 - p.y)/c.zoom + c.p.y)
}

export function isOnScreen(p : Point, c : Camera, canvas : HTMLCanvasElement)
{
	let sc = toScreenCoordinates(p,c,canvas)
	return 0 <= sc.x && sc.x <= canvas.width && 0 <= sc.y && sc.y <= canvas.height
}

export function renderGrid(c : Camera, canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D): void
{
	

	let min_x_p = Math.floor(fromScreenCoordinates(new Point(0,0),c,canvas).x)
	let max_x_p = Math.ceil(fromScreenCoordinates(new Point(canvas.width,0),c,canvas).x)
	let max_y_p = Math.ceil(fromScreenCoordinates(new Point(0,0),c,canvas).y)
	let min_y_p = Math.floor(fromScreenCoordinates(new Point(0,canvas.height),c,canvas).y)

	ctx.strokeStyle = "white"
	for (let i = min_x_p-0.5; i <= max_x_p+0.5; i++)
	{
		
		let start = toScreenCoordinates(new Point(i,min_y_p-0.5),c,canvas)
		let end = toScreenCoordinates(new Point(i,max_y_p+0.5),c,canvas)
		ctx.beginPath();
		ctx.moveTo(start.x,start.y)
		ctx.lineTo(end.x,end.y)
		ctx.stroke();
	}
	for (let i = min_y_p-0.5; i <= max_y_p+0.5; i++)
	{
		let start = toScreenCoordinates(new Point(min_x_p-0.5,i),c,canvas)
		let end = toScreenCoordinates(new Point(max_x_p+0.5,i),c,canvas)
		
		ctx.beginPath();
		ctx.moveTo(start.x,start.y)
		ctx.lineTo(end.x,end.y)
		ctx.stroke();
	}
}

export function render(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, c : Camera): void
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width,canvas.height)
	renderGrid(c,canvas,ctx)
	
}

export function setZoomControls(c : Camera): void
{
	const slider = document.getElementById('zoom-slider') as HTMLInputElement;
        
	slider.addEventListener('input', function() {
		c.zoom = Number(this.value) + 10
	});
}




