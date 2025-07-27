import { backInput, colorPickerBack, colorPickerDown, colorPickerFront, colorPickerLeft, colorPickerName, colorPickerRight, colorPickerUp, downInput, frontInput, leftInput, nameInput, rightInput, upInput } from "./elements";
import { PlaneTiling, TileType, WangFile, } from "./logic";
import { updatePicker } from "./picker";
import type { UIState } from "./UI";
import { Color } from "./util";



function setValues(name : string,up : string,down: string,left: string,right: string,front: string,back: string) : void
{
	nameInput.value = name
	upInput.value = up
	downInput.value = down
	leftInput.value = left
	rightInput.value = right
	frontInput.value = front
	backInput.value = back
}
function setColors(name : Color,up: Color,down: Color,left: Color,right: Color,front: Color,back: Color) : void
{
	colorPickerName.value = Color.toHex(name)
	colorPickerUp.value = Color.toHex(up)
	colorPickerDown.value = Color.toHex(down)
	colorPickerLeft.value = Color.toHex(left)
	colorPickerRight.value = Color.toHex(right)
	colorPickerFront.value = Color.toHex(front)
	colorPickerBack.value = Color.toHex(back)
}
function toggleAllColorPickers(disabled : boolean = true): void
{
	[colorPickerBack,colorPickerDown,colorPickerFront,colorPickerLeft,colorPickerRight,colorPickerUp, colorPickerName].forEach(cpx => cpx.disabled=disabled)
	
}
function setUpNameColorPicker(ui_state: UIState) : void
{
	colorPickerName.addEventListener('input', (e) => {
		const hexColor = (e.target as HTMLInputElement).value;
		if(TileType.isTileType(ui_state.pickedToken))
			ui_state.pickedToken.color = Color.fromHex(hexColor)
	})
}
function setUpDirectionColorPickers(ui_state: UIState, wf : WangFile): void
{
	colorPickerUp.addEventListener('input',(e)=>
	{
		const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
		const pt = ui_state.pickedToken
		if(TileType.isTileType(pt))
			WangFile.registerColor(pt.up,c,wf)
		updateEditor(ui_state,wf)
	})
	colorPickerDown.addEventListener('input',(e)=>
	{
		const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
		const pt = ui_state.pickedToken
		if(TileType.isTileType(pt))
			WangFile.registerColor(pt.down,c,wf)
		updateEditor(ui_state,wf)
	})
	colorPickerLeft.addEventListener('input',(e)=>
	{
		const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
		const pt = ui_state.pickedToken
		if(TileType.isTileType(pt))
			WangFile.registerColor(pt.left,c,wf)
		updateEditor(ui_state,wf)
	})
	colorPickerRight.addEventListener('input',(e)=>
	{
		const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
		const pt = ui_state.pickedToken
		if(TileType.isTileType(pt))
			WangFile.registerColor(pt.right,c,wf)
		updateEditor(ui_state,wf)
	})
	colorPickerFront.addEventListener('input',(e)=>
	{
		const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
		const pt = ui_state.pickedToken
		if(TileType.isTileType(pt))
			WangFile.registerColor(pt.front,c,wf)
		updateEditor(ui_state,wf)
	})
	colorPickerBack.addEventListener('input',(e)=>
	{
		const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
		const pt = ui_state.pickedToken
		if(TileType.isTileType(pt))
			WangFile.registerColor(pt.back,c,wf)
		updateEditor(ui_state,wf)
	})
}

function setUpNameInput(ui_state : UIState, wf : WangFile): void
{
	nameInput.addEventListener("input",(event)=>{
		const new_name: string = (event.target as HTMLInputElement).value
		const pt = ui_state.pickedToken
		if(pt === null)return
		if(PlaneTiling.isPlaneTiling(pt))
		{
			pt.name = new_name
		}
		if(TileType.isTileType(pt))
		{
			const new_tt = TileType.getCopy(pt)
			new_tt.name = new_name
			if(WangFile.editTileType(pt,new_tt,wf))ui_state.pickedToken = new_tt
		}
		updateEditor(ui_state, wf)
		updatePicker(ui_state, wf)
		
	})
}



export function updateEditor(ui_state : UIState, wf : WangFile): void
{
	const pt = ui_state.pickedToken
	if(pt === null)
	{
		const b : Color = new Color()
		setValues("","","","","","","")
		setColors(b,b,b,b,b,b,b)
		toggleAllColorPickers()
	}
	if(PlaneTiling.isPlaneTiling(pt))
	{
		const b : Color = new Color()
		setValues(pt.name,"-","-","-","-","-","-")
		setColors(b,b,b,b,b,b,b)
		toggleAllColorPickers()
	}
	if(TileType.isTileType(pt))
	{
		setValues(pt.name,pt.up,pt.down,pt.left,pt.right,pt.front,pt.back)
		toggleAllColorPickers(false)
		setColors(
			pt.color,
			WangFile.getColorFromString(pt.up,wf),
			WangFile.getColorFromString(pt.down,wf),
			WangFile.getColorFromString(pt.left,wf),
			WangFile.getColorFromString(pt.right,wf),
			WangFile.getColorFromString(pt.front,wf),
			WangFile.getColorFromString(pt.back,wf),
		)
	}
}

export function setUpEditor(ui_state : UIState, wf : WangFile): void
{
	setUpNameColorPicker(ui_state)
	setUpDirectionColorPickers(ui_state, wf)
	setUpNameInput(ui_state, wf)
}