import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';

enable();

// const input = readLines('day_03/example.txt');
const input = readLines('day_03/data.txt');

const corruptedMemory = input.join('');

const MUL_REGEX = /mul\((?<n1>\d{1,3}),(?<n2>\d{1,3})\)/g;

function part1() {
  let match: RegExpExecArray | null = null;
  let sum = 0;

  while (match = MUL_REGEX.exec(corruptedMemory)) {
    if (match.groups == null) break;

    sum += Number(match.groups.n1) * Number(match.groups.n2);
  }

  return sum;
}

console.log(part1());
