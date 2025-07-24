import { WangFile } from "./logic";

export function listTiles(wf : WangFile) : void
{
	const ttp_panel : HTMLBodyElement = document.getElementById("tile-picker-dynamic") as HTMLBodyElement
	ttp_panel.innerHTML = ''
	for (let t of wf.tileTypes)
	{
		console.log(t)
		const button = document.createElement('button')
		button.textContent = t.name
		ttp_panel.appendChild(button)
	}
}