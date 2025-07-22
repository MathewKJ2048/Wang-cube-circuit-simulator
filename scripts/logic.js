export class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
export class Camera {
    constructor() {
        this.p = new Point();
        this.zoom = 1;
    }
}
export class Color {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
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
}
export class Tile {
    constructor() {
        this.tileType = new TileType();
        this.upTile = null;
        this.downTile = null;
        this.leftTile = null;
        this.rightTile = null;
    }
}
export class PlaneTiling // stores a section of a tiling in space
 {
    constructor() {
        this.tiles = [];
        this.name = "";
    }
}
export class WangFile // stores the whole context, to be in a json file
 {
    constructor() {
        this.tileTypeList = [];
        this.savedSubPlaneTilings = [];
        this.planeTilings = [];
    }
}
