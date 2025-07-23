import { Vector, Color } from './util.js';
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
        this.r = new Vector();
    }
    static isTile(obj) {
        return typeof obj === 'object' && obj !== null
            && 'r' in obj && Vector.isVector(obj.r)
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
    overWrite(wf) {
        this.tileTypes = wf.tileTypes;
        this.savedSubPlaneTilings = wf.savedSubPlaneTilings;
        this.planeTilings = wf.planeTilings;
    }
}
export function getStarterWangFile() {
    let w = new WangFile();
    let placeholder = new TileType();
    placeholder.color = new Color(200, 200, 200);
    placeholder.name = "placeholder";
    w.tileTypes.push(placeholder);
    return w;
}
