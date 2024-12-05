import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';
import { printSolutions, solution } from '../utils/solution';
import { Grid } from './Grid';

enable()

const exampleInput = readLines('day_04/example.txt');
const dataInput = readLines('day_04/data.txt');

function countWordEitherDirection(string: string, word: RegExp) {
  return (string.match(word)?.length ?? 0)
    + (string.split('').reverse().join('').match(word)?.length ?? 0);
}

function countOccurrences(grid: Grid, word: string): number {
  const wordRegex = new RegExp(word, 'g')
  let count = 0;

  for (let i = 0; i < grid.rowSize; i++) {
    count += countWordEitherDirection(grid.row(i).join(''), wordRegex);
  }

  for (let i = 0; i < grid.colSize; i++) {
    count += countWordEitherDirection(grid.col(i).join(''), wordRegex);
  }

  for (let i = 0; i < grid.diagonalSize; i++) {
    count += countWordEitherDirection(grid.diagonalUR(i).join(''), wordRegex);
    count += countWordEitherDirection(grid.diagonalDL(i).join(''), wordRegex);
  }

  return count;
}

function countXMASOccurrences(grid: Grid): number {
  const masRegex = /MAS/g;
  let count = 0;

  // find the indices of all the A characters
  // for each index
  // check if the cells [-1, -1] and [1, 1] from the index are M and S in either order
  // check if the cells [-1, 1] and [1, -1] from the index are M and S in either order
  // if both checks are true, increment the count

  grid.eachCell((cell, row, col) => {
    if (cell !== 'A') return;

    const neighbors = grid.neighbors(row, col);
    if (countWordEitherDirection(neighbors.diagonalDL(2).join(''), masRegex) && countWordEitherDirection(neighbors.diagonalUR(2).join(''), masRegex)) {
      count++;
    }
  });

  return count;
}

solution('part 1 example', () => {
  const grid = new Grid(exampleInput.map(line => line.split('')));
  return countOccurrences(grid, 'XMAS');
})

solution('part 1', () => {
  const grid = new Grid(dataInput.map(line => line.split('')));
  return countOccurrences(grid, 'XMAS');
})

solution('part 2 example', () => {
  const grid = new Grid(exampleInput.map(line => line.split('')));
  return countXMASOccurrences(grid);
})

solution('part 2', () => {
  const grid = new Grid(dataInput.map(line => line.split('')));
  return countXMASOccurrences(grid);
})

printSolutions()