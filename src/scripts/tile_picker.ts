import { TileType } from "./logic";

/*
<div class="tile-picker-search-result">
	<input type="text" value="This is a long non-editable text that can be scrolled horizontally..." readonly><input type="radio" name="radioGroup">
</div>
*/


function getListTileElement(tt : TileType): HTMLDivElement
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

	container.appendChild(textInput);
	container.appendChild(radioInput);

	return container;
}


export function listTiles(tileTypeList: TileType[]) : void
{
	const ttp_panel : HTMLBodyElement = document.getElementById("tile-picker-dynamic") as HTMLBodyElement
	ttp_panel.innerHTML = ''
	tileTypeList.forEach(tt => ttp_panel.appendChild(getListTileElement(tt)));
}