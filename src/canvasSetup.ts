import { canvas, ctx } from "./elements.js";


export function canvasSetup(): void 
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