import { UIState, Mode, getMousePosition } from "./UI.js";
import { Vector } from "./util.js";
import { canvas, selectButton } from "./elements.js";
import { Camera } from "./renderUtil.js";


export class SelectionZone
{
	topLeft : Vector = new Vector()
	bottomRight : Vector = new Vector()
	active : boolean = false
}


export function setupSelection(ui_state: UIState, selectionZone : SelectionZone, c: Camera): void
{
	selectButton.addEventListener('click',(e)=>{
		ui_state.mode = Mode.SELECT_FREE
		console.log(Mode[ui_state.mode])
	})

	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.mode == Mode.SELECT_FREE)
		{
			ui_state.mode = Mode.SELECT_PIN
			selectionZone.active = true
			selectionZone.topLeft = getMousePosition(e, c)
			selectionZone.bottomRight = getMousePosition(e, c)
		}
		else if(ui_state.mode == Mode.SELECT_PIN)
		{
			ui_state.mode = Mode.DEFAULT
			selectionZone.active = false
		}
		console.log(Mode[ui_state.mode])
		console.log(selectionZone.active)
	})

	canvas.addEventListener('mousemove',(e)=>
	{
		if(ui_state.mode == Mode.SELECT_PIN)
		{
			selectionZone.bottomRight = getMousePosition(e, c)
		}
	})
}