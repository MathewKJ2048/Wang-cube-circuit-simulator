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
export class Color {
    constructor(r = 0, g = 0, b = 0) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static isColor(obj) {
        return typeof obj === 'object' && obj !== null && 'r' in obj && 'g' in obj && 'b' in obj && typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number';
    }
}
export function getFraction(value, min, max) {
    return (value - min) / (max - min);
}
export function getValue(fraction, min, max) {
    return fraction * (max - min) + min;
}
