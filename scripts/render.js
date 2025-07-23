import { Vector } from './util.js';
import { fromScreenCoordinates, toScreenCoordinates } from './renderUtil.js';
export function renderGrid(c, canvas, ctx) {
    let min_x = Math.floor(fromScreenCoordinates(new Vector(0, 0), c, canvas).x);
    let max_x = Math.ceil(fromScreenCoordinates(new Vector(canvas.width, 0), c, canvas).x);
    let max_y = Math.ceil(fromScreenCoordinates(new Vector(0, 0), c, canvas).y);
    let min_y = Math.floor(fromScreenCoordinates(new Vector(0, canvas.height), c, canvas).y);
    ctx.strokeStyle = "white";
    for (let i = min_x - 0.5; i <= max_x + 0.5; i++) {
        let start = toScreenCoordinates(new Vector(i, min_y - 0.5), c, canvas);
        let end = toScreenCoordinates(new Vector(i, max_y + 0.5), c, canvas);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
    for (let i = min_y - 0.5; i <= max_y + 0.5; i++) {
        let start = toScreenCoordinates(new Vector(min_x - 0.5, i), c, canvas);
        let end = toScreenCoordinates(new Vector(max_x + 0.5, i), c, canvas);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
}
export function render(canvas, ctx, c) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderGrid(c, canvas, ctx);
}
export function setZoomControls(c) {
    const slider = document.getElementById('zoom-slider');
    slider.addEventListener('input', function () {
        c.zoom = Number(this.value) + 10;
    });
}
