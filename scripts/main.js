import { canvasSetup, getCanvas, getContext } from "./canvasSetup.js";
import { setupUploadDownloadButtons } from "./fileManager.js";
import { Camera } from "./renderUtil.js";
import { render, setZoomControls } from './render.js';
import { UIState } from "./UI.js";
import { implementMouseDrag } from "./mouseDrag.js";
import { getStarterWangFile } from "./logic.js";
const canvas = getCanvas();
const ctx = getContext(canvas);
canvasSetup(canvas, ctx);
let camera = new Camera();
setZoomControls(camera);
let ui_state = new UIState();
implementMouseDrag(ui_state, camera, canvas);
const wf = getStarterWangFile();
setupUploadDownloadButtons(wf);
function animate() {
    requestAnimationFrame(animate);
    render(canvas, ctx, camera);
}
animate();
