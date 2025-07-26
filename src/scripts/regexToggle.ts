
import { regexToggleButton } from "./elements.js";
import { UIState } from "./UI.js";

export function setRegexToggle(ui_state: UIState): void  // the state of the button itself is used to determine search
{
	regexToggleButton.addEventListener('click',()=>
	{
		ui_state.regexEnabled = !ui_state.regexEnabled
		if (ui_state.regexEnabled)
		{
			regexToggleButton.classList.add("pressed")
		}
		else
		{
			regexToggleButton.classList.remove("pressed")
		}
		console.log(ui_state.regexEnabled)
		console.log(regexToggleButton.classList)
	})
}