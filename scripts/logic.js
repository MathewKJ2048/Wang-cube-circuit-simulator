import { Point } from './util.js';
export class Color {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
    }
    static isColor(obj) {
        return typeof obj === 'object' && obj !== null && 'r' in obj && 'g' in obj && 'b' in obj && typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number';
    }
}
export const ANYTHING = "";
export class TileType {
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
    static isTileType(obj) {
        return typeof obj === 'object' && obj !== null
            && 'up' in obj && typeof obj.up === 'string'
            && 'down' in obj && typeof obj.down === 'string'
            && 'left' in obj && typeof obj.left === 'string'
            && 'right' in obj && typeof obj.right === 'string'
            && 'front' in obj && typeof obj.front === 'string'
            && 'back' in obj && typeof obj.back === 'string'
            && 'name' in obj && typeof obj.name === 'string'
            && 'color' in obj && Color.isColor(obj.color);
    }
}
export class Tile {
    constructor() {
        this.tileType = new TileType();
        this.location = new Point();
    }
    static isTile(obj) {
        return typeof obj === 'object' && obj !== null
            && 'location' in obj && Point.isPoint(obj.location)
            && 'tileType' in obj && TileType.isTileType(obj.tileType);
    }
}
export class PlaneTiling // stores a section of a tiling in space
 {
    constructor() {
        this.tiles = [];
        this.name = "";
    }
    static isPlaneTiling(obj) {
        return typeof obj === 'object' && obj !== null
            && 'name' in obj && typeof obj.name === 'string'
            && 'tiles' in obj && Array.isArray(obj.tiles) && obj.tiles.every(Tile.isTile);
    }
}
export class WangFile // stores the whole context, to be in a json file
 {
    constructor() {
        this.tileTypes = [];
        this.savedSubPlaneTilings = [];
        this.planeTilings = [];
    }
    static isWangFile(obj) {
        return typeof obj === 'object' && obj !== null
            && 'tileTypes' in obj && Array.isArray(obj.tileTypes) && obj.tileTypes.every(TileType.isTileType)
            && 'savedSubPlaneTilings' in obj && Array.isArray(obj.savedSubPlaneTilings) && obj.savedSubPlaneTilings.every(PlaneTiling.isPlaneTiling)
            && 'planeTilings' in obj && Array.isArray(obj.planeTilings) && obj.planeTilings.every(PlaneTiling.isPlaneTiling);
    }
}
