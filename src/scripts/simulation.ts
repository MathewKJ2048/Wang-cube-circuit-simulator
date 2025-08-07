import { UpdateCacheButtons } from "./cache";
import { stepBackwardButton, stepForwardButton } from "./elements";
import { WangFile } from "./logic";
import type { UIState } from "./UI";
import { doNothingWith } from "./util";


function setUpStepForwardButton(ui_state : UIState, wf : WangFile): void
{
	stepForwardButton.addEventListener("click", ()=>
	{
		WangFile.simulate(false,wf)
		UpdateCacheButtons(ui_state,wf)
	})
}

function setUpStepBackwardButton(ui_state : UIState, wf : WangFile): void
{
	stepBackwardButton.addEventListener("click", ()=>
	{
		WangFile.simulate(true,wf)
		UpdateCacheButtons(ui_state,wf)
	})
}

export function updateSimulationButtons(ui_state : UIState, wf : WangFile)
{
	doNothingWith(ui_state)
	doNothingWith(wf)
}


export function setUpSimulationButtons(ui_state : UIState, wf : WangFile)
{
	setUpStepForwardButton(ui_state, wf)
	setUpStepBackwardButton(ui_state, wf)
}