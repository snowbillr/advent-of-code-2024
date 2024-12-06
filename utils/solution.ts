import colors from 'colors/safe';

const solutions: Record<string, any> = {};
const xsolutions: string[] = [];

export function solution(name: string, value: any)
export function solution(name: string, fn: () => any)
export function solution(name: string, fn: (...args: any[]) => any, args: Record<string, any>)
export function solution(name: string, valueOrFn: any | (() => any) | ((...args: any[]) => any), args?: Record<string, any>) {
  if (args !== undefined) {
    Object.entries(args).forEach(([key, value]) => {
      solutions[`${colors.yellow(name)} - ${colors.cyan(key)}`] = valueOrFn(value);
    })

    return;
  }

  if (typeof valueOrFn === 'function') {
    solutions[name] = valueOrFn();
  } else {
    solutions[name] = valueOrFn;
  }
}

export function xsolution(name: string, ...args: any[]) {
  xsolutions.push(name);
}

export function printSolutions() {
  Object.entries(solutions).forEach(([name, value]) => {
    console.log(`${name}: ${value}`);
  });

  xsolutions.forEach(name => {
    console.log(`${colors.strikethrough(colors.dim(name))}: Skipped.`);
  });
}