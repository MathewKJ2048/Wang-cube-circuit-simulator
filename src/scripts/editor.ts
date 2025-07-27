import { backInput, colorPickerBack, colorPickerDown, colorPickerFront, colorPickerLeft, colorPickerName, colorPickerRight, colorPickerUp, downInput, frontInput, leftInput, nameInput, rightInput, upInput } from "./elements";
import { PlaneTiling, TileType, } from "./logic";
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




export function updateEditor(ui_state : UIState): void
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
		colorPickerName.value = Color.toHex(pt.color)
		toggleAllColorPickers(false)
	}
	console.log("updated editor")
}

export function setUpEditor(): void
{

}