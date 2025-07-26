import { UIState, Mode, getMousePosition } from "./UI.js";
import { Vector } from "./util.js";
import { canvas, selectButton } from "./elements.js";
import { Camera } from "./render_util.js";


export class SelectionZone
{
	topLeft : Vector = new Vector()
	bottomRight : Vector = new Vector()
}


export function setupSelection(ui_state: UIState, selectionZone : SelectionZone, c: Camera): void
{
	selectButton.addEventListener('click',()=>{
		ui_state.mode = Mode.SELECT_FREE
	})

	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.mode == Mode.SELECT_FREE)
		{
			ui_state.mode = Mode.SELECT_PIN
			selectionZone.topLeft = getMousePosition(e, c)
			selectionZone.bottomRight = getMousePosition(e, c)
		}
		else if(ui_state.mode == Mode.SELECT_PIN)
		{
			ui_state.mode = Mode.DEFAULT
		}
	})

	canvas.addEventListener('mousemove',(e)=>
	{
		if(ui_state.mode == Mode.SELECT_PIN)
		{
			selectionZone.bottomRight = getMousePosition(e, c)
		}
	})
}