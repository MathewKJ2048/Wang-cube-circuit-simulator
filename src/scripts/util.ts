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
	public static equals(p : Vector, q: Vector)
	{
		return q.x === p.x && q.y === p.y
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
	public static equals(c : Color, c_ : Color): boolean
	{
		return c_.r === c.r && c_.g === c.g && c_.b === c.b
	}
	public static toHex(c: Color) 
	{
		// Convert RGB to hex format (#RRGGBB)
		const toHex = (value: number) => Math.min(255, Math.max(0, value)).toString(16).padStart(2, '0');
		const hexColor = `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
		return hexColor
	}
}

export const DEFAULT_COLOR : Color = new Color(100,100,100)

export function getFraction(value: number, min: number, max: number) : number
{
	return (value-min)/(max-min)
}
export function getValue(fraction: number, min: number, max: number) : number
{
	return fraction*(max-min)+min
}

export function deleteFromList<T>(l : T[], o : T): T[]
{
	return l.filter(e => {return e !== o})
}

export function getColorFromStringHash(str: string): string {
	let hash = 0;
	
	// Generate a hash code from the string
	for (let i = 0; i < str.length; i++) {
	  hash = str.charCodeAt(i) * hash;
	}
	
	// Convert the hash to a hex color
	let color = '#';
	for (let i = 0; i < 3; i++) {
	  const value = (hash >> (i * 8)) & 0xFF;
	  color += ('00' + value.toString(16)).substr(-2);
	}
	
	return color;
  }