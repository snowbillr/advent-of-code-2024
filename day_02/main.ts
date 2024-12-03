import { readLines } from '../utils/input';
import { log, enable } from '../utils/log';

// enable()

// const lines = readLines('./day_02/example.txt');
const lines = readLines('./day_02/data.txt');
const reportsInput = lines.map(l => l.split(' ').map(Number));

function part1(reports) {
  const reportSafetyResults = reports.map(isReportSafe);
  return reportSafetyResults.filter(Boolean).length
}

function part2(reports) {
  const reportSafetyResults = reports.map(report => {
    log('analyzing report', report)
    if (isReportSafe(report)) {
      log('report is safe')
      return true;
    } else {
      log('analyzing with problem dampener')
      let dampenedReportResults = false;
      for (let i = 0; i < report.length; i++) {
        const dampenedReport = report.slice(0, i).concat(report.slice(i + 1));
        log('analyzing dampened report', dampenedReport, isReportSafe(dampenedReport))
        dampenedReportResults = dampenedReportResults || isReportSafe(dampenedReport);
      }
      return dampenedReportResults;
    }
  });

  log(reports, reportSafetyResults)

  return reportSafetyResults.filter(Boolean).length
}

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

function getLevelDiffs(report: number[]): number[] {
  return report.reduce<number[]>((acc, curr, index) => {
    if (index === report.length - 1) return acc;

    const diff = curr - report[index + 1];
    acc.push(diff);

    return acc;
  }, [])
}

console.log(part1(reportsInput))
console.log(part2(reportsInput))