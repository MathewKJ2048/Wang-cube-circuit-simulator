import { canvasSetup, getCanvas, getContext } from "./canvasSetup.js"
import { setupUploadDownloadButtons } from "./fileManager.js"
import { Camera } from "./renderUtil.js"
import { render, setZoomControls } from './render.js'
import { UIState } from "./UI.js"
import { implementMouseDrag } from "./mouseDrag.js"


const canvas : HTMLCanvasElement = getCanvas()
const ctx : CanvasRenderingContext2D = getContext(canvas)
canvasSetup(canvas, ctx)

setupUploadDownloadButtons()

let camera : Camera = new Camera();

setZoomControls(camera)

let ui_state : UIState = new UIState()
implementMouseDrag(ui_state, camera, canvas)


function animate() {
	requestAnimationFrame(animate);
	render(canvas, ctx, camera)
}
animate()

