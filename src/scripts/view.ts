import { Camera } from "./render_util.js";
import { resetViewButton, toggleGridButton, zoomInButton, zoomOutButton, zoomSlider } from "./elements.js";
import { getFraction, getValue } from "./util.js";
import { UIState } from "./UI.js";


const MAX_ZOOM = 110
const MIN_ZOOM = 10
const DEFAULT_FRACTION = 0.5

const enableGridIconPath : string = "./icons/grid.svg"
const disableGridIconPath : string = "./icons/no-grid.svg"
const gridIcon : HTMLImageElement = toggleGridButton.querySelector(".grid-icon") as HTMLImageElement;


function updateZoomSlider(c : Camera): void
{
	zoomSlider.value = String(getValue(
	getFraction(c.zoom,MIN_ZOOM,MAX_ZOOM),
	Number(zoomSlider.min),
	Number(zoomSlider.max)))
}

function setUpZoomSlider(c : Camera): void
{
	zoomSlider.addEventListener('input',()=>
	{
		c.zoom = getValue(
			getFraction(Number(zoomSlider.value),Number(zoomSlider.min),Number(zoomSlider.max)),
			MIN_ZOOM, MAX_ZOOM
		)
	})
}


function setUpZoomButtons(c : Camera): void
{
	function zoom(amount: number)
	{
		let f : number = getFraction(c.zoom,MIN_ZOOM,MAX_ZOOM)
		f+=amount
		f = Math.max(0,Math.min(1,f))
		c.zoom = getValue(f,MIN_ZOOM,MAX_ZOOM)
		updateZoomSlider(c)
	}
	zoomInButton.addEventListener('click',()=>{zoom(1/100)})
	zoomOutButton.addEventListener('click',()=>{zoom(-1/100)})
}


function setUpResetViewButton(c: Camera): void
{
	resetViewButton.addEventListener('click',()=>{
		c.r.x = 0
		c.r.y = 0
		c.zoom = getValue(DEFAULT_FRACTION,MIN_ZOOM,MAX_ZOOM)
		updateZoomSlider(c)
	})
}

export function setUpViewControls(ui_state: UIState): void
{
	setUpZoomSlider(ui_state.camera)
	setUpZoomButtons(ui_state.camera)
	setUpResetViewButton(ui_state.camera)
}

export function updateViewControls(ui_state: UIState): void
{
	ui_state.camera.zoom = getValue(DEFAULT_FRACTION,MIN_ZOOM,MAX_ZOOM)
	updateZoomSlider(ui_state.camera)
}


export function updateGridToggle(ui_state: UIState): void
{
	if(ui_state.gridEnabled)
	{
		gridIcon.src = disableGridIconPath;
	}
	else
	{
		gridIcon.src = enableGridIconPath;
	}
}

export function setUpGridToggle(ui_state : UIState): void
{
	toggleGridButton.addEventListener("click",()=>{
		ui_state.gridEnabled = ! ui_state.gridEnabled
		updateGridToggle(ui_state)
	})	
}