"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // Non-null assertion
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
if (canvas && ctx) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}
else {
    console.error('Canvas initialization failed');
}
class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class Camera {
    constructor() {
        this.p = new Point();
        this.zoom = 1;
    }
}
class Color {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
    }
}
const ANYTHING = "";
class TileType {
    constructor() {
        this.up = ANYTHING;
        this.down = ANYTHING;
        this.left = ANYTHING;
        this.right = ANYTHING;
        this.front = ANYTHING;
        this.back = ANYTHING;
        this.name = "";
        this.color = new Color();
    }
}
class Tile {
    constructor() {
        this.tileType = new TileType();
        this.upTile = null;
        this.downTile = null;
        this.leftTile = null;
        this.rightTile = null;
    }
}
