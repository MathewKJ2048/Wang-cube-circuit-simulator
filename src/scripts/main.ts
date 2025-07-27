
import { setUpAllCanvases, updateAllCanvases } from "./canvases.js"
import { setupUploadDownloadButtons } from "./file_manager.js"
import { render } from './render.js'
import { UIState } from "./UI.js"
import { setUpMouseDrag } from "./mouse_drag.js"
import { WangFile, getStarterWangFile } from "./logic.js"
import { setUpViewControls, updateViewControls } from "./view_controls.js";
import { setUpGridToggle, updateGridToggle } from "./grid_toggle.js";
import { setUpSearch, updateSearch } from "./search.js";
import { setUpPicker, updatePicker } from "./picker.js"


const wf : WangFile = getStarterWangFile();
const ui_state : UIState = new UIState();


setUpAllCanvases()
updateAllCanvases()

setUpViewControls(ui_state)
updateViewControls(ui_state)


setUpMouseDrag(ui_state)

setUpGridToggle(ui_state)
updateGridToggle(ui_state)


setupUploadDownloadButtons(wf)


setUpSearch(ui_state, wf)
updateSearch(ui_state, wf)

setUpPicker(ui_state, wf)
updatePicker(ui_state, wf)



function animate() {
	requestAnimationFrame(animate);
	render(ui_state)
}

animate()

