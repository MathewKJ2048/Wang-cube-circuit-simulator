import {Color, Vector} from './util.js'
import { BACKGROUND_COLOR, Camera, ERASE_COLOR, fromScreenCoordinates, getConnectionSize, getCoreSize, GRID_COLOR, PICK_COLOR, SELECT_COLOR, snapToGrid, toScreenCoordinates } from './render_util.js'
import { canvas, ctx } from './elements.js'
import { Mode, UIState } from './UI.js'

import { PlaneTiling, Tile, TileType, WangFile } from './logic.js'


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

function renderTileType(tt : TileType, x: number, y:number, camera : Camera, wf: WangFile, outlineColor : null | Color = null)
{
	const m = getCoreSize()
	const c = getConnectionSize()
	const off = m/2+c/4

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

	
	function util(co:Color,u:Color,d:Color,l:Color,r:Color,f:Color,stroke:boolean)
	{
		//left and right
		renderRect(getOffset(-off,0),c/2,c,l,camera,stroke)
		renderRect(getOffset(off,0),c/2,c,r,camera,stroke)
		// up and down
		renderRect(getOffset(0,-off),c,c/2,d,camera,stroke)
		renderRect(getOffset(0,off),c,c/2,u,camera,stroke)
		// core
		renderRect(getOffset(0,0),m,m, co,camera,stroke)
		// front
		renderRect(getOffset(0,0),c,c,f,camera,stroke)
	}

	util(coreColor,upColor,downColor,leftColor,rightColor,frontColor,false)
	if(outlineColor !== null)
	util(outlineColor,outlineColor,outlineColor,outlineColor,outlineColor,outlineColor,true) 
	// outlines with the outline color
	
}
function renderTile(t : Tile, camera : Camera, wf: WangFile, picked : boolean = false)
{
	renderTileType(t.tileType,t.r.x,t.r.y,camera,wf, picked ? PICK_COLOR : null)
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

	ctx.strokeStyle = Color.toHex(GRID_COLOR)
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
	ctx.strokeStyle = Color.toHex(ERASE_COLOR)
	ctx.stroke()
	
}


function renderBackground(): void
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = Color.toHex(BACKGROUND_COLOR);
	ctx.fillRect(0,0,canvas.width,canvas.height)
}

function renderSelector(ui_state: UIState): void
{
	if(ui_state.getMode() !== Mode.SELECT)return
	if(ui_state.selectorUpLeft === null) return
	const dr : Vector = ui_state.selectorDownRight ?? fromScreenCoordinates(ui_state.mouseScreenCoordinates,ui_state.camera)
	const c = dr.add(ui_state.selectorUpLeft).scale(1/2)
	const d = dr.sub(ui_state.selectorUpLeft)
	renderRect(c,d.x,d.y,SELECT_COLOR,ui_state.camera,true)
}

function renderMouse(ui_state: UIState, wf : WangFile): void
{
	const mr = snapToGrid(fromScreenCoordinates(ui_state.mouseScreenCoordinates,ui_state.camera))
	if(ui_state.getMode() === Mode.DEFAULT)
	{
		// nothing to do
	}
	else if(ui_state.getMode() === Mode.PLACE)
	{
		const pk = ui_state.getPickedToken()
		if(TileType.isTileType(pk) && WangFile.getTileAt(mr,wf)===null)
		{
			renderTileType(pk,mr.x,mr.y,ui_state.camera,wf,PICK_COLOR)
		}
		else if(PlaneTiling.isPlaneTiling(pk) && 
		pk.tiles.every(t => WangFile.getTileAt(t.r.add(mr),wf) === null))
		{
			pk.tiles.forEach(t => 
				renderTileType(t.tileType,mr.x+t.r.x,mr.y+t.r.y,ui_state.camera,wf,SELECT_COLOR))
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
	else if(ui_state.getMode() === Mode.PASTE)
	{
		const cb = ui_state.getClipBoard()
		if(cb!==null && cb.tiles.every(t => WangFile.getTileAt(t.r.add(mr),wf) === null))
		cb.tiles.forEach(t => 
			renderTileType(t.tileType,mr.x+t.r.x,mr.y+t.r.y,ui_state.camera,wf,SELECT_COLOR))
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






