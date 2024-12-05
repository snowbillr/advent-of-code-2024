import { log } from "console";
import { Grid } from "../Grid";
import { enable } from "../../utils/log";

enable()

/*
  4 x 4 alphabet grid:
  a b c d
  e f g h
  i j k l
  m n o p

  5 x 5 alphabet grid:
  a b c d e
  f g h i j
  k l m n o
  p q r s t
  u v w x y

*/

const grid = new Grid([
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i']
]);

log(grid.diagonalUR(0));
log(grid.diagonalUR(1));
log(grid.diagonalUR(2));
log(grid.diagonalUR(3));
log(grid.diagonalUR(4));
log('----')
log(grid.diagonalDL(0));
log(grid.diagonalDL(1));
log(grid.diagonalDL(2));
log(grid.diagonalDL(3));
log(grid.diagonalDL(4));

log(grid.neighbors(0, 0))
log(grid.neighbors(1, 1))

/*
    diagonal(0, 'UR') => [a]
    diagonal(1, 'UR') => [d, b]
    diagonal(2, 'UR') => [g, e, c]
    diagonal(3, 'UR') => [h, f]
    diagonal(4, 'UR') => [i]

    diagonal(0, 'DL') => [g]
    diagonal(1, 'DL') => [d, h]
    diagonal(2, 'DL') => [a, e, i]
    diagonal(3, 'DL') => [b, f]
    diagonal(4, 'DL') => [c]
*/