import { canvas, previewCanvas } from "./elements.js";


export function canvasSetup(): void 
{
	
	function resizeCanvas(cv : HTMLCanvasElement): void 
	{
		const container = cv.parentElement!;
		cv.width = container.clientWidth;
		cv.height = container.clientHeight;
	}
	function resizeAllCanvas() : void
	{
		resizeCanvas(canvas);
		resizeCanvas(previewCanvas);
	}
	resizeAllCanvas()
	window.addEventListener('resize', ()=>{
		resizeAllCanvas()
	});
	
}