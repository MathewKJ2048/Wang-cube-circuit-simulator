import { TileType } from "./logic";
import type { UIState } from "./UI";

/*
<div class="tile-picker-search-result">
	<input type="text" value="This is a long non-editable text that can be scrolled horizontally..." readonly><input type="radio" name="radioGroup">
</div>
*/


function getListTileElement(tt : TileType, ui_state: UIState): HTMLDivElement
{
	const container : HTMLDivElement = document.createElement('div');
  	container.className = 'tile-picker-search-result';

	const textInput : HTMLInputElement = document.createElement('input');
	textInput.type = 'text';
	textInput.value = tt.name;
	textInput.readOnly = true;

	const radioInput : HTMLInputElement = document.createElement('input');
	radioInput.type = 'radio';
	radioInput.name = 'tile-picker-radio-group';
	radioInput.addEventListener('click', () => {
		ui_state.selection = tt
		console.log(ui_state.selection)
	})

	container.appendChild(textInput);
	container.appendChild(radioInput);

	return container;
}


export function listTiles(tileTypeList: TileType[], ui_state: UIState) : void
{
	const ttp_panel : HTMLBodyElement = document.getElementById("tile-picker-dynamic") as HTMLBodyElement
	ttp_panel.innerHTML = ''
	tileTypeList.forEach(tt => ttp_panel.appendChild(getListTileElement(tt,ui_state)));
}