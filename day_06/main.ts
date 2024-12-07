import { readLines } from '../utils/input';
import { log, enable, xlog } from '../utils/log';
import { printSolutions, solution, xsolution } from '../utils/solution';
import { GuardEntity } from './GuardEntity';
import { Tilemap } from './Tilemap';

enable();

const exampleInput = readLines('day_06/example.txt');
const dataInput = readLines('day_06/data.txt');

solution('part 1', (input) => {
  const tilemap = Tilemap.fromLines(input);
  const guard = GuardEntity.fromLines(input);

  tilemap.getTile(guard.location).markVisited();

  // while(tilemap.isInBounds(guard.location)) {
  while(true) {
    if (!tilemap.isInBounds(guard.getNextLocation())) {
      break;
    }
    const tile = tilemap.getTile(guard.getNextLocation());

    if (tile.type === 'obstacle') {
      guard.turnRight();
    } else {
      guard.move();
      tile.markVisited();
    }
  }

  const visitedTilesCount = tilemap.tiles.flat().filter((tile) => tile.hasBeenVisited()).length;

  return visitedTilesCount;
}, { example: exampleInput, data: dataInput })

printSolutions();