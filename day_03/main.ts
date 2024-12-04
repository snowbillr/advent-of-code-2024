import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';

// enable();

// const input = readLines('day_03/example.txt');
// const input = readLines('day_03/example_part_2.txt');
const input = readLines('day_03/data.txt');

const corruptedMemory = input.join('');

const MUL_REGEX = /(mul)\((?<n1>\d{1,3}),(?<n2>\d{1,3})\)/g;
const INSTRUCTION_REGEX = /(?<op>do|don't|mul)\((?<n1>\d{1,3})?,?(?<n2>\d{1,3})?\)/g;

function part1() {
  let match: RegExpExecArray | null = null;
  let sum = 0;

  while (match = MUL_REGEX.exec(corruptedMemory)) {
    if (match.groups == null) break;

    sum += Number(match.groups.n1) * Number(match.groups.n2);
  }

  return sum;
}

interface Token {
  op: 'mul' | 'do' | 'don\'t';
  args: number[];
}

function part2() {
  const tokens: Token[] = [];

  let match: RegExpExecArray | null = null;
  while (match = INSTRUCTION_REGEX.exec(corruptedMemory)) {
    if (match.groups == null) break;

    tokens.push({
      op: match.groups.op as Token['op'],
      args: [match.groups.n1, match.groups.n2].map(Number)
    });
  }

  log(tokens)

  let shouldEvaluate = true;
  return tokens.reduce((sum, token) => {
    switch (token.op) {
      case 'mul':
        if (shouldEvaluate) {
          return sum + token.args[0] * token.args[1];
        }
        break;
      case 'do':
        shouldEvaluate = true;
        break;
      case 'don\'t':
        shouldEvaluate = false;
        break;
    }

    return sum;
  }, 0)
}

console.log(part1());
console.log(part2());
