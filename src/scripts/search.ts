
import { regexToggleButton } from "./elements.js";
import { UIState } from "./UI.js";
import { searchInput } from "./elements.js";
import { updatePicker } from "./picker.js"
import { WangFile } from "./logic.js";


function updateRegexToggleButton(ui_state: UIState): void
{
	if (ui_state.regexEnabled)
	{
		regexToggleButton.classList.add("pressed")
	}
	else
	{
		regexToggleButton.classList.remove("pressed")
	}
}

function setUpRegexToggleButton(ui_state: UIState, wf : WangFile): void  
{
	regexToggleButton.addEventListener('click',()=>
	{
		ui_state.regexEnabled = !ui_state.regexEnabled
		updatePicker(ui_state, wf)
		updateRegexToggleButton(ui_state)
	})
}

function setUpSearchBar(ui_state : UIState, wf : WangFile) : void
{
	searchInput.addEventListener('input', (event)=>
	{
		ui_state.searchQuery = (event.target as HTMLInputElement).value
		updatePicker(ui_state, wf)
	});
}

export function setUpSearch(ui_state : UIState, wf : WangFile): void
{
	setUpSearchBar(ui_state, wf)
	setUpRegexToggleButton(ui_state, wf)
}

export function updateSearch(ui_state : UIState) : void
{
	updateRegexToggleButton(ui_state)
}

