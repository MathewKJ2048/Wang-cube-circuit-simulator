import { ANYTHING, PlaneTiling, Tile, type TileType } from "./logic";
import { Vector } from "./util";


class Node
{
	tile : Tile;
	up : Node | null = null
	down : Node | null = null
	left: Node | null = null
	right: Node | null = null
	possibleTileTypes : TileType[] = []
	constructor(t : Tile)
	{
		this.tile = t
	}
	public static debugString(n : Node): string
	{
		return "name:"+n.tile.tileType.name+"\n(u,d,l,r):"+String(n.up)+String(n.down)+String(n.left)+String(n.right)
	}
}

function generateNodes(pt : PlaneTiling, tt_s : TileType[], reverse : boolean) : Node[]
{
	const nodes : Node[] = pt.tiles.map(t => new Node(t))

	// set neighbours
	const tileNodeMap : Map<Tile, Node> = new Map();
	nodes.forEach(n => tileNodeMap.set(n.tile,n))
	nodes.forEach(n => {

		const r = n.tile.r
		const up_r = new Vector(r.x,r.y+1)
		const down_r = new Vector(r.x,r.y-1)
		const left_r = new Vector(r.x-1,r.y)
		const right_r = new Vector(r.x+1,r.y)

		function getFromPosition(r : Vector) : Node | null
		{
			const t = PlaneTiling.getTileAt(r,pt)
			if(t === null)return null
			return (tileNodeMap.get(t) ?? null)
		}
		
		n.up = getFromPosition(up_r)
		n.down = getFromPosition(down_r)
		n.left = getFromPosition(left_r)
		n.right = getFromPosition(right_r)
	})

	// set possible tile types
	function compatible(t : Tile, tt : TileType) : boolean
	{
		if(reverse) return tt.front === t.tileType.back
		return tt.back === t.tileType.front
	}
	nodes.forEach(n => {
		n.possibleTileTypes = tt_s.filter(tt => compatible(n.tile,tt))
	})

	return nodes
}


function NodePRUNE(n : Node) : boolean
{
	function condition(tt : TileType) : boolean // condition is true <-> tt is not culled
	{
		// special boundary conditions for nodes with no neighbours
		if(n.up === null && tt.up !== ANYTHING)return false
		if(n.down === null && tt.down !== ANYTHING)return false
		if(n.left === null && tt.left !== ANYTHING)return false
		if(n.right === null && tt.right !== ANYTHING)return false

		// standard neighbour culling conditions - if every neighbouring tile-type is unfavourable, the tile-type cannot be retained and needs to be culled
		if(n.up !== null && n.up.possibleTileTypes.every(tt_ => tt_.down !== tt.up))
		return false
		if(n.down !== null && n.down.possibleTileTypes.every(tt_ => tt_.up !== tt.down))
		return false
		if(n.left !== null && n.left.possibleTileTypes.every(tt_ => tt_.right !== tt.left))
		return false
		if(n.right !== null && n.right.possibleTileTypes.every(tt_ => tt_.left !== tt.right))
		return false

		return true
	}

	// if every tt meets the condition, nothing is pruned, so no change occurs
	const NoChange : boolean = n.possibleTileTypes.every(tt => condition(tt))

	//update
	n.possibleTileTypes = n.possibleTileTypes.filter(tt => condition(tt))

	return !NoChange // pruning occurred if no change occurred
}

export function PRUNE(pt : PlaneTiling, tt_s : TileType[], reverse : boolean) : PlaneTiling | null
{
	const nodes : Node[] = generateNodes(pt, tt_s, reverse)
	console.log(nodes)

	// iterated pruning
	while(nodes.some(n => NodePRUNE(n))){}

	// if some node does not have exactly one possible next tile-type, PRUNE fails
	if(nodes.some(n => n.possibleTileTypes.length !== 1))
		return null

	const answer : PlaneTiling = new PlaneTiling()
	answer.name = pt.name
	answer.tiles = nodes.map(n => new Tile(n.possibleTileTypes[0],n.tile.r))

	return answer
}