import fs from 'node:fs';
import { sumList } from '../utils/lists';
import { readLines } from '../utils/input';

const lines = readLines('./day_01/data.txt');

const left: number[] = [];
const right: number[] = [];
lines.forEach((line) => {
  const [n1, n2] = line.replace(/\s+/, ' ').split(' ');
  left.push(parseInt(n1));
  right.push(parseInt(n2));
})

part1()
part2()


function part1() {
  left.sort();
  right.sort();

  const diffs = left.map((n, i) => Math.abs(right[i] - n));

  console.log(sumList(diffs));
}

function part2() {
  const rightListAppearances = {}
  right.forEach((n) => {
    if (rightListAppearances[n]) {
      rightListAppearances[n]++;
    } else {
      rightListAppearances[n] = 1;
    }
  })

  const scores = left.map((n) => {
    let appearances = 0;
    if (rightListAppearances[n]) {
      appearances = rightListAppearances[n];
    }

    return n * appearances;
  })

  console.log(sumList(scores));
}