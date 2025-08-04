import { UpdateCacheButtons } from "./cache";
import { updateEditor } from "./editor";
import { canvas, defaultButton,  eraseButton, placeButton, selectButton } from "./elements";
import {  Tile, TileType, WangFile } from "./logic";
import { updatePicker } from "./picker";
import { getMousePositionSnapped, Mode, type UIState } from "./UI";



function setUpPrimaryGroup(ui_state: UIState, wf: WangFile): void
{
	function setUp(button : HTMLButtonElement, mode : Mode): void
	{
		button.addEventListener("click", ()=>{
			ui_state.mode = mode
			updateControlButtons(ui_state, wf)
		})
	}
	setUp(eraseButton,Mode.ERASE)
	setUp(placeButton,Mode.PLACE)
	setUp(selectButton, Mode.SELECT)
	setUp(defaultButton, Mode.DEFAULT)
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
		UpdateCacheButtons(ui_state,wf)
	})
}

function setUpDefaultPicking(ui_state: UIState, wf: WangFile): void
{
	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.mode!==Mode.DEFAULT)return
		const mr = getMousePositionSnapped(e,ui_state.camera)
		const t_n : Tile | null = WangFile.getTileAt(mr,wf)
		if(Tile.isTile(t_n))
		{
			ui_state.setPickedToken(t_n.tileType,wf)
			updatePicker(ui_state,wf)
			updateEditor(ui_state,wf)
			updateControlButtons(ui_state,wf)
		}
	})
}



function setUpErase(ui_state: UIState, wf: WangFile): void
{
	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.mode!==Mode.ERASE)return
		const mr = getMousePositionSnapped(e,ui_state.camera)
		WangFile.deleteTileAt(mr,wf)
		UpdateCacheButtons(ui_state,wf)
	})
}

export function updateControlButtons(ui_state: UIState, wf : WangFile)
{
	function updateWithMode(button : HTMLButtonElement, trigger: Mode)
	{
		if(ui_state.mode === trigger)button.classList.add("pressed")
		else button.classList.remove("pressed")
	}
	updateWithMode(defaultButton,Mode.DEFAULT)
	updateWithMode(eraseButton,Mode.ERASE)
	updateWithMode(placeButton,Mode.PLACE)
	updateWithMode(selectButton, Mode.SELECT)


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
	setUpPrimaryGroup(ui_state, wf)
	setUpDefaultPicking(ui_state, wf)
	setUpPlace(ui_state, wf)
	setUpErase(ui_state,wf)
}