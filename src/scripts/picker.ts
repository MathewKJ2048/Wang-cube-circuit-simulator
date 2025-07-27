import { updateEditor } from "./editor";
import { createPickerButton, deletePickerButton } from "./elements";
import { PlaneTiling, TileType, WangFile } from "./logic";
import { UIState, type PickedToken } from "./UI";

/*
<div class="tile-picker-search-result">
	<input type="text" value="This is a long non-editable text that can be scrolled horizontally..." readonly><input type="radio" name="radioGroup">
</div>
*/


function generateResultForPickedToken(pt : PickedToken, ui_state: UIState, wf : WangFile): HTMLDivElement
{

	const container : HTMLDivElement = document.createElement('div');
  	container.className = 'picker-search-result';

	const textInput : HTMLInputElement = document.createElement('input');
	textInput.type = 'text';
	textInput.value = (pt===null) ? "" : pt.name;
	textInput.readOnly = true;

	const radioInput : HTMLInputElement = document.createElement('input');
	radioInput.type = 'radio';
	radioInput.name = 'picker-radio-group';
	radioInput.addEventListener('click', () => {
		ui_state.pickedToken = pt
		updateEditor(ui_state, wf)
	})

	container.appendChild(textInput);
	container.appendChild(radioInput);

	return container;
}

function setUpPickerCreateButton(ui_state: UIState, wf: WangFile): void
{
	createPickerButton.addEventListener('click',()=>{
		const tt : TileType =  WangFile.addNewTileType(wf)
		ui_state.pickedToken = tt
		updatePicker(ui_state, wf)
		updateEditor(ui_state, wf)
	})
}

function setUpPickerDeleteButton(ui_state: UIState, wf: WangFile): void
{
	deletePickerButton.addEventListener('click',()=>
	{
		const pt = ui_state.pickedToken
		if(pt===null)return
		if(TileType.isTileType(pt))
		{
			if(WangFile.deleteTileType(pt, wf))
			{
				ui_state.pickedToken=null
				// TODO fill in error case
			}
		}
		if(PlaneTiling.isPlaneTiling(pt))
		{
			if(WangFile.deleteSavedPlaneTiling(pt,wf))
			{
				ui_state.pickedToken=null
			}
		}
		updatePicker(ui_state, wf)
		updateEditor(ui_state, wf)
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
	wf.tileTypes.forEach((tt) => resultTokens.push(tt))
	wf.savedSubPlaneTilings.forEach((pt) => resultTokens.push(pt))
	let filteredResultTokens = resultTokens.filter(t => t!==null)
	filteredResultTokens = filteredResultTokens.filter(t => match(t.name,ui_state.searchQuery,ui_state.regexEnabled))
	filteredResultTokens.sort((t1, t2) => t1.name.localeCompare(t2.name))


	const resultsPanel : HTMLBodyElement = document.getElementById("picker-dynamic") as HTMLBodyElement
	generateResultForPickedToken
	resultsPanel.innerHTML = ""
	filteredResultTokens.forEach(t => resultsPanel.appendChild(generateResultForPickedToken(t, ui_state,wf)))

}

export function setUpPicker(ui_state: UIState, wf: WangFile)
{
	setUpPickerCreateButton(ui_state, wf)
	setUpPickerDeleteButton(ui_state, wf)
}