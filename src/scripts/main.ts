
import { canvasSetup } from "./canvas_setup.js"
import { setupUploadDownloadButtons } from "./file_manager.js"
import { Camera } from "./render_util.js"
import { renderBackground, renderGrid, renderSelectionZone } from './render.js'
import { UIState } from "./UI.js"
import { implementMouseDrag } from "./mouse_drag.js"
import { WangFile, getStarterWangFile } from "./logic.js"
import { setupSelection, SelectionZone } from "./selection.js";
import { setViewControls } from "./view_controls.js";
import { setGridToggle } from "./grid_toggle.js";
import { setUpSearch } from "./search.js";
import { setupTileTypeEditingButtons } from "./tile_editor.js"



canvasSetup()

let camera : Camera = new Camera();
setViewControls(camera)


const wf : WangFile = getStarterWangFile();


let ui_state : UIState = new UIState(wf.tileTypes[0])

implementMouseDrag(ui_state, camera)
setGridToggle(ui_state)

setupUploadDownloadButtons(wf)
setUpSearch(ui_state, wf)
setupTileTypeEditingButtons(ui_state, wf)

const selectionZone : SelectionZone = new SelectionZone()
setupSelection(ui_state, selectionZone, camera)



function render()
{
	renderBackground()
	renderGrid(camera, ui_state)
	renderSelectionZone(selectionZone, camera, ui_state)
}

function animate() {
	requestAnimationFrame(animate);
	render()
}
animate()

