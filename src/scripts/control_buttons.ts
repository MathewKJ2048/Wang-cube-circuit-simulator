import { UpdateCacheButtons } from "./cache";
import { updateEditor } from "./editor";
import { canvas, defaultButton,  eraseButton, pasteButton, placeButton, selectButton } from "./elements";
import {  PlaneTiling, Tile, TileType, WangFile } from "./logic";
import { updatePicker } from "./picker";
import { getMousePositionSnapped, Mode, type UIState } from "./UI";
import { doNothingWith } from "./util";



function setUpPrimaryGroup(ui_state: UIState, wf: WangFile): void
{
	function setUp(button : HTMLButtonElement, mode : Mode): void
	{
		button.addEventListener("click", ()=>{
			ui_state.setMode(mode)
			updateControlButtons(ui_state, wf)
		})
	}
	setUp(eraseButton,Mode.ERASE)
	setUp(placeButton,Mode.PLACE)
	setUp(selectButton, Mode.SELECT)
	setUp(defaultButton, Mode.DEFAULT)
	setUp(pasteButton,Mode.PASTE)
}


function setUpPlace(ui_state: UIState, wf: WangFile) : void
{
	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.getMode() !== Mode.PLACE)return
		const mr = getMousePositionSnapped(e,ui_state.camera)
		const pk = ui_state.getPickedToken()
		if(TileType.isTileType(pk))
		{
			const t : Tile = new Tile(pk)
			t.r = mr
			WangFile.addTile(t,wf)
		}
		else if(PlaneTiling.isPlaneTiling(pk))
		{
			WangFile.addPlaneTiling(pk,mr,wf)
		}
		UpdateCacheButtons(ui_state,wf)
	})
}

function setUpPaste(ui_state: UIState, wf: WangFile) : void
{
	canvas.addEventListener("click",(e)=>{
		if(ui_state.getMode()!==Mode.PASTE)return
		const mr = getMousePositionSnapped(e,ui_state.camera)
		const cb = ui_state.getClipBoard()
		if(cb!==null)WangFile.addPlaneTiling(cb,mr,wf)
	})
}

function setUpDefaultPicking(ui_state: UIState, wf: WangFile): void
{
	canvas.addEventListener('click',(e)=>
	{
		if(ui_state.getMode()!==Mode.DEFAULT)return
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
		if(ui_state.getMode()!==Mode.ERASE)return
		const mr = getMousePositionSnapped(e,ui_state.camera)
		WangFile.deleteTileAt(mr,wf)
		UpdateCacheButtons(ui_state,wf)
	})
}

export function updateControlButtons(ui_state: UIState, wf : WangFile)
{
	function updateWithMode(button : HTMLButtonElement, trigger: Mode)
	{
		if(ui_state.getMode() === trigger)button.classList.add("pressed")
		else button.classList.remove("pressed")
	}
	updateWithMode(defaultButton,Mode.DEFAULT)
	updateWithMode(eraseButton,Mode.ERASE)
	updateWithMode(placeButton,Mode.PLACE)
	updateWithMode(selectButton, Mode.SELECT)
	updateWithMode(pasteButton,Mode.PASTE)



	if(ui_state.getPickedToken() === null)placeButton.disabled = true
	else placeButton.disabled = false	

	if(ui_state.getClipBoard() !== null)pasteButton.disabled=false
	else pasteButton.disabled=true


	doNothingWith(wf)
}

export function setUpControlButtons(ui_state: UIState, wf : WangFile)
{
	setUpPrimaryGroup(ui_state, wf)
	setUpDefaultPicking(ui_state, wf)
	setUpPlace(ui_state, wf)
	setUpErase(ui_state,wf)
	setUpPaste(ui_state,wf)
}