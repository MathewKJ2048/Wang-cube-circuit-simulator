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
	readonly r : number
	readonly g : number
	readonly b : number
	constructor(r: number = 0,g: number= 0,b: number = 0)
	{
		this.r = Color.normalize(r)
		this.g = Color.normalize(g)
		this.b = Color.normalize(b)
	}
	public static normalize(v: number): number
	{
		return Math.max(0,Math.min(255,Math.round(v)))
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
		// Convert RGB to hex format (#rrggbb)
		const toHex = (value: number) => Math.min(255, Math.max(0, value)).toString(16).padStart(2, '0');
		const hexColor = `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
		return hexColor
	}
	public static fromHex(hex: string)
	{
		const hexColor = hex.startsWith('#') ? hex.slice(1) : hex;
		const r = parseInt(hexColor.substring(0, 2), 16);
		const g = parseInt(hexColor.substring(2, 4), 16);
		const b = parseInt(hexColor.substring(4, 6), 16);
		return new Color(r,g,b)
	}
	public static toNumber(c : Color): number
	{
		return (c.r<<16) + (c.g<<8) + c.b
	}
}

export const DEFAULT_COLOR : Color = new Color(100,100,100)
export const NEW_COLOR : Color = new Color(255, 255, 255)

export function getFraction(value: number, min: number, max: number) : number
{
	return (value-min)/(max-min)
}
export function getValue(fraction: number, min: number, max: number) : number
{
	return fraction*(max-min)+min
}

// there's no default for equality to prevent thoughtless application of this function in inappropriate contexts
export function deleteFromList<T>(l : T[], o : T, equality : (a:T, b:T)=>boolean): T[]
{
	return l.filter(e => {return !equality(e,o)})
}

export function doNothingWith(t : any): void
{
	if(2+2==5)console.log(t)
}

export function isWithinSelection(r : Vector, p1: Vector | null, p2 : Vector | null): boolean
{
	if(p1 === null || p2 === null)return false
	function inRange(v:number, l1:number, l2:number)
	{
		const l_max = Math.max(l1,l2)
		const l_min = Math.min(l1,l2)
		return (l_min<v && v<l_max)
	}
	return inRange(r.x,p1.x,p2.x) && inRange(r.y,p1.y,p2.y)
}

