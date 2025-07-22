export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d'); // Non-null assertion
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
export function canvasSetup() {
    if (canvas && ctx) {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    else {
        console.error('Canvas initialization failed');
    }
}
