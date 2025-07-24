import { canvasSetup } from "./canvasSetup.js";
import { setupUploadDownloadButtons } from "./fileManager.js";
import { Camera } from "./renderUtil.js";
import { renderBackground, renderGrid, renderSelectionZone } from './render.js';
import { UIState } from "./UI.js";
import { implementMouseDrag } from "./mouseDrag.js";
import { getStarterWangFile } from "./logic.js";
import { setupSelection, SelectionZone } from "./selection.js";
import { setViewControls } from "./viewControls.js";
canvasSetup();
let camera = new Camera();
setViewControls(camera);
let ui_state = new UIState();
implementMouseDrag(ui_state, camera);
const wf = getStarterWangFile();
setupUploadDownloadButtons(wf);
const selectionZone = new SelectionZone();
setupSelection(ui_state, selectionZone, camera);
function render() {
    renderBackground(camera);
    renderGrid(camera);
    renderSelectionZone(selectionZone, camera, ui_state);
}
function animate() {
    requestAnimationFrame(animate);
    render();
}
animate();
