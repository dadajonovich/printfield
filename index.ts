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

function normalizeField(field: unknown[][]): number[][] {
  return field.map((row) =>
    row.map((cell) => {
      if (cell == null) return 0;

      if (typeof cell === 'number' && cell > 0) return cell;

      return -1;
    })
  );
}

function isEmptyCell(cell: number | undefined): boolean {
  return cell === 0;
}

function convertCell(
  field: number[][],
  rowIndex: number,
  columnIndex: number
): '□' | '■' | '*' | number {
  const cell = field[rowIndex][columnIndex];

  if (cell === 0) return '□';
  if (cell === -1) return '■';

  const hasEmptyCell =
    isEmptyCell(field[rowIndex + 1]?.[columnIndex]) ||
    isEmptyCell(field[rowIndex - 1]?.[columnIndex]) ||
    isEmptyCell(field[rowIndex][columnIndex + 1]) ||
    isEmptyCell(field[rowIndex][columnIndex - 1]);

  if (!hasEmptyCell) return '*';

  return cell;
}

function printField(field: unknown[][]): void {
  const normalized = normalizeField(field);

  let results: string = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    for (let j = 0; j < normalized[i].length; j++) {
      results += String(convertCell(normalized, i, j));
    }
    if (i !== 0) results += '\n';
  }

  console.log(results);
}
