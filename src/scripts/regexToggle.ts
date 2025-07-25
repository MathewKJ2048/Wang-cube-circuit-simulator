
import { regexToggleButton, toggleGridButton } from "./elements.js";

export function setRegexToggle(): void  // the state of the button itself is used to determine search
{
	regexToggleButton.addEventListener('click',()=>
	{
		if(toggleGridButton.classList.contains("active"))
			toggleGridButton.classList.remove("active");
		else toggleGridButton.classList.add("active");
		console.log(toggleGridButton.classList)
	})
}