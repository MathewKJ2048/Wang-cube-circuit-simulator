export class Point {
    static isPoint(obj) {
        return typeof obj === 'object' && obj !== null && 'x' in obj && 'y' in obj && typeof obj.x === 'number' && typeof obj.y === 'number';
    }
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
