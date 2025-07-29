import {Color, Vector} from './util.js'
import { Camera, fromScreenCoordinates, getConnectionSize, getCoreSize, snapToGrid, toScreenCoordinates } from './render_util.js'
import { canvas, ctx } from './elements.js'
import { Mode, UIState } from './UI.js'

import { Tile, TileType, WangFile } from './logic.js'


function renderRect(r : Vector, width : number, height: number, color : Color, c : Camera): void
{
	function getScreenPointOffset(ox : number, oy : number)
	{
		return toScreenCoordinates(new Vector(r.x+ox,r.y+oy),c)
	}

	const UL = getScreenPointOffset(-width/2,height/2)
	const UR = getScreenPointOffset(width/2,height/2)
	const DL = getScreenPointOffset(-width/2,-height/2)
	const DR = getScreenPointOffset(width/2,-height/2)

	ctx.beginPath()
	ctx.moveTo(UL.x,UL.y)
	ctx.lineTo(UR.x,UR.y)
	ctx.lineTo(DR.x,DR.y)
	ctx.lineTo(DL.x,DL.y)
	ctx.lineTo(UL.x,UL.y)
	ctx.closePath()
	ctx.fillStyle = Color.toHex(color)
	ctx.fill()
}

function renderTileType(tt : TileType, x: number, y:number, camera : Camera, wf: WangFile)
{
	const m = getCoreSize()
	const c = getConnectionSize()
	const off = m/2+c/4

	function getOffset(x_off:number,y_off:number) : Vector
	{
		return new Vector(x+x_off,y+y_off)
	}

	//left and right
	renderRect(getOffset(-off,0),c/2,c,WangFile.getColorFromString(tt.left,wf),camera)
	renderRect(getOffset(off,0),c/2,c,WangFile.getColorFromString(tt.right,wf),camera)
	// up and down
	renderRect(getOffset(0,-off),c,c/2,WangFile.getColorFromString(tt.down,wf),camera)
	renderRect(getOffset(0,off),c,c/2,WangFile.getColorFromString(tt.up,wf),camera)
	// core
	renderRect(getOffset(0,0),m,m,tt.color,camera)
	// front
	renderRect(getOffset(0,0),c,c,WangFile.getColorFromString(tt.front,wf),camera)
}


function renderTile(t : Tile, camera : Camera, wf: WangFile)
{
	renderTileType(t.tileType,t.r.x,t.r.y,camera,wf)
}



function renderGrid(ui_state: UIState): void
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

function renderErase(r : Vector, c : Camera) : void
{
	function getScreenPointOffset(ox : number, oy : number)
	{
		return toScreenCoordinates(new Vector(r.x+ox,r.y+oy),c)
	}
	const side : number = 1 - getConnectionSize()/2
	const UL = getScreenPointOffset(-side/2,side/2)
	const UR = getScreenPointOffset(side/2,side/2)
	const DL = getScreenPointOffset(-side/2,-side/2)
	const DR = getScreenPointOffset(side/2,-side/2)

	ctx.beginPath();
	ctx.moveTo(UL.x,UL.y)
	ctx.lineTo(UR.x,UR.y)
	ctx.lineTo(DR.x,DR.y)
	ctx.lineTo(DL.x,DL.y)
	ctx.lineTo(UL.x,UL.y)
	ctx.lineTo(DR.x,DR.y)
	ctx.moveTo(UR.x,UR.y)
	ctx.lineTo(DL.x,DL.y)
	ctx.closePath()
	ctx.strokeStyle = Color.toHex(new Color(256,100,100))
	ctx.stroke()
	
}


function renderBackground(): void
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,canvas.width,canvas.height)
}

function renderMouse(ui_state: UIState, wf : WangFile): void
{
	const mr = snapToGrid(fromScreenCoordinates(ui_state.mouseScreenPosition,ui_state.camera))
	if(ui_state.mode === Mode.DEFAULT)
	{
		// nothing to do
	}
	else if(ui_state.mode === Mode.PLACE && WangFile.getTileAt(mr,wf)===null)
	{
		const pk = ui_state.getPickedToken()
		if(TileType.isTileType(pk))
		{
			renderTileType(pk,mr.x,mr.y,ui_state.camera,wf)
		}
	}
	else if(ui_state.mode === Mode.ERASE)
	{
		renderErase(mr,ui_state.camera)
	}
}

function renderTiles(ui_state: UIState, wf: WangFile): void
{
	wf.mainPlaneTiling.tiles.forEach(t =>
	{
		renderTile(t,ui_state.camera,wf)
	})
}

export function render(ui_state: UIState, wf : WangFile): void
{
	renderBackground()
	renderTiles(ui_state,wf)
	renderMouse(ui_state, wf)
	renderGrid(ui_state)
}






