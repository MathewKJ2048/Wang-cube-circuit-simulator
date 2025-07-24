import { canvas, ctx } from "./elements.js";
export function canvasSetup() {
    if (!canvas || !ctx) {
        console.error('Canvas initialization failed');
        return;
    }
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}
