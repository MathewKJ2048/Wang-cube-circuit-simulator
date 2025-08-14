import { backInput, classesInput, colorPickerBack, colorPickerDown, colorPickerFront, colorPickerLeft, colorPickerName, colorPickerRight, colorPickerUp, downInput, frontInput, leftInput, nameInput, rightInput, upInput } from "./elements";
import { Name, PlaneTiling, TileType, WangFile, } from "./logic";
import { updatePicker } from "./picker";
import { updatePreview } from "./preview";
import { BACKGROUND_COLOR } from "./render_util";
import type { UIState } from "./UI";
import { Color } from "./util";


function setValues(name : Name,up : string,down: string,left: string,right: string,front: string,back: string) : void
{
	classesInput.value = name.classes
	nameInput.value = name.core
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
function toggleColorPickers(disabled : boolean = true): void
{
	[colorPickerBack,colorPickerDown,colorPickerFront,colorPickerLeft,colorPickerRight,colorPickerUp, colorPickerName].forEach(cpx => cpx.disabled=disabled)
}
function toggleNameInput(disabled : boolean = true): void
{
	nameInput.disabled = disabled
}
function toggleDirectionInputs(disabled : boolean = true): void
{
	[upInput,downInput,leftInput,rightInput,frontInput,backInput].forEach(inp => inp.disabled = disabled)
}


function setUpColorPickers(ui_state: UIState, wf : WangFile): void
{

	function setUp(colorPicker: HTMLInputElement, cf : (tt : TileType) => string)
	{
		colorPicker.addEventListener('input',(e)=>
		{
			const c : Color = Color.fromHex((e.target as HTMLInputElement).value)
			const pt = ui_state.getPickedToken() 
			if(TileType.isTileType(pt))
				WangFile.registerColor(cf(pt),c,wf)
			updateEditor(ui_state,wf)
		})
	}
	setUp(colorPickerUp,tt => tt.up)
	setUp(colorPickerDown,tt => tt.down)
	setUp(colorPickerLeft,tt => tt.left)
	setUp(colorPickerRight,tt => tt.right)
	setUp(colorPickerFront,tt => tt.front)
	setUp(colorPickerBack,tt => tt.back)
	setUp(colorPickerName,tt => tt.name.core)
}

function setUpNameInputs(ui_state : UIState, wf : WangFile): void
{
	function update(name: Name)
	{
		const pt = ui_state.getPickedToken() 
		if(pt === null)return
		if(PlaneTiling.isPlaneTiling(pt))
		{
			pt.name = name
		}
		else if(TileType.isTileType(pt))
		{
			const new_tt = TileType.getCopy(pt)
			new_tt.name = name
			if(WangFile.editTileType(pt,new_tt,wf))ui_state.setPickedToken(new_tt,wf)
		}
		updateEditor(ui_state, wf)
		updatePicker(ui_state, wf)

	}
	nameInput.addEventListener("input",(event)=>{
		const new_name: Name = new Name((event.target as HTMLInputElement).value)
		new_name.classes = (classesInput.value)
		update(new_name)
	})
	classesInput.addEventListener("input",(event)=>{
		const new_name: Name = new Name(nameInput.value);
		new_name.classes = (event.target as HTMLInputElement).value
		update(new_name)
		console.log("AAAAAAAAAAAA")
	})
}

function setUpDirectionInputs(ui_state: UIState, wf: WangFile): void
{
	function setUp(input: HTMLInputElement, cf : (tt: TileType,s:string)=>void)
	{
		input.addEventListener("input",(event)=>
		{
			const text : string = (event.target as HTMLInputElement).value
			const pt = ui_state.getPickedToken()
			if(TileType.isTileType(pt))
			{
				const new_tt = TileType.getCopy(pt)
				cf(new_tt,text) // set an attribute of new_tt to equal text
				if(WangFile.editTileType(pt,new_tt,wf))ui_state.setPickedToken(new_tt,wf)
			}
			updatePicker(ui_state,wf)
			updateEditor(ui_state,wf)
		})
	}
	setUp(upInput,(tt,s)=>{tt.up=s})
	setUp(downInput,(tt,s)=>{tt.down=s})
	setUp(leftInput,(tt,s)=>{tt.left=s})
	setUp(rightInput,(tt,s)=>{tt.right=s})
	setUp(frontInput,(tt,s)=>{tt.front=s})
	setUp(backInput,(tt,s)=>{tt.back=s})
}



export function updateEditor(ui_state : UIState, wf : WangFile): void
{
	updatePreview(ui_state,wf)
	const pt = ui_state.getPickedToken() 
	const b = BACKGROUND_COLOR
	if(pt === null)
	{
		setValues(new Name(""),"","","","","","")
		setColors(b,b,b,b,b,b,b)
		toggleColorPickers()
		toggleNameInput()
		toggleDirectionInputs()
	}
	else if(PlaneTiling.isPlaneTiling(pt))
	{
		setValues(pt.name,"-","-","-","-","-","-")
		setColors(b,b,b,b,b,b,b)
		toggleColorPickers()
		toggleNameInput(false)
		toggleDirectionInputs()
	}
	else if(TileType.isTileType(pt))
	{
		setValues(pt.name,pt.up,pt.down,pt.left,pt.right,pt.front,pt.back)
		toggleColorPickers(false)
		toggleNameInput(false)
		toggleDirectionInputs(false)
		function foo (s:string) : Color {return WangFile.getColorFromString(s,wf)}
		setColors(foo(pt.name.core),foo(pt.up),foo(pt.down),foo(pt.left),foo(pt.right),foo(pt.front),foo(pt.back))
	}
}

export function setUpEditor(ui_state : UIState, wf : WangFile): void
{
	setUpColorPickers(ui_state, wf)
	setUpNameInputs(ui_state, wf)
	setUpDirectionInputs(ui_state, wf)
}