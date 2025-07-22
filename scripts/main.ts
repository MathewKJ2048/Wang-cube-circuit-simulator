const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!; // Non-null assertion

function resizeCanvas(): void {
    const container = canvas.parentElement!;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas && ctx) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
} else {
    console.error('Canvas initialization failed');
}

class Point
{
	x : number = 0
	y : number  = 0
}
class Camera
{
	p : Point = new Point()
	zoom : number = 1
}
class Color
{
	r : number = 0
	g : number = 0
	b : number  = 0
}


const ANYTHING : string = ""
class TileType
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
class Tile
{
	tileType : TileType = new TileType();
	upTile : Tile | null = null
	downTile : Tile | null = null
	leftTile : Tile | null = null
	rightTile : Tile | null = null
}
