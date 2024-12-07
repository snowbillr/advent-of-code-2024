import { Tile } from "./Tile";

export class Tilemap {
  static fromLines(lines: string[]): Tilemap {
    const tiles: Tile[][] = lines.map((line) => line.split('').map((char) => {
      let type: TileType;
      switch (char) {
        case '^':
        case '.':
          type = 'floor';
          break;
        case '#':
          type = 'obstacle';
          break;
        default:
          throw new Error(`Unexpected cell type in map: '${char}'`);
      }

      return new Tile(type);
    }));

    return new Tilemap(tiles);
  }

  constructor(public readonly tiles: Tile[][]) {}

  getTile({ row, col }: Coordinates): Tile {
    return this.tiles[row][col];
  }

  isInBounds({ row, col }: Coordinates): boolean {
    return row >= 0 && row < this.tiles.length && col >= 0 && col < this.tiles[row].length;
  }
}