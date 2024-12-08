import { readLines, multiFile } from '../utils/input';
import { log, enable, xlog } from '../utils/log';
import { printSolutions, solution, xsolution } from '../utils/solution';

// enable();

const input = multiFile(readLines, {
  example: 'day_07/example.txt',
  data: 'day_07/data.txt',
})

interface Equation {
  value: number;
  operands: number[];
}

const OPERATORS = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => Number(`${a}${b}`),
}

function equationsFromInput(input: string[]): Equation[] {
  return input.map((line) => {
    const [value, operands] = line.split(':');

    return {
      value: Number(value),
      operands: operands.trim().split(' ').map(Number)
    }
  });
}

// 2^slots = operators ^ slots
// 1 slot: [[*], [+]]
// 2 slots: [[*, *], [*, +], [+, *], [+, +]]
// 3 slots: [[*, *, *], [*, *, +], [*, +, *], [*, +, +], [+, *, *], [+, *, +], [+, +, *], [+, +, +]]
function possibleCombinations(slots, operators) {
  const combinations: (keyof typeof OPERATORS)[][] = [];

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

function isEquationPossible(equation, operators) {
  log(equation);
    const requiredOperators = equation.operands.length - 1;
    const operatorCombinations = possibleCombinations(requiredOperators, operators);
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
}

solution('part 1', (input) => {
  const equations = equationsFromInput(input);

  const possibleEquations = equations.filter((equation) => isEquationPossible(equation, ['+', '*']));

  return possibleEquations.map((equation) => equation.value).reduce((acc, value) => acc + value, 0);
}, input);

solution('part 2', (input) => {
  const equations = equationsFromInput(input);

  const possibleEquations = equations.filter((equation) => isEquationPossible(equation, ['+', '*', '||']));

  return possibleEquations.map((equation) => equation.value).reduce((acc, value) => acc + value, 0);
}, input);

printSolutions();