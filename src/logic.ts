
import {Point} from './util.js'

export class Color
{
	r : number = 0
	g : number = 0
	b : number  = 0
	public static isColor(obj:unknown): obj is Color
	{
		return typeof obj === 'object' && obj !== null && 'r' in obj && 'g' in obj && 'b' in obj && typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number'
	}
}

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
	location : Point = new Point();
	public static isTile(obj: unknown): obj is Tile
	{
		return typeof obj === 'object' && obj !== null
		&& 'location' in obj && Point.isPoint(obj.location)
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

}
