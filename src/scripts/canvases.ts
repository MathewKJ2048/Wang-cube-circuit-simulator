import { canvas, previewCanvas } from "./elements";


export function resizeCanvas(cv : HTMLCanvasElement): void
{
	const container = cv.parentElement!;
	cv.width = container.clientWidth;
	cv.height = container.clientHeight;
}

export function updateAllCanvases(): void
{
	resizeCanvas(canvas);
	resizeCanvas(previewCanvas);
}

export function setUpAllCanvases(): void
{
	window.addEventListener('resize', ()=>{
		updateAllCanvases()
	});
}

