import { readLines } from '../utils/input';

// const lines = readLines('./day_02/example.txt');
const lines = readLines('./day_02/data.txt');
const reports = lines.map(l => l.split(' ').map(Number));

function part1() {
  function isReportSafe(report: number[]) {
    const diffs = getLevelDiffs(report);

    if (diffs.some(d => d === 0)) { // if there is a 0, it's not safe
      return false
    } else if (diffs.some(d => Math.sign(diffs[0]) !== Math.sign(d))) { // if there is a sign change, it's not safe
      return false
    } else if (diffs.some(d => Math.abs(d) > 3)) { // if there is a diff greater than 3, it's not safe
      return false
    } else {
      return true
    }
  }

  const reportSafetyResults = reports.map(isReportSafe);
  return reportSafetyResults.filter(Boolean).length
}

function part2() {
  function isReportSafe(report: number[]) {
    const diffs = getLevelDiffs(report);
  }
}

function getLevelDiffs(report: number[]): number[] {
  return report.reduce<number[]>((acc, curr, index) => {
    if (index === report.length - 1) return acc;

    const diff = curr - report[index + 1];
    acc.push(diff);

    return acc;
  }, [])
}

console.log(part1())
console.log(part2())