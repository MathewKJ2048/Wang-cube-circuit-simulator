
export class Point
{
	x : number = 0
	y : number  = 0
}
export class Camera
{
	p : Point = new Point()
	zoom : number = 1
}
export class Color
{
	r : number = 0
	g : number = 0
	b : number  = 0
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
}

export class Tile
{
	tileType : TileType = new TileType();
	upTile : Tile | null = null
	downTile : Tile | null = null
	leftTile : Tile | null = null
	rightTile : Tile | null = null
}

export class PlaneTiling // stores a section of a tiling in space
{
	tiles : Tile[] = [];
	name : string = "";
}

export class WangFile // stores the whole context, to be in a json file
{
	tileTypeList: TileType[] = []
	savedSubPlaneTilings: PlaneTiling[] = []
	planeTilings : PlaneTiling[] = []
}