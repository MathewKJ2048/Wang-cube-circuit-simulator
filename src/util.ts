export class Point
{
	x : number = 0
	y : number  = 0
	public static isPoint(obj:unknown): obj is Point {
		return typeof obj === 'object' && obj !== null && 'x' in obj && 'y' in obj && typeof obj.x === 'number' && typeof obj.y === 'number'
	}
	constructor(x : number = 0, y: number = 0)
	{
		this.x = x
		this.y = y
	}
	public add(p : Point)
	{
		return new Point(this.x+p.x,this.y+p.y)
	}
	public sub(p : Point)
	{
		return new Point(this.x-p.x,this.y-p.y)
	}
	public scale(k : number)
	{
		return new Point(this.x*k, this.y*k)
	}
}