import { UIState } from "./UI.js";
import { toggleGridButton } from "./elements.js";


const enableGridIconPath : string = "./icons/grid.svg"
const disableGridIconPath : string = "./icons/no-grid.svg"
const gridIcon : HTMLImageElement = toggleGridButton.querySelector(".grid-icon") as HTMLImageElement;

export function setGridToggle(ui_state : UIState): void
{
	toggleGridButton.addEventListener("click",()=>{
		ui_state.gridEnabled = ! ui_state.gridEnabled

		if(ui_state.gridEnabled)
		{
			gridIcon.src = disableGridIconPath;
		}
		else
		{
			gridIcon.src = enableGridIconPath;
		}
	})	
}