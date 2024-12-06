import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';
import { printSolutions, solution, xsolution } from '../utils/solution';
import { InputParser } from './InputParser';

enable()

const exampleInput = readLines('day_05/example.txt');
const dataInput = readLines('day_05/data.txt');

function isOrdered(pages: number[], orderingRules: number[][]) {
  const relevantOrderingRules = orderingRules.filter(orderingRules => orderingRules.every(rule => pages.includes(rule)));
  return relevantOrderingRules.reduce((isOrdered, rule) => {
    return isOrdered && pages.indexOf(rule[0]) < pages.indexOf(rule[1])
  }, true)
}

function sumMiddlePages(pages: number[][]) {
  return pages.reduce((sum, pages) => {
    return sum + pages[Math.floor(pages.length / 2)]
  }, 0);
}

solution('part 1 example', () => {
  const inputParser = InputParser.fromLines(exampleInput);

  const alreadyOrderedUpdates = inputParser.pagesToUpdate.filter(pages => isOrdered(pages, inputParser.orderingRules))

  return sumMiddlePages(alreadyOrderedUpdates);
})

solution('part 1', () => {
  const inputParser = InputParser.fromLines(dataInput);

  const alreadyOrderedUpdates = inputParser.pagesToUpdate.filter(pages => isOrdered(pages, inputParser.orderingRules))

  return sumMiddlePages(alreadyOrderedUpdates);
})

printSolutions()