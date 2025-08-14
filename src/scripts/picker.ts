
import { updateControlButtons } from "./control_buttons";
import { updateEditor } from "./editor";
import { ccwPickerButton, copyPickerButton, createPickerButton, cwPickerButton, deletePickerButton, flipPickerButton } from "./elements";
import { PlaneTiling, TileType, WangFile } from "./logic";
import { UIState, type PickedToken } from "./UI";

/*
<div class="tile-picker-search-result">
	<input type="text" value="This is a long non-editable text that can be scrolled horizontally..." readonly><input type="radio" name="radioGroup">
</div>
*/


function updateDependencies(ui_state: UIState, wf : WangFile): void
{
	updateEditor(ui_state, wf)
	updateControlButtons(ui_state, wf)
	updatePickerButtons(ui_state)
}

function generateResultForPickableToken( token : PickedToken,ui_state: UIState, wf : WangFile): HTMLDivElement
{

	const container : HTMLDivElement = document.createElement('div');
  	container.className = 'picker-search-result';

	const textInput : HTMLInputElement = document.createElement('input');
	textInput.type = 'text';
	textInput.value = (token===null) ? "" : token.name.getFullyQualified();
	textInput.readOnly = true;

	const radioInput : HTMLInputElement = document.createElement('input');
	radioInput.type = 'radio';
	radioInput.name = 'picker-radio-group';
	radioInput.addEventListener('click', () => {
		ui_state.setPickedToken(token, wf)
		updateDependencies(ui_state,wf)
	})
	if(ui_state.getPickedToken()===token)radioInput.checked=true

	container.appendChild(textInput);
	container.appendChild(radioInput);

	return container;
}

function setUpPickerCreateButton(ui_state: UIState, wf: WangFile): void
{
	createPickerButton.addEventListener('click',()=>{
		const tt : TileType =  WangFile.addNewTileType(wf)
		ui_state.setPickedToken(tt, wf)
		updatePicker(ui_state, wf)
		updateDependencies(ui_state,wf)
	})
}

function setUpPickerCopyButton(ui_state : UIState, wf: WangFile): void
{
	copyPickerButton.addEventListener('click',()=>{
		const pt = ui_state.getPickedToken()
		if(pt===null || PlaneTiling.isPlaneTiling(pt))return
		const tt : TileType =  WangFile.addCopyTileType(pt, wf)
		ui_state.setPickedToken(tt, wf)
		updatePicker(ui_state, wf)
		updateDependencies(ui_state,wf)
	})
}

function setUpPickerCwButton(ui_state : UIState, wf: WangFile): void
{
	cwPickerButton.addEventListener('click', ()=>{
		const pt = ui_state.getPickedToken()
		if(pt===null || PlaneTiling.isPlaneTiling(pt))return
		const temp = pt.right
		pt.right = pt.up
		pt.up = pt.left
		pt.left = pt.down
		pt.down = temp
		updatePicker(ui_state, wf)
		updateDependencies(ui_state,wf)
	})
}

function setUpPickerCcwButton(ui_state : UIState, wf: WangFile): void
{
	ccwPickerButton.addEventListener('click', ()=>{
		const pt = ui_state.getPickedToken()
		if(pt===null || PlaneTiling.isPlaneTiling(pt))return
		const temp = pt.right
		pt.right = pt.down
		pt.down = pt.left
		pt.left = pt.up
		pt.up = temp
		updatePicker(ui_state, wf)
		updateDependencies(ui_state,wf)
	})
}

function setUpPickerFlipButton(ui_state : UIState, wf: WangFile): void
{
	flipPickerButton.addEventListener('click', ()=>{
		const pt = ui_state.getPickedToken()
		if(pt===null || PlaneTiling.isPlaneTiling(pt))return
		const temp = pt.right
		pt.right = pt.left
		pt.left = temp
		updatePicker(ui_state, wf)
		updateDependencies(ui_state,wf)
	})
}

function setUpPickerDeleteButton(ui_state: UIState, wf: WangFile): void
{
	deletePickerButton.addEventListener('click',()=>
	{
		const pt = ui_state.getPickedToken()
		if(pt===null)return
		if(TileType.isTileType(pt))
		{
			if(WangFile.deleteTileType(pt, wf))
			{
				ui_state.setPickedToken(null, wf)
				// TODO fill in error case
			}
		}
		if(PlaneTiling.isPlaneTiling(pt))
		{
			if(WangFile.deleteSavedPlaneTiling(pt,wf))
			{
				ui_state.setPickedToken(null, wf)
			}
		}
		updatePicker(ui_state,wf)
		updateDependencies(ui_state,wf)
	})
}


function match(name: string, query: string, regex: boolean = false) : boolean
{
	if(regex)
	{
		try
		{
			const regExp : RegExp = new RegExp(query);
			return regExp.test(name)
		}
		catch(e){console.warn("Invalid regex pattern")}
	}
	return name.includes(query)
}


export function updatePicker(ui_state: UIState, wf: WangFile): void
{
	const resultTokens : PickedToken[] = []
	wf.tileTypes.forEach((tt) => resultTokens.push(tt)) // add all tile-types
	wf.savedSubPlaneTilings.forEach((pt) => resultTokens.push(pt)) // add all saved tilings

	// remove null tokens and ones whose names don't match search query
	let filteredResultTokens = resultTokens.filter(t => t!==null)
	filteredResultTokens = filteredResultTokens.filter(t => match(t.name.getFullyQualified(),ui_state.searchQuery,ui_state.regexEnabled))

	filteredResultTokens.sort((t1, t2) => t1.name.getFullyQualified().localeCompare(t2.name.getFullyQualified()))

	// DOM manipulation
	const resultsPanel : HTMLBodyElement = document.getElementById("picker-dynamic") as HTMLBodyElement
	resultsPanel.innerHTML = ""
	filteredResultTokens.forEach(t => resultsPanel.appendChild(generateResultForPickableToken(t, ui_state,wf)))

	

}

export function updatePickerButtons(ui_state: UIState): void
{
	const buttons = [deletePickerButton, copyPickerButton, cwPickerButton, ccwPickerButton, flipPickerButton]
	const pt = ui_state.getPickedToken()
	if(TileType.isTileType(pt))buttons.forEach(b => b.disabled = false)
	else buttons.forEach(b => b.disabled = true)
}

export function setUpPicker(ui_state: UIState, wf: WangFile) : void
{
	setUpPickerCreateButton(ui_state, wf)
	setUpPickerDeleteButton(ui_state, wf)
	setUpPickerCopyButton(ui_state, wf)
	setUpPickerCwButton(ui_state, wf)
	setUpPickerCcwButton(ui_state, wf)
	setUpPickerFlipButton(ui_state, wf)
}