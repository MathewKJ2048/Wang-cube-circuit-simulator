import { UpdateCacheButtons } from "./cache";
import { updateControlButtons } from "./control_buttons";
import { updateEditor } from "./editor";
import { canvas, copyButton, cutButton, deleteButton, saveButton } from "./elements";
import { DEFAULT_PLANE_TILING_NAME, Name, PlaneTiling, Tile, WangFile } from "./logic";
import { updatePicker } from "./picker";
import { updatePreview } from "./preview";
import { getMousePosition, Mode, type UIState } from "./UI";
import { isWithinSelection, Vector } from "./util";


function setUpSelector(ui_state: UIState): void
{
	canvas.addEventListener("click",(e)=>{

		if(ui_state.getMode()!==Mode.SELECT)return
		const mr: Vector = getMousePosition(e, ui_state.camera)

		// cycle through the modes of the selector
		if(ui_state.selectorFirstCorner === null)ui_state.selectorFirstCorner = mr
		else if(ui_state.selectorSecondCorner === null)ui_state.selectorSecondCorner = mr
		else ui_state.selectorFirstCorner = ui_state.selectorSecondCorner = null

		updateSelectionButtons(ui_state)

	})
}


function collapseModeAndUpdateDependencies(ui_state: UIState, wf: WangFile): void
{
	ui_state.setMode(Mode.DEFAULT)
	updateSelectionButtons(ui_state)
	updateControlButtons(ui_state,wf)
	updatePicker(ui_state,wf)
	updatePreview(ui_state,wf)
	updateEditor(ui_state,wf)
	UpdateCacheButtons(ui_state,wf)
}

function getSelectedTileList(ui_state: UIState, wf: WangFile) : Tile[]
{
	return wf.mainPlaneTiling.tiles
	.filter(t => isWithinSelection(t.r,ui_state.selectorFirstCorner,ui_state.selectorSecondCorner))
}

function getReducedPlaneTilingInSelector(ui_state: UIState, wf: WangFile): PlaneTiling
{
	const pt = new PlaneTiling()
	pt.name = new Name(DEFAULT_PLANE_TILING_NAME)
	pt.tiles = getSelectedTileList(ui_state,wf).map(t => Tile.copy(t))
	return PlaneTiling.reduce(pt)
}


function setUpSave(ui_state: UIState, wf: WangFile): void
{
	saveButton.addEventListener("click",()=>{

		const pt_saved = getReducedPlaneTilingInSelector(ui_state,wf)
		wf.savedSubPlaneTilings.push(pt_saved)
		ui_state.setPickedToken(pt_saved,wf)
		collapseModeAndUpdateDependencies(ui_state,wf)
	})
}

function setUpCopy(ui_state: UIState, wf: WangFile) : void
{
	copyButton.addEventListener("click",()=>{
		ui_state.setClipBoard(getReducedPlaneTilingInSelector(ui_state,wf))
		collapseModeAndUpdateDependencies(ui_state,wf)
	})
}

function setUpDelete(ui_state: UIState, wf: WangFile): void
{
	deleteButton.addEventListener("click",()=>{
		getSelectedTileList(ui_state,wf).forEach(t => 
			PlaneTiling.deleteTileAt(t.r,wf.mainPlaneTiling))
		collapseModeAndUpdateDependencies(ui_state,wf)
	})
}

function setUpCut(ui_state: UIState,wf: WangFile): void
{
	cutButton.addEventListener("click",()=>{
		ui_state.setClipBoard(getReducedPlaneTilingInSelector(ui_state,wf))
		getSelectedTileList(ui_state,wf).forEach(t => 
			PlaneTiling.deleteTileAt(t.r,wf.mainPlaneTiling))
		collapseModeAndUpdateDependencies(ui_state,wf)
	})
}




export function setUpSelection(ui_state: UIState, wf: WangFile): void
{
	setUpSelector(ui_state)
	setUpSave(ui_state,wf)
	setUpDelete(ui_state,wf)
	setUpCopy(ui_state,wf)
	setUpCut(ui_state,wf)
}

export function updateSelectionButtons(ui_state: UIState)
{
	if(ui_state.selectorFirstCorner !== null && ui_state.selectorSecondCorner !== null)
	{
		cutButton.disabled = false
		deleteButton.disabled = false
		saveButton.disabled = false
		copyButton.disabled = false
	}
	else
	{
		cutButton.disabled = true
		deleteButton.disabled = true
		saveButton.disabled = true
		copyButton.disabled = true
	}
}