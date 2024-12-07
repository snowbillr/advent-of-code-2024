export class GuardEntity {
  static fromLines(lines: string[][]): GuardEntity {
    for (let row = 0; row < lines.length; row++) {
      for (let col = 0; col < lines[row].length; col++) {
        if (lines[row][col] === '^') {
          return new GuardEntity({ row, col }, 'N');
        }
      }
    }

    throw new Error('Guard not found in map');
  }

  constructor(public location: Coordinates, public direction: Direction) {}

  getNextLocation(): Coordinates {
    switch (this.direction) {
      case 'N': return { row: this.location.row - 1, col: this.location.col };
      case 'E': return { row: this.location.row, col: this.location.col + 1 };
      case 'S': return { row: this.location.row + 1, col: this.location.col };
      case 'W': return { row: this.location.row, col: this.location.col - 1 };
    }
  }

  move() {
    this.location = this.getNextLocation();
  }

  turnRight() {
    switch (this.direction) {
      case 'N': this.direction = 'E'; break;
      case 'E': this.direction = 'S'; break;
      case 'S': this.direction = 'W'; break;
      case 'W': this.direction = 'N'; break;
    }
  }
}