import { stepBackwardButton, stepForwardButton } from "./elements";
import { WangFile } from "./logic";
import type { UIState } from "./UI";


function setUpStepForwardButton(ui_state : UIState, wf : WangFile): void
{
	stepForwardButton.addEventListener("click", ()=>
	{
		console.log("forward")
		WangFile.simulate(false,wf)
		console.log(ui_state)
	})
}

function setUpStepBackwardButton(ui_state : UIState, wf : WangFile): void
{
	stepBackwardButton.addEventListener("click", ()=>
	{
		console.log("back")
		WangFile.simulate(false,wf)
		console.log(ui_state)
	})
}

export function updateSimulationButtons(ui_state : UIState, wf : WangFile)
{
	console.log(ui_state)
	console.log(wf)
}


export function setUpSimulationButtons(ui_state : UIState, wf : WangFile)
{
	setUpStepForwardButton(ui_state, wf)
	setUpStepBackwardButton(ui_state, wf)
}