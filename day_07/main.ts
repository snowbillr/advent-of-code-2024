import { readLines } from '../utils/input';
import { log, enable, xlog } from '../utils/log';
import { printSolutions, solution, xsolution } from '../utils/solution';

enable();

const exampleInput = readLines('day_07/example.txt');
const dataInput = readLines('day_07/data.txt');

interface Equation {
  value: number;
  operators: number[];
}

const OPERATORS = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b
}

// 2^slots = operators ^ slots
// 1 slot: [[*], [+]]
// 2 slots: [[*, *], [*, +], [+, *], [+, +]]
// 3 slots: [[*, *, *], [*, *, +], [*, +, *], [*, +, +], [+, *, *], [+, *, +], [+, +, *], [+, +, +]]
function possibleCombinations(slots) {
  const combinations: (keyof typeof OPERATORS)[][] = [];
  const operators = Object.keys(OPERATORS) as (keyof typeof OPERATORS)[];

  for (let i = 0; i < operators.length ** slots; i++) {
    const combination: ('*' | '+')[] = [];
    let n = i;

    for (let j = 0; j < slots; j++) {
      combination.push(operators[n % operators.length]);
      n = Math.floor(n / operators.length);
    }

    combinations.push(combination);
  }

  return combinations;
}

solution('part 1', (input) => {
  const equations = input.map((line) => {
    const [value, operands] = line.split(':');

    return {
      value: Number(value),
      operands: operands.trim().split(' ').map(Number)
    }
  })

  const possibleEquations = equations.filter((equation) => {
    log(equation);
    const requiredOperators = equation.operands.length - 1;
    const operatorCombinations = possibleCombinations(requiredOperators);
    xlog(operatorCombinations);

    const isPossible = operatorCombinations.some((combination) => {
      const result = equation.operands.reduce((acc, operand, index) => {
        if (index === 0) {
          return operand;
        }

        const operator = OPERATORS[combination[index - 1]];
        return operator(acc, operand);
      }, 0);

      xlog(combination, result);

      return result === equation.value;
    });

    log(isPossible);
    return isPossible;
  });

  return possibleEquations.map((equation) => equation.value).reduce((acc, value) => acc + value, 0);
}, { exampleInput, dataInput });

printSolutions();