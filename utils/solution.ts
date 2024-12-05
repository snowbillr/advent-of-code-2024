import colors from 'colors/safe';

const solutions: Record<string, any> = {};
const xsolutions: string[] = [];

export function solution(name: string, value: any) {
  if (typeof value === 'function') {
    solutions[name] = value();
  } else {
    solutions[name] = value;
  }
}

export function xsolution(name: string, value: any) {
  xsolutions.push(name);
}

export function printSolutions() {
  Object.entries(solutions).forEach(([name, value]) => {
    console.log(`${colors.cyan(name)}: ${value}`);
  });

  xsolutions.forEach(name => {
    console.log(`${colors.strikethrough(colors.dim(name))}: Skipped.`);
  });
}