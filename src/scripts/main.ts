
import { setUpCanvas, updateCanvas } from "./canvas.js"
import { setUpUploadDownloadButtons } from "./file.js"
import { render } from './render.js'
import { UIState } from "./UI.js"
import { setUpMouseDrag } from "./mouse_drag.js"
import { WangFile, getStarterWangFile } from "./logic.js"
import { setUpGridToggle, setUpViewControls, updateGridToggle, updateViewControls } from "./view.js";
import { setUpSearch, updateSearch } from "./search.js";
import { setUpPicker, updatePicker } from "./picker.js"
import { setUpEditor, updateEditor } from "./editor.js"
import { setUpPreview } from "./preview.js"
import { setUpControlButtons, updateControlButtons } from "./control_buttons.js"
import { setUpSimulationButtons, updateSimulationButtons } from "./simulation.js"
import { setUpCacheButtons,  UpdateCacheButtons, } from "./cache.js"
import { setUpSelection, updateSelectionButtons } from "./select.js"


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

setUpSimulationButtons(ui_state,wf)
updateSimulationButtons(ui_state, wf)

setUpCacheButtons(ui_state,wf)
UpdateCacheButtons(ui_state,wf)

setUpSelection(ui_state, wf)
updateSelectionButtons(ui_state)


function animate() {
	requestAnimationFrame(animate);
	render(ui_state, wf)
}

animate()

