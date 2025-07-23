import { canvasSetup, canvas, ctx } from "./canvasSetup.js";
import { setupLoadSaveButtons } from "./fileManager.js";
import { render, setZoomControls } from "./render.js";
canvasSetup();
setupLoadSaveButtons();
setZoomControls();
function animate() {
    requestAnimationFrame(animate);
    render(canvas, ctx);
}
animate();
