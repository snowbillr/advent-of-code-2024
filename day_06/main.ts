import { readLines } from '../utils/input';
import { log, enable, xlog } from '../utils/log';
import { printSolutions, solution, xsolution } from '../utils/solution';
import { GuardEntity } from './GuardEntity';
import { Tile } from './Tile';
import { Tilemap } from './Tilemap';

enable();

const exampleInput = readLines('day_06/example.txt');
const dataInput = readLines('day_06/data.txt');

interface LocationHistory {
  location: Coordinates;
  direction: Direction;
}

function mapGuardRoute(tilemap: Tilemap, guard: GuardEntity, onStart: () => void, onObstacle: () => void, onFloor: (tile: Tile) => void) {
  tilemap.getTile(guard.location).markVisited();
  onStart()

  while(true) {
    if (!tilemap.isInBounds(guard.getNextLocation())) {
      break;
    }
    const tile = tilemap.getTile(guard.getNextLocation());

    if (tile.type === 'obstacle') {
      onObstacle();
    } else {
      onFloor(tile);
    }
  }
}

solution('part 1', (input) => {
  const tilemap = Tilemap.fromLines(input);
  const guard = GuardEntity.fromLines(input);

  mapGuardRoute(
    tilemap,
    guard,
    () => {},                // onStart
    () => guard.turnRight(), // onObstacle
    (tile) => {              // onFloor
      guard.move();
      tile.markVisited();
    }
  );

  const visitedTilesCount = tilemap.tiles.flat().filter((tile) => tile.hasBeenVisited()).length;

  return visitedTilesCount;
}, { example: exampleInput, data: dataInput })

solution('part 2', (input) => {
  const tilemap = Tilemap.fromLines(input);
  const guard = GuardEntity.fromLines(input);

  const locationHistory: LocationHistory[] = [];

  mapGuardRoute(
    tilemap,
    guard,
    () => locationHistory.push({ location: guard.location, direction: guard.direction }),  // onStart
    () => guard.turnRight(),                                                               // onObstacle
    (tile) => {                                                                            // onFloor
      guard.move();
      tile.markVisited();
      locationHistory.push({ location: guard.location, direction: guard.direction });
    }
  )

  let possibleLoopCreators: Coordinates[] = [];
  locationHistory.forEach(({ location, direction }, index) => { // exclude first spot and last spot?
    const testGuard = new GuardEntity(location, direction)
    const testTilemap = Tilemap.fromTilemap(tilemap);
    const testLocationHistory: LocationHistory[] = locationHistory.slice(0, index);

    const possibleLoopCreationLocation = guard.getNextLocation();
    guard.turnRight();

    mapGuardRoute(
      testTilemap,
      testGuard,
      () => {},                    // onStart
      () => testGuard.turnRight(), // onObstacle
      (tile) => {                  // onFloor
        testGuard.move();
        tile.markVisited();

        if (testLocationHistory.some(lh => lh.location.row === testGuard.location.row && lh.location.col === testGuard.location.col && lh.direction === testGuard.direction)) {
          possibleLoopCreators.push(possibleLoopCreationLocation);
        }
      }
    );


    // const testLocation = guard.getNextLocation();
    // if (locationHistory.slice(0, index).some(lh => lh.location.row === testLocation.row && lh.location.col === testLocation.col && lh.direction === guard.direction)) {
    //   possibleLoopCreators.push(possibleLoopCreationLocation);
    // }
  });

  possibleLoopCreators = possibleLoopCreators
    // .map(({ row, col }) => `${row},${col}`)
    // .filter((location, index, arr) => arr.indexOf(location) === index)
    // .map(locationString => ({ row: Number(locationString.split(',')[0]), col: Number(locationString.split(',')[1]) }));

  log(possibleLoopCreators)

  // filter out starting spot?
  // filter out existing obstacles?

  log('  0 1 2 3 4 5 6 7 8 9')
  tilemap.tiles.forEach((row, rowIndex) => {
    const rowString = row.map<any>(tile => {
      if (tile.type === 'obstacle') {
        return '#';
      } else if (tile.hasBeenVisited()) {
        return 'X';
      } else {
        return '.';
      }
    })
    rowString.unshift(rowIndex)
    log(rowString.join(' '))
  })
  return possibleLoopCreators.length;
}, { example: exampleInput/*, data: dataInput */})

printSolutions();

/*
row 6, col 3
row 7, col 6
row 7, col 7
row 8, col 1
row 8, col 3
row 9, col 7
*/