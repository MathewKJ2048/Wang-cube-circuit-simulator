
import { setUpCanvas, updateCanvas } from "./canvas.js"
import { setUpUploadDownloadButtons } from "./file_manager.js"
import { render } from './render.js'
import { UIState } from "./UI.js"
import { setUpMouseDrag } from "./mouse_drag.js"
import { WangFile, getStarterWangFile } from "./logic.js"
import { setUpViewControls, updateViewControls } from "./view_controls.js";
import { setUpGridToggle, updateGridToggle } from "./grid_toggle.js";
import { setUpSearch, updateSearch } from "./search.js";
import { setUpPicker, updatePicker } from "./picker.js"
import { setUpEditor, updateEditor } from "./editor.js"
import { setUpPreview } from "./preview.js"
import { setUpControlButtons, updateControlButtons } from "./control_buttons.js"


const wf : WangFile = getStarterWangFile();
const ui_state : UIState = new UIState();


setUpCanvas()
updateCanvas()

setUpViewControls(ui_state)
updateViewControls(ui_state)


setUpMouseDrag(ui_state)

setUpGridToggle(ui_state)
updateGridToggle(ui_state)


setUpUploadDownloadButtons(ui_state, wf)


setUpSearch(ui_state, wf)
updateSearch(ui_state) // no need wang file since search bar state doesn't depend on wang file

setUpPicker(ui_state, wf)
updatePicker(ui_state, wf)

setUpEditor(ui_state, wf)
setUpPreview(ui_state)
updateEditor(ui_state, wf)

setUpControlButtons(ui_state, wf)
updateControlButtons(ui_state, wf)


function animate() {
	requestAnimationFrame(animate);
	render(ui_state, wf)
}

animate()

