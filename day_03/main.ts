import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';
import { printSolutions, solution } from '../utils/solution';

// enable();

// const input = readLines('day_03/example.txt');
// const input = readLines('day_03/example_part_2.txt');
const input = readLines('day_03/data.txt');

const corruptedMemory = input.join('');

type Op = 'mul' | 'do' | 'don\'t'
interface Token {
  op: Op;
  args: number[];
}

class CorruptedMemoryVM {
  private corruptedMemory: string;
  private ops: Op[];

  constructor(corruptedMemory: string, ops: Op[] = ['mul', 'do', 'don\'t']) {
    this.corruptedMemory = corruptedMemory;
    this.ops = ops;
  }

  run(): number {
    const tokens = this.parseCorruptedMemory();
    return this.executeTokens(tokens);
  }

  private parseCorruptedMemory(): Token[] {
    const INSTRUCTION_REGEX = /(?<op>do|don't|mul)\((?<n1>\d{1,3})?,?(?<n2>\d{1,3})?\)/g;

    const tokens: Token[] = [];

    let match: RegExpExecArray | null = null;
    while (match = INSTRUCTION_REGEX.exec(this.corruptedMemory)) {
      if (match.groups == null) break;

      if (this.ops.includes(match.groups.op as Op)) {
        const token = {
          op: match.groups.op as Op,
          args: [match.groups.n1, match.groups.n2].map(Number).filter(n => !Number.isNaN(n))
        }

        if (token.op === 'mul' && token.args.length !== 2) continue;

        tokens.push(token);
      }
    }

    log(tokens);

    return tokens;
  }

  private executeTokens(tokens: Token[]): number {
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
    }, 0);
  }
}

solution('part 1', new CorruptedMemoryVM(corruptedMemory, ['mul']).run());
solution('part 2', new CorruptedMemoryVM(corruptedMemory).run());

printSolutions();

