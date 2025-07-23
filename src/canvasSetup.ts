

export function getCanvas() : HTMLCanvasElement
{
	const canvas : HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
	return canvas
}

export function getContext(canvas : HTMLCanvasElement) : CanvasRenderingContext2D
{
	const ctx : CanvasRenderingContext2D = canvas.getContext('2d')!;
	return ctx
}

export function canvasSetup(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D): void 
{
	if (!canvas || !ctx) 
	{
		console.error('Canvas initialization failed');
		return
	}
	function resizeCanvas(): void 
	{
		const container = canvas.parentElement!;
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
	}
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
	
}