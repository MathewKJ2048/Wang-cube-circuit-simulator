
import {Vector, Color} from './util.js'



export const ANYTHING : string = ""
export class TileType
{
	up : string = ANYTHING
	down : string = ANYTHING
	left : string = ANYTHING
	right : string = ANYTHING
	front : string = ANYTHING
	back : string = ANYTHING
	name : string = ""
	color : Color = new Color();
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
}


export class WangFile // stores the whole context, to be in a json file
{
	tileTypes: TileType[] = []
	savedSubPlaneTilings: PlaneTiling[] = []
	planeTilings : PlaneTiling[] = []
	public static isWangFile(obj: unknown): obj is WangFile
	{
		return typeof obj === 'object' && obj !== null
		&& 'tileTypes' in obj && Array.isArray(obj.tileTypes) && obj.tileTypes.every(TileType.isTileType)
		&& 'savedSubPlaneTilings' in obj && Array.isArray(obj.savedSubPlaneTilings) && obj.savedSubPlaneTilings.every(PlaneTiling.isPlaneTiling)
		&& 'planeTilings' in obj && Array.isArray(obj.planeTilings) && obj.planeTilings.every(PlaneTiling.isPlaneTiling)
	}
	public overWrite(wf : WangFile): void
	{
		this.tileTypes = wf.tileTypes
		this.savedSubPlaneTilings = wf.savedSubPlaneTilings
		this.planeTilings = wf.planeTilings
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
