import { canvas, defaultButton, placeButton } from "./elements";
import {  Tile, TileType, WangFile } from "./logic";
import { getMousePositionSnapped, Mode, type UIState } from "./UI";


function setUpDefaultButton(ui_state: UIState, wf: WangFile) : void
{
	defaultButton.addEventListener('click',()=>{
		ui_state.mode = Mode.DEFAULT
		updateControlButtons(ui_state, wf)
	})
}

function setUpPlaceButton(ui_state: UIState, wf: WangFile) : void
{
	placeButton.addEventListener('click',()=>{
		ui_state.mode = Mode.PLACE
		updateControlButtons(ui_state, wf)
	})
}

function setUpPlace(ui_state: UIState, wf: WangFile) : void
{
	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.mode !== Mode.PLACE)return
		const mr = getMousePositionSnapped(e,ui_state.camera)
		const pt = ui_state.getPickedToken()
		if(TileType.isTileType(pt))
		{
			const t : Tile = new Tile(pt)
			t.r = mr
			if(WangFile.addTile(t,wf))console.log("success")
		}
		
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
	setUpPlaceButton(ui_state, wf)
	setUpPlace(ui_state, wf)
}