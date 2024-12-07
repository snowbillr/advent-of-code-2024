interface Coordinates {
  row: number;
  col: number;
}

type Direction = 'N' | 'E' | 'S' | 'W';

type TileType = 'floor' | 'obstacle';