import {Color, Vector} from './util.js'
import { Camera, fromScreenCoordinates, getConnectionSize, getCoreSize, snapToGrid, toScreenCoordinates } from './render_util.js'
import { canvas, ctx } from './elements.js'
import { Mode, UIState } from './UI.js'

import { Tile, TileType, WangFile } from './logic.js'


function renderRect(r : Vector, width : number, height: number, color : Color, c : Camera, stroke : boolean = true): void
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
	const corners : Vector[] = [UR,DR,DL,UL]
	corners.forEach(X => ctx.lineTo(X.x,X.y))
	ctx.closePath()
	
	if(!stroke)
	{
		ctx.fillStyle = Color.toHex(color)
		ctx.fill()
	}
	else
	{
		ctx.strokeStyle = Color.toHex(color)
		ctx.stroke()
	}
	
}

function renderTileType(tt : TileType, x: number, y:number, camera : Camera, wf: WangFile, picked : boolean = false)
{
	const m = getCoreSize()
	const c = getConnectionSize()
	const off = m/2+c/4
	const outlineColor = new Color(256,256,256)

	function getOffset(x_off:number,y_off:number) : Vector
	{
		return new Vector(x+x_off,y+y_off)
	}

	const upColor = WangFile.getColorFromString(tt.up,wf)
	const downColor = WangFile.getColorFromString(tt.down,wf)
	const leftColor = WangFile.getColorFromString(tt.left,wf)
	const rightColor = WangFile.getColorFromString(tt.right,wf)
	const frontColor = WangFile.getColorFromString(tt.front,wf)
	const coreColor = WangFile.getColorFromString(tt.name,wf)

	
	function draw(outline : boolean = false)
	{
		function pickColor(c:Color)
		{
			return outline ? outlineColor : c
		}
		//left and right
		renderRect(getOffset(-off,0),c/2,c,pickColor(leftColor),camera,outline)
		renderRect(getOffset(off,0),c/2,c,pickColor(rightColor),camera,outline)
		// up and down
		renderRect(getOffset(0,-off),c,c/2,pickColor(downColor),camera,outline)
		renderRect(getOffset(0,off),c,c/2,pickColor(upColor),camera,outline)
		// core
		renderRect(getOffset(0,0),m,m, pickColor(coreColor),camera,outline)
		// front
		renderRect(getOffset(0,0),c,c,pickColor(frontColor),camera,outline)
	}

	draw()
	if(picked)draw(true) // outlines if the type is currently picked
	
}
function renderTile(t : Tile, camera : Camera, wf: WangFile, picked : boolean = false)
{
	renderTileType(t.tileType,t.r.x,t.r.y,camera,wf, picked)
}
function renderTiles(ui_state: UIState, wf: WangFile): void
{
	const pt = ui_state.getPickedToken()
	wf.mainPlaneTiling.tiles.forEach(t =>
	{
		renderTile(t,ui_state.camera,wf,
			TileType.isTileType(pt) && TileType.equals(pt,t.tileType)
			)
	})
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

function renderSelector(ui_state: UIState): void
{
	if(ui_state.getMode() !== Mode.SELECT)return
	if(ui_state.selectorUpLeft === null) return
	const dr : Vector = ui_state.selectorDownRight ?? fromScreenCoordinates(ui_state.mouseScreenCoordinates,ui_state.camera)
	const c = dr.add(ui_state.selectorUpLeft).scale(1/2)
	const d = dr.sub(ui_state.selectorUpLeft)
	renderRect(c,d.x,d.y,new Color(0,255,255),ui_state.camera,true)
}

function renderMouse(ui_state: UIState, wf : WangFile): void
{
	const mr = snapToGrid(fromScreenCoordinates(ui_state.mouseScreenCoordinates,ui_state.camera))
	if(ui_state.getMode() === Mode.DEFAULT)
	{
		// nothing to do
	}
	else if(ui_state.getMode() === Mode.PLACE && WangFile.getTileAt(mr,wf)===null)
	{
		const pk = ui_state.getPickedToken()
		if(TileType.isTileType(pk))
		{
			renderTileType(pk,mr.x,mr.y,ui_state.camera,wf,true)
		}
	}
	else if(ui_state.getMode() === Mode.ERASE)
	{
		renderErase(mr,ui_state.camera)
	}
	else if(ui_state.getMode() === Mode.SELECT)
	{
		// render selector symbol
	}
}




export function render(ui_state: UIState, wf : WangFile): void
{
	renderBackground()
	renderTiles(ui_state,wf)
	renderMouse(ui_state, wf)
	renderGrid(ui_state)
	renderSelector(ui_state)
}






