const solutions = {};

export function solution(name, value) {
  if (typeof value === 'function') {
    solutions[name] = value();
  } else {
    solutions[name] = value;
  }
}

export function printSolutions() {
  Object.entries(solutions).forEach(([name, value]) => {
    console.log(`${name}: ${value}`);
  });
}