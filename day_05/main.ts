import { readLines } from '../utils/input';
import { log, enable, xlog } from '../utils/log';
import { printSolutions, solution, xsolution } from '../utils/solution';
import { InputParser } from './InputParser';

// enable()

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

function checkRule(pages: number[], rule: number[]) {
  return pages.indexOf(rule[0]) < pages.indexOf(rule[1]);
}

function sort(pages: number[], orderingRules: number[][]) {
  const relevantOrderingRules = orderingRules.filter(orderingRules => orderingRules.every(rule => pages.includes(rule)));
  const sortedPages = [...pages];

  let hasSwapped = true;
  while (hasSwapped === true) {
    hasSwapped = false;

    for (let rule of relevantOrderingRules) {
      if (!checkRule(sortedPages, rule)) {
        const [a, b] = rule;
        const aIndex = sortedPages.indexOf(a);
        const bIndex = sortedPages.indexOf(b);

        sortedPages[aIndex] = b;
        sortedPages[bIndex] = a;

        hasSwapped = true;
      }
    }
  }

  xlog(pages, sortedPages)

  return sortedPages;

}

solution('part 1', (input) => {
  const inputParser = InputParser.fromLines(input);

  const alreadyOrderedUpdates = inputParser.pagesToUpdate.filter(pages => isOrdered(pages, inputParser.orderingRules))

  return sumMiddlePages(alreadyOrderedUpdates);
}, { example: exampleInput , data: dataInput })

solution('part 2 with custom bubble sort', (input) => {
  const inputParser = InputParser.fromLines(input);

  const unsortedPages = inputParser.pagesToUpdate.filter(pages => !isOrdered(pages, inputParser.orderingRules))
  const sortedUpdates = unsortedPages.map(pages => sort(pages, inputParser.orderingRules))

  return sumMiddlePages(sortedUpdates);
}, { example: exampleInput, data: dataInput })

solution('part 2 with native sort method', (input) => {
  const inputParser = InputParser.fromLines(input);

  const unsortedPages = inputParser.pagesToUpdate.filter(pages => !isOrdered(pages, inputParser.orderingRules))
  const sortedUpdates = unsortedPages.map(pages => pages.sort((a, b) => {
    const rule = inputParser.orderingRules.find(rule => rule.includes(a) && rule.includes(b))
    if (rule === undefined) return 0;
    return rule[0] === a ? -1 : 1;
  }))

  return sumMiddlePages(sortedUpdates);
}, { example: exampleInput, data: dataInput })

printSolutions()