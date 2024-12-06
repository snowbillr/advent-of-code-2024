export class InputParser {
  static fromLines(lines: string[]) {
    const orderingRules: number[][] = [];
    const pagesToUpdate: number[][] = [];

    lines.forEach(line => {
      if (line.includes('|')) {
         orderingRules.push(line.split('|').map(Number));
      } else if (line === '') {
        return;
      } else if (line.includes(',')) {
        pagesToUpdate.push(line.split(',').map(Number));
      }
    })

    return new InputParser(orderingRules, pagesToUpdate);
  }

  constructor(
    public readonly orderingRules: number[][],
    public readonly pagesToUpdate: number[][]
  ) {}
}