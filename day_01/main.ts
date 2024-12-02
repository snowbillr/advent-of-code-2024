import fs from 'node:fs';

const input = fs.readFileSync('./day_01/data.txt');
const lines = input.toString().split('\n');

const left: number[] = [];
const right: number[] = [];
lines.forEach((line) => {
  const [n1, n2] = line.replace(/\s+/, ' ').split(' ');
  left.push(parseInt(n1));
  right.push(parseInt(n2));
})

// part1()
part2()


function part1() {
  left.sort();
  right.sort();

  const diffs = left.map((n, i) => Math.abs(right[i] - n));

  console.log(diffs.reduce((acc, diff) => acc + diff, 0));
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

  console.log(scores.reduce((acc, score) => acc + score, 0));
}