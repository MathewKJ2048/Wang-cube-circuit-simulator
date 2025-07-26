
import { canvasSetup } from "./canvasSetup.js"
import { setupUploadDownloadButtons } from "./fileManager.js"
import { Camera } from "./renderUtil.js"
import { renderBackground, renderGrid, renderSelectionZone } from './render.js'
import { UIState } from "./UI.js"
import { implementMouseDrag } from "./mouseDrag.js"
import { WangFile, getStarterWangFile } from "./logic.js"
import { setupSelection, SelectionZone } from "./selection.js";
import { setViewControls } from "./viewControls.js";
import { setGridToggle } from "./gridToggle.js";
import { setRegexToggle } from "./regexToggle.js";


canvasSetup()

let camera : Camera = new Camera();
setViewControls(camera)

let ui_state : UIState = new UIState()
implementMouseDrag(ui_state, camera)
setGridToggle(ui_state)
setRegexToggle()


const wf : WangFile = getStarterWangFile();
setupUploadDownloadButtons(wf)
// listTiles(wf)

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

