import fs from 'node:fs';

type FileReader = (path: string) => any;

export const readLines = (path: string) => {
  const input = fs.readFileSync(path);
  const lines = input.toString().split('\n').filter(l => l.length > 0);

  return lines;
}

export const multiFile = (reader: FileReader, files: Record<string, string>) => {
  const input: Record<string, string[]> = {};

  for (const [key, path] of Object.entries(files)) {
    input[key] = reader(path);
  }

  return input;
}