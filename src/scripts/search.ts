
import { regexToggleButton } from "./elements.js";
import { UIState } from "./UI.js";
import { searchInput } from "./elements.js";
import { listTiles } from "./tile_picker.js"
import { WangFile } from "./logic.js";


export function match(name: string, query: string, regex: boolean = false) : boolean
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


function updateSearchResults(ui_state : UIState, wf : WangFile) : void
{
	listTiles(
		wf.tileTypes.filter(
			tt => 
			match(tt.name,ui_state.searchQuery,ui_state.regexEnabled
	)),ui_state)
}

function setRegexToggle(ui_state: UIState, wf : WangFile): void  
{
	regexToggleButton.addEventListener('click',()=>
	{
		ui_state.regexEnabled = !ui_state.regexEnabled
		updateSearchResults(ui_state, wf)
		if (ui_state.regexEnabled)
		{
			regexToggleButton.classList.add("pressed")
		}
		else
		{
			regexToggleButton.classList.remove("pressed")
		}
	})
}

function setSearchBar(ui_state : UIState, wf : WangFile) : void
{
	searchInput.addEventListener('input', (event)=>
	{
		ui_state.searchQuery = (event.target as HTMLInputElement).value
		updateSearchResults(ui_state, wf)
	});
}

export function setUpSearch(ui_state : UIState, wf : WangFile): void
{
	setSearchBar(ui_state, wf)
	setRegexToggle(ui_state, wf)
	updateSearchResults(ui_state, wf)
}

