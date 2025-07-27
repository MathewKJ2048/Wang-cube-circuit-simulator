
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
	up : string = ANYTHING
	down : string = ANYTHING
	left : string = ANYTHING
	right : string = ANYTHING
	front : string = ANYTHING
	back : string = ANYTHING
	name : string = ""
	color : Color = DEFAULT_COLOR;
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
	}
	public static equals(tt: TileType, tt_ : TileType): boolean
	{
		return tt_.up === tt.up && tt_.down === tt.down && tt_.left === tt.left && tt_.right === tt.right && tt_.front === tt.front && tt_.back === tt.back
	}
}

export class Tile
{
	tileType : TileType = new TileType();
	r : Vector = new Vector();
	public static isTile(obj: unknown): obj is Tile
	{
		return typeof obj === 'object' && obj !== null
		&& 'r' in obj && Vector.isVector(obj.r)
		&& 'tileType' in obj && TileType.isTileType(obj.tileType)
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
}


export class WangFile // stores the whole context, to be in a json file
{
	tileTypes: TileType[] = [] // the types of tiles that are allowed
	savedSubPlaneTilings: PlaneTiling[] = [] // saved sub-circuits
	mainPlaneTiling: PlaneTiling = new PlaneTiling()
	cachedPlaneTiling: PlaneTiling = new PlaneTiling() // cache used to reset after simulation
	colorMap : stringColorMap = {
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
			wf.tileTypes = deleteFromList<TileType>(wf.tileTypes,tt)
		}
		return answer
	}
	public static deleteSavedPlaneTiling(pt : PlaneTiling, wf : WangFile) : boolean
	{
		wf.savedSubPlaneTilings = deleteFromList(wf.savedSubPlaneTilings,pt)
		return true
	}

}

export function getPlaceholderTileType(): TileType
{
	let placeholder : TileType = new TileType();
	placeholder.color = new Color(200,200,200);
	placeholder.name = "placeholder"
	return placeholder
}

export function getStarterWangFile(): WangFile
{
	let w : WangFile = new WangFile();
	w.tileTypes.push(getPlaceholderTileType())
	return w
}


