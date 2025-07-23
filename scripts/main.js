import { canvasSetup, getCanvas, getContext } from "./canvasSetup.js";
import { setupLoadSaveButtons } from "./fileManager.js";
import { Camera } from "./renderUtil.js";
import { render, setZoomControls } from './render.js';
import { UIState } from "./UI.js";
import { implementMouseDrag } from "./mouseDrag.js";
const canvas = getCanvas();
const ctx = getContext(canvas);
canvasSetup(canvas, ctx);
setupLoadSaveButtons();
let camera = new Camera();
setZoomControls(camera);
let ui_state = new UIState();
implementMouseDrag(ui_state, camera, canvas);
function animate() {
    requestAnimationFrame(animate);
    render(canvas, ctx, camera);
}
animate();
