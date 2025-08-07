
import { PRUNE } from './algorithm.js';
import {Vector, Color, deleteFromList, DEFAULT_COLOR} from './util.js'

export type stringColorMap = {
	[key: string]: Color;
}

function isStringColorMap(obj: unknown): obj is stringColorMap 
{
	if (typeof obj !== 'object' || obj === null) return false;
	for (const key in obj) 
	{
	  if (Object.prototype.hasOwnProperty.call(obj,key))
	  {
		const color = (obj as Record<string, unknown>)[key];
		if (! Color.isColor(color)) return false
	  }
	}
	return true
}

export const ANYTHING : string = "anything"
export class TileType
{
	private static UID = 0;
	public readonly uid: number;

	name : string = ""

	up : string = ANYTHING
	down : string = ANYTHING
	left : string = ANYTHING
	right : string = ANYTHING
	front : string = ANYTHING
	back : string = ANYTHING
	
	color : Color = DEFAULT_COLOR;

	constructor()
	{
		TileType.UID+=1
		this.uid = TileType.UID;
	}
	public static getCopy(tt : TileType): TileType
	{
		const copy = new TileType()
		copy.up = tt.up
		copy.down = tt.down
		copy.left = tt.left
		copy.right = tt.right
		copy.front = tt.front
		copy.back = tt.back
		copy.name = tt.name
		copy.color = new Color(tt.color.r,tt.color.g,tt.color.b)
		return copy
	}

	public static isTileType(obj:unknown): obj is TileType
	{
		return typeof obj === 'object' && obj !== null 
		&& 'up' in obj && typeof obj.up === 'string'
		&& 'down' in obj && typeof obj.down === 'string'
		&& 'left' in obj && typeof obj.left === 'string'
		&& 'right' in obj && typeof obj.right === 'string'
		&& 'front' in obj && typeof obj.front === 'string'
		&& 'back' in obj && typeof obj.back === 'string'
		&& 'name' in obj && typeof obj.name === 'string'
		&& 'color' in obj && Color.isColor(obj.color)
		&& 'uid' in obj && typeof obj.uid === 'number'
	}
	public static equals(tt: TileType, tt_ : TileType): boolean
	{
		return tt.uid === tt_.uid
	}
	public static equivalent(tt: TileType, tt_ : TileType): boolean
	{
		return tt_.up === tt.up && tt_.down === tt.down && tt_.left === tt.left && tt_.right === tt.right && tt_.front === tt.front && tt_.back === tt.back
	}
	public static getStrings(tt : TileType) : string[]
	{
		return [tt.up,tt.down,tt.left,tt.right,tt.front,tt.back]
	}
}

export class Tile
{
	tileType : TileType; // not initialized because of UID
	r : Vector;
	constructor(tt : TileType, r = new Vector())
	{
		this.tileType = tt
		this.r = r
	}
	public static isTile(obj: unknown): obj is Tile
	{
		return typeof obj === 'object' && obj !== null
		&& 'r' in obj && Vector.isVector(obj.r)
		&& 'tileType' in obj && TileType.isTileType(obj.tileType)
	}
	public static equals(t: Tile, t_: Tile): boolean
	{
		return TileType.equals(t.tileType,t_.tileType)&&Vector.equals(t.r,t_.r)
	}
	public static copy(t: Tile): Tile // does not meddle with tile-types in any way, no creating copies
	{
		const t_new: Tile = new Tile(t.tileType)
		t_new.r.x = t.r.x
		t_new.r.y = t.r.y
		return t_new
	}
}


export class PlaneTiling // stores a section of a tiling in space
{
	

	tiles : Tile[] = [];
	name : string = "";

	public static isPlaneTiling(obj: unknown) : obj is PlaneTiling
	{
		return typeof obj === 'object' && obj !== null
		&& 'name' in obj && typeof obj.name === 'string'
		&& 'tiles' in obj && Array.isArray(obj.tiles) && obj.tiles.every(Tile.isTile)
	}
	public static validate(pt : PlaneTiling) : boolean
	{
		// a plane tiling is valid iff no two tiles share the same location
		for(const t of pt.tiles)
			for(const t_ of pt.tiles)
				if (t!==t_ && Vector.equals(t.r,t_.r))
					return false
		return true
	}
	public static copy(pt: PlaneTiling): PlaneTiling
	{
		const pt_new = new PlaneTiling()
		pt_new.name = pt.name
		pt.tiles.forEach(t => pt_new.tiles.push(Tile.copy(t)))
		return pt_new
	}
	// avoid overlaps in added tiles
	public static addTile(t : Tile, pt : PlaneTiling) : boolean
	{
		if(pt.tiles.some(tile => Vector.equals(tile.r,t.r)))
			return false
		pt.tiles.push(t)
		return true
	}
	public static getTileAt(r : Vector, pt : PlaneTiling): Tile | null
	{
		return pt.tiles.find(tile => Vector.equals(tile.r, r)) ?? null;
	}
	public static deleteTileAt(r : Vector, pt : PlaneTiling) : boolean
	{
		let answer : boolean = false
		pt.tiles.forEach(t => {
			if(Vector.equals(t.r,r))
			{
				pt.tiles = deleteFromList(pt.tiles,t,(a:Tile,b:Tile)=>a===b)
				answer = true
			}
		})
		return answer
	}
	public static sortTiles(pt: PlaneTiling): void
	{
		function key(t : Tile): string
		{
			return String(t.r.x)+","+String(t.r.y)
		}
		pt.tiles.sort((a,b)=>key(a).localeCompare(key(b)))
	}
	public static equals(pt1 : PlaneTiling, pt2: PlaneTiling): boolean
	{
		const N = pt1.tiles.length
		const M = pt2.tiles.length
		if(M!==N)return false

		PlaneTiling.sortTiles(pt1)
		PlaneTiling.sortTiles(pt2)

		for(let i=0;i<N;i++)
			if(!Tile.equals(pt1.tiles[i],pt2.tiles[i]))
				return false

		return true
	}
}


export class WangFile // stores the whole context, to be in a json file
{
	tileTypes: TileType[] = [] // the types of tiles that are allowed
	savedSubPlaneTilings: PlaneTiling[] = [] // saved sub-circuits
	mainPlaneTiling: PlaneTiling = new PlaneTiling()
	cachedPlaneTiling: PlaneTiling = new PlaneTiling() // cache used to reset after simulation
	colorMap : stringColorMap = { // only for the sides, not the main
		ANYTHING: new Color(0,0,0)
	}


	public static isWangFile(obj: unknown): obj is WangFile
	{
		return typeof obj === 'object' && obj !== null
		&& 'tileTypes' in obj && Array.isArray(obj.tileTypes) && obj.tileTypes.every(TileType.isTileType)
		&& 'savedSubPlaneTilings' in obj && Array.isArray(obj.savedSubPlaneTilings) && obj.savedSubPlaneTilings.every(PlaneTiling.isPlaneTiling)
		&& 'mainPlaneTiling' in obj && PlaneTiling.isPlaneTiling(obj.mainPlaneTiling)
		&& 'cachedPlaneTiling' in obj && PlaneTiling.isPlaneTiling(obj.cachedPlaneTiling)
		&& 'colorMap' in obj && isStringColorMap(obj.colorMap)

	}
	public overWrite(wf : WangFile): void
	{
		this.tileTypes = wf.tileTypes
		this.savedSubPlaneTilings = wf.savedSubPlaneTilings
		this.mainPlaneTiling = wf.mainPlaneTiling
		this.cachedPlaneTiling = wf.cachedPlaneTiling
		this.colorMap = wf.colorMap
	}
	public static getAllPlaneTilings(wf : WangFile) : PlaneTiling[]
	{
		return [wf.cachedPlaneTiling,wf.mainPlaneTiling].concat(wf.savedSubPlaneTilings)
	}
	public static checkTileTypeCoverage(tts : TileType[], pt : PlaneTiling): boolean
	{
		// make sure types of all tiles in the plane-tiling are present in the list of types
		function isCovered(t : Tile): boolean
		{
			return tts.some(tt => TileType.equals(t.tileType,tt))
		}
		return pt.tiles.every(t => isCovered(t))
	}
	public static validate(wf : WangFile) : boolean
	{
		function validatePlaneTiling(pt : PlaneTiling)
		{
			return PlaneTiling.validate(pt) && WangFile.checkTileTypeCoverage(wf.tileTypes,pt)
		}
		return WangFile.getAllPlaneTilings(wf).every(pt => validatePlaneTiling(pt))
	}
	public static addNewTileType(wf : WangFile): TileType // generates a unique TileType and adds it
	{
		function generateName(b: string, n: number) : string
		{
			return b+String(n)
		}

		const base : string = "new-tile-"
		let num : number = 0
		while(wf.tileTypes.some((tt)=>tt.front===generateName(base,num)))
		{
			num = num+1
		}
		const name = generateName(base, num) // unique string
		const tt : TileType = new TileType()
		tt.name = tt.front = tt.back = name // guarantees difference, and persistence
		wf.tileTypes.push(tt)
		return tt
	}
	public static deleteTileType(tt : TileType, wf : WangFile) : boolean 
	{
		// check if there is any tile t in pt that is of type tt, returns true if no tile t exists
		function checkTileTypeUsed(tt: TileType, pt : PlaneTiling) : boolean
		{
			return !pt.tiles.some((t) => TileType.equals(tt,t.tileType))
		}
		const answer : boolean = WangFile.getAllPlaneTilings(wf).every(pt=>checkTileTypeUsed(tt, pt))
		if(answer)
		{
			wf.tileTypes = deleteFromList<TileType>(wf.tileTypes,tt,TileType.equals)
		}
		return answer
	}
	public static editTileType(tt : TileType, new_tt: TileType, wf : WangFile) : boolean
	{
		if(TileType.equals(tt,new_tt))return false
		wf.tileTypes = deleteFromList(wf.tileTypes,tt,TileType.equals)
		wf.tileTypes.push(new_tt)

		// manual upload, used instead of editing reference values since json doesn't support references when the WangFile is serialized
		WangFile.getAllPlaneTilings(wf).forEach(pt => pt.tiles.forEach(t => {
			if(TileType.equals(t.tileType,tt))t.tileType = new_tt 
		}))

		
		return true
	}
	public static deleteSavedPlaneTiling(pt : PlaneTiling, wf : WangFile) : boolean
	{
		// planeTilings can be manipulated using only references
		wf.savedSubPlaneTilings = deleteFromList(wf.savedSubPlaneTilings,pt,
			(a:PlaneTiling,b:PlaneTiling)=>{return a===b})
		return true
	}

	public static getColorFromString(s : string, wf : WangFile): Color
	{
		if(s in wf.colorMap) return wf.colorMap[s]
		return new Color()
	}
	public static registerColor(s: string, c : Color, wf : WangFile): void
	{
		wf.colorMap[s] = c
	}
	public static trimColorMap(wf: WangFile) : void // remove unused colors from map
	{
		const newColorMap : stringColorMap = {}
		wf.tileTypes.forEach(t => TileType.getStrings(t).forEach(s => newColorMap[s] = wf.colorMap[s]))
		wf.colorMap = newColorMap
	}
	public static addTile(t : Tile, wf : WangFile) : boolean
	{
		return PlaneTiling.addTile(t,wf.mainPlaneTiling)
	}
	public static getTileAt(r : Vector, wf : WangFile): Tile | null
	{
		return wf.mainPlaneTiling.tiles.find(tile => Vector.equals(tile.r, r)) ?? null;
	}
	public static deleteTileAt(r : Vector, wf : WangFile) : boolean
	{
		return PlaneTiling.deleteTileAt(r,wf.mainPlaneTiling)
	}
	public static simulate(reverse:boolean, wf : WangFile)
	{
		const result = PRUNE(wf.mainPlaneTiling,wf.tileTypes,reverse)
		if(result!==null)wf.mainPlaneTiling = result
	}

}

export function getPlaceholderTileType(): TileType
{
	let placeholder : TileType = new TileType();
	placeholder.color = DEFAULT_COLOR;
	placeholder.name = placeholder.front = placeholder.back = "placeholder"
	return placeholder
}

export function getStarterWangFile(): WangFile
{
	let w : WangFile = new WangFile();
	let tt = getPlaceholderTileType()
	w.tileTypes.push(tt)
	return w
}


