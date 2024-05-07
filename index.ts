type Vector = [number, number];
type CellValue = number | undefined;

class WayFinder {
  private field: number[][];

  public constructor(field: number[][]) {
    this.field = field.map((row) => [...row]);
  }

  public static hasWayOutFrom(field: number[][], position: Vector): boolean {
    const wayFinder = new WayFinder(field);

    return wayFinder.hasWayOut([position]);
  }

  private isEmpty(position: Vector): boolean {
    const [rowIndex, columnIndex] = position;
    const value = this.field[rowIndex]?.[columnIndex];

    return value === 0;
  }

  private isWayOut(position: Vector): boolean {
    const [rowIndex, columnIndex] = position;
    const value = this.field[rowIndex]?.[columnIndex];

    return value === undefined;
  }

  public setValue(position: Vector, value: number = -1): void {
    const [rowIndex, columnIndex] = position;

    if (this.field[rowIndex] === undefined) return;
    if (this.field[rowIndex][columnIndex] === undefined) return;

    this.field[rowIndex][columnIndex] = value;
  }

  public hasWayOut(currentPositions: Vector[] = []): boolean {
    if (currentPositions.length === 0) return false;

    const positions: Vector[] = [];

    for (const position of currentPositions) {
      const [left, top, right, bottom] = this.getNeighbours(position);

      if (this.isWayOut(bottom)) return true;

      const isEmptyLeft = this.isEmpty(left);
      const isEmptyTop = this.isEmpty(top);
      const isEmptyRight = this.isEmpty(right);
      const isEmptyBottom = this.isEmpty(bottom);

      const hasEmptyNeighbour =
        isEmptyLeft || isEmptyTop || isEmptyRight || isEmptyBottom;

      if (!hasEmptyNeighbour) continue;

      if (isEmptyLeft) {
        this.setValue(left, -1);
        positions.push(left);
      }

      if (isEmptyTop) {
        this.setValue(top, -1);
        positions.push(top);
      }

      if (isEmptyRight) {
        this.setValue(right, -1);
        positions.push(right);
      }

      if (isEmptyBottom) {
        this.setValue(bottom, -1);
        positions.push(bottom);
      }
    }

    return this.hasWayOut(positions);
  }

  // лево, верх, право, низ
  private getNeighbours(position: Vector): [Vector, Vector, Vector, Vector] {
    const [rowIndex, columnIndex] = position;

    return [
      [rowIndex, columnIndex - 1],
      [rowIndex - 1, columnIndex],
      [rowIndex, columnIndex + 1],
      [rowIndex + 1, columnIndex],
    ];
  }
}

function normalizeField(field: unknown[][]): number[][] {
  return field
    .map((row) =>
      row.map((cell) => {
        if (cell == null) return 0;

        if (typeof cell === 'number' && cell > 0) return cell;

        return -1;
      })
    )
    .reverse();
}

function convertCell(
  field: number[][],
  rowIndex: number,
  columnIndex: number
): '□' | '■' | '*' | number {
  const cell = field[rowIndex][columnIndex];

  if (cell === 0) return '□';
  if (cell === -1) return '■';

  const hasWayOut = WayFinder.hasWayOutFrom(field, [rowIndex, columnIndex]);

  if (hasWayOut) return cell;

  return '*';
}

function printField(field: unknown[][]): void {
  const normalized = normalizeField(field);

  let results: string = '';

  for (let i = 0; i < normalized.length; i++) {
    for (let j = 0; j < normalized[i].length; j++) {
      results += String(convertCell(normalized, i, j));
    }
    if (i !== normalized.length - 1) results += '\n';
  }

  console.log(results);
}

// нужно реализовать функцию printField (field: [][]): void
// null || undefined => дыра/пустая клетка (пустой квадратик)
// число большее 0 И имеет проход через нижнюю строку => активная клетка, препятствие (само число)
// число большее 0 НО НЕ имеет проход через нижнюю строку => неактивная клетка, препятствие (*)
// все остальное => препятствие (закрашенный квадратик)

printField([
  [-1, null, null, null, null, null, null, null, -1],
  [-1, null, -1, 2, 3, 4, 4, 5, -1],
  [-1, null, -1, 6, 3, -1, 1, 3, -1],
  [-1, null, -1, 5, 5, -1, 6, 5, -1],
  [-1, null, -1, 3, 1, -1, 2, 2, -1],
  [-1, null, -1, 4, 2, -1, 4, 2, -1],
  [-1, null, 6, 5, 6, -1, 1, 3, -1],
  [-1, 3, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
]);

// ■■■■■■■■■
// ■■■■■■■■■
// ■3■■■■■■■
// ■□6**■**■
// ■□■**■**■
// ■□■**■**■
// ■□■**■**■
// ■□■**■**■
// ■□■23445■
// ■□□□□□□□■

// -----------------------------------------------------------------------------------
// printField([
//   [-1, null, null, null, null, null, null, null, -1],
//   [-1, null, -1, null, 3, 4, 4, 5, -1],
//   [-1, null, -1, 6, 3, -1, 1, 3, -1],
//   [-1, null, -1, 5, 5, -1, 6, 5, -1],
//   [-1, null, -1, 3, 1, -1, 2, 2, -1],
//   [-1, null, -1, 4, 2, -1, 4, 2, -1],
//   [-1, null, 6, 5, 6, -1, 1, 3, -1],
//   [-1, 3, -1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// ]);

// ■■■■■■■■■
// ■■■■■■■■■
// ■3■■■■■■■
// ■□6**■**■
// ■□■**■**■
// ■□■**■**■
// ■□■**■**■
// ■□■6*■**■
// ■□■□3445■
// ■□□□□□□□■

// -----------------------------------------------------------------------------------

// printField([
//   [-1, null, null, null, null, null, null, null, -1],
//   [-1, null, -1, null, 3, 4, 4, 5, -1],
//   [-1, null, -1, 6, 3, -1, 1, 3, -1],
//   [-1, null, null, 5, 5, -1, 6, 5, -1],
//   [-1, null, -1, 3, 1, -1, 2, 2, -1],
//   [-1, null, -1, 4, 2, -1, 4, 2, -1],
//   [-1, null, 6, 5, 6, -1, 1, 3, -1],
//   [-1, 3, -1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
// ]);

// ■■■■■■■■■
// ■■■■■■■■■
// ■3■■■■■■■
// ■□6**■**■
// ■□■**■**■
// ■□■**■**■
// ■□□5*■**■
// ■□■6*■**■
// ■□■□3445■
// ■□□□□□□□■

// -----------------------------------------------------------------------------------

// printField([
//   [null, -1, null],
//   [1, 2, null],
//   [3, -1, 5],
// ]);

// *■5
// 12□
// □■□

// -----------------------------------------------------------------------------------

// printField([
//   [null, -1, null],
//   [1, 2, 'wtf'],
//   [3, -1, 5],
// ]);

// *■*
// 1*■
// □■□

// -----------------------------------------------------------------------------------
