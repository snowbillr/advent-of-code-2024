import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';

// enable();

// const input = readLines('day_03/example.txt');
// const input = readLines('day_03/example_part_2.txt');
const input = readLines('day_03/data.txt');

const corruptedMemory = input.join('');

interface Token {
  op: 'mul' | 'do' | 'don\'t';
  args: number[];
}

const INSTRUCTION_REGEX = /(?<op>do|don't|mul)\((?<n1>\d{1,3})?,?(?<n2>\d{1,3})?\)/g;

function part1() {
  const tokens = parseCorruptedMemory(corruptedMemory, { ops: ['mul'] });
  return executeTokens(tokens);
}


function part2() {
  const tokens = parseCorruptedMemory(corruptedMemory);
  return executeTokens(tokens);
}

function parseCorruptedMemory(corruptedMemory: string, { ops = ['mul', 'do', 'don\'t'] } = {}): Token[] {
  const tokens: Token[] = [];

  let match: RegExpExecArray | null = null;
  while (match = INSTRUCTION_REGEX.exec(corruptedMemory)) {
    if (match.groups == null) break;

    if (ops.includes(match.groups.op)) {
      const token = {
        op: match.groups.op as Token['op'],
        args: [match.groups.n1, match.groups.n2].map(Number).filter(n => !Number.isNaN(n))
      }

      if (token.op === 'mul' && token.args.length !== 2) continue;

      tokens.push(token);
    }
  }

  log(tokens)

  return tokens;
}

function executeTokens(tokens: Token[]) {
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
