import fs from 'node:fs';

export const readLines = (path: string) => {
  const input = fs.readFileSync(path);
  const lines = input.toString().split('\n').filter(l => l.length > 0);

  return lines;
}