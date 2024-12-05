import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';
import { printSolutions, solution } from '../utils/solution';
import { Grid } from './Grid';

enable()

const exampleInput = readLines('day_04/example.txt');
const dataInput = readLines('day_04/data.txt');

function countOccurrences(grid: Grid, word: string): number {
  const wordRegex = new RegExp(word, 'g')
  let count = 0;

  for (let i = 0; i < grid.rowSize; i++) {
    const row = grid.row(i);
    
    count += row.join('').match(wordRegex)?.length ?? 0;
    count += row.reverse().join('').match(wordRegex)?.length ?? 0;
  }

  for (let i = 0; i < grid.colSize; i++) {
    const col = grid.col(i);

    count += col.join('').match(wordRegex)?.length ?? 0;
    count += col.reverse().join('').match(wordRegex)?.length ?? 0;
  }

  for (let i = 0; i < grid.diagonalSize; i++) {
    const diagonalUR = grid.diagonalUR(i);

    count += diagonalUR.join('').match(wordRegex)?.length ?? 0;
    count += diagonalUR.reverse().join('').match(wordRegex)?.length ?? 0;

    const diagonalDL = grid.diagonalDL(i);
    count += diagonalDL.join('').match(wordRegex)?.length ?? 0;
    count += diagonalDL.reverse().join('').match(wordRegex)?.length ?? 0;
  }

  return count;
}

solution('example', () => {
  const grid = new Grid(exampleInput.map(line => line.split('')));
  return countOccurrences(grid, 'XMAS');
})

solution('part 1', () => {
  const grid = new Grid(dataInput.map(line => line.split('')));
  return countOccurrences(grid, 'XMAS');
})

printSolutions()