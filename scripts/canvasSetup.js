export function getCanvas() {
    const canvas = document.getElementById('canvas');
    return canvas;
}
export function getContext(canvas) {
    const ctx = canvas.getContext('2d');
    return ctx;
}
export function canvasSetup(canvas, ctx) {
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
