export class Vector {
    static isVector(obj) {
        return typeof obj === 'object' && obj !== null && 'x' in obj && 'y' in obj && typeof obj.x === 'number' && typeof obj.y === 'number';
    }
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    add(p) {
        return new Vector(this.x + p.x, this.y + p.y);
    }
    sub(p) {
        return new Vector(this.x - p.x, this.y - p.y);
    }
    scale(k) {
        return new Vector(this.x * k, this.y * k);
    }
}
