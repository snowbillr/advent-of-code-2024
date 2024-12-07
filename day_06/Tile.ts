export class Tile {
  private visited = false;

  constructor(public readonly type: TileType) {}

  markVisited() {
    this.visited = true;
  }

  hasBeenVisited() {
    return this.visited;
  }
}