import { canvas } from "./elements";
import type { WangFile } from "./logic";
import { getMousePosition, Mode, type UIState } from "./UI";
import { doNothingWith, Vector } from "./util";

export function setUpSelection(ui_state: UIState, wf: WangFile)
{
	canvas.addEventListener("click",(e)=>{

		if(ui_state.getMode()!==Mode.SELECT)return
		const mr: Vector = getMousePosition(e, ui_state.camera)

		// cycle through the modes of the selector
		if(ui_state.selectorUpLeft === null)ui_state.selectorUpLeft = mr
		else if(ui_state.selectorDownRight === null)ui_state.selectorDownRight = mr
		else ui_state.selectorDownRight = ui_state.selectorUpLeft = null

		console.log([ui_state.selectorUpLeft,ui_state.selectorDownRight])

	})
	doNothingWith(ui_state)
	doNothingWith(wf)
}

export function updateSelectionButtons(ui_state: UIState, wf: WangFile)
{
	doNothingWith(ui_state)
	doNothingWith(wf)
}