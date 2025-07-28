import { defaultButton, placeButton } from "./elements";
import type { WangFile } from "./logic";
import { Mode, type UIState } from "./UI";


function setUpDefaultButton(ui_state: UIState, wf: WangFile)
{
	defaultButton.addEventListener('click',()=>{
		ui_state.mode = Mode.DEFAULT
		updateControlButtons(ui_state, wf)
		console.log("updated")
	})
}


export function updateControlButtons(ui_state: UIState, wf : WangFile)
{
	if(ui_state.getPickedToken() === null)
	{
		placeButton.disabled = true
	}
	else
	{
		placeButton.disabled = false
	}
	if(false){console.log(wf)}
}

export function setUpControlButtons(ui_state: UIState, wf : WangFile)
{
	setUpDefaultButton(ui_state, wf)
}