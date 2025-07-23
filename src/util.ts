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

export class Color
{
	r : number = 0
	g : number = 0
	b : number  = 0
	constructor(r: number = 0,g: number= 0,b: number = 0)
	{
		this.r = r
		this.g = g
		this.b = b
	}
	public static isColor(obj:unknown): obj is Color
	{
		return typeof obj === 'object' && obj !== null && 'r' in obj && 'g' in obj && 'b' in obj && typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number'
	}
}