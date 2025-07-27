import { canvas } from "./elements";


export function resizeCanvas(cv : HTMLCanvasElement): void
{
	const container = cv.parentElement!;
	cv.width = container.clientWidth;
	cv.height = container.clientHeight;
}

export function updateCanvas(): void
{
	resizeCanvas(canvas);
}

export function setUpCanvas(): void
{
	window.addEventListener('resize', ()=>{
		updateCanvas()
	});
}

