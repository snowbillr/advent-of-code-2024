export class Tile {
  constructor(public readonly type: TileType, private visited: boolean = false) {}

  markVisited() {
    this.visited = true;
  }

  hasBeenVisited() {
    return this.visited;
  }
}