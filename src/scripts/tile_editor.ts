import { WangFile } from "./logic";
import { UIState } from "./UI";
import { createTileTypeButton } from "./elements";
import { listTiles } from "./tile_picker";


function setCreateTileTypeButton(wf: WangFile , ui_state: UIState) : void
{
	createTileTypeButton.addEventListener("click", ()=>
	{
		WangFile.addNewTileType(wf)
		listTiles(wf.tileTypes, ui_state)
	})
}

export function setupTileTypeEditingButtons(ui_state: UIState, wf: WangFile) : void
{
	setCreateTileTypeButton(wf, ui_state )
}