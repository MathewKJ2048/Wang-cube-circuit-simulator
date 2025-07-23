export class Vector
{
	x : number = 0
	y : number  = 0
	public static isVector(obj:unknown): obj is Vector {
		return typeof obj === 'object' && obj !== null && 'x' in obj && 'y' in obj && typeof obj.x === 'number' && typeof obj.y === 'number'
	}
	constructor(x : number = 0, y: number = 0)
	{
		this.x = x
		this.y = y
	}
	public add(p : Vector)
	{
		return new Vector(this.x+p.x,this.y+p.y)
	}
	public sub(p : Vector)
	{
		return new Vector(this.x-p.x,this.y-p.y)
	}
	public scale(k : number)
	{
		return new Vector(this.x*k, this.y*k)
	}
}