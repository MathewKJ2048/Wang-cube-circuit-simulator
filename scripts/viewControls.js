import { resetViewButton, zoomInButton, zoomOutButton, zoomSlider } from "./elements.js";
import { getFraction, getValue } from "./util.js";
const MAX_ZOOM = 110;
const MIN_ZOOM = 10;
const DEFAULT_FRACTION = 0.5;
function updateZoomSliderFromCamera(c) {
    zoomSlider.value = String(getValue(getFraction(c.zoom, MIN_ZOOM, MAX_ZOOM), Number(zoomSlider.min), Number(zoomSlider.max)));
}
function updateCameraFromZoomSlider(c) {
    c.zoom = getValue(getFraction(Number(zoomSlider.value), Number(zoomSlider.min), Number(zoomSlider.max)), MIN_ZOOM, MAX_ZOOM);
}
function setupZoomSlider(c) {
    updateZoomSliderFromCamera(c);
    zoomSlider.addEventListener('input', () => {
        updateCameraFromZoomSlider(c);
    });
}
function setupZoomButtons(c) {
    function zoom(amount) {
        let f = getFraction(c.zoom, MIN_ZOOM, MAX_ZOOM);
        f += amount;
        f = Math.max(0, Math.min(1, f));
        c.zoom = getValue(f, MIN_ZOOM, MAX_ZOOM);
        updateZoomSliderFromCamera(c);
    }
    zoomInButton.addEventListener('click', () => { zoom(1 / 100); });
    zoomOutButton.addEventListener('click', () => { zoom(-1 / 100); });
}
function setResetViewButton(c) {
    resetViewButton.addEventListener('click', () => {
        c.r.x = 0;
        c.r.y = 0;
        c.zoom = getValue(DEFAULT_FRACTION, MIN_ZOOM, MAX_ZOOM);
        updateZoomSliderFromCamera(c);
    });
}
export function setViewControls(c) {
    c.zoom = getValue(DEFAULT_FRACTION, MIN_ZOOM, MAX_ZOOM);
    setupZoomSlider(c);
    setupZoomButtons(c);
    setResetViewButton(c);
}
