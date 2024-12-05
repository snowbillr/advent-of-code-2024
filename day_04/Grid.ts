export class Grid {
  constructor(private grid: string[][]) {}

  get rowSize(): number {
    return this.grid.length;
  }

  get colSize(): number {
    return this.grid[0].length;
  }
  
  get diagonalSize(): number {
    return this.grid.length * 2 - 1;
  }

  row(index): string[] {
    return this.grid[index];
  }

  col(index): string[] {
    return this.grid.map(row => row[index]);
  }

  /*
    a | b | c
    d | e | f
    g | h | i

    diagonalUR(0) => [a]
    diagonalUR(1) => [d, b]
    diagonalUR(2) => [g, e, c]
    diagonalUR(3) => [h, f]
    diagonalUR(4) => [i]
  */
  diagonalUR(index): string[] {
    const result: string[] = [];

    for (let i = 0; i < this.grid.length; i++) {
      const row = index - i;
      const col = i;

      if (row < 0 || row >= this.grid.length) {
        continue;
      }

      result.push(this.grid[row][col]);
    }

    return result;
  }

  /*
    a | b | c
    d | e | f
    g | h | i

    diagonalDL(0) => [g]
    diagonalDL(1) => [d, h]
    diagonalDL(2) => [a, e, i]
    diagonalDL(3) => [b, f]
    diagonalDL(4) => [c]
  */
  diagonalDL(index): string[] {
    const result: string[] = [];

    for (let i = 0; i < this.grid.length; i++) {
      const row = index - i;
      const col = this.grid.length - 1 - i;

      if (row < 0 || row >= this.grid.length) {
        continue;
      }

      result.push(this.grid[row][col]);
    }

    return result;
  }
}