// нужно реализовать функцию printField (field: [][]): void
// null || undefined => дыра/пустая клетка (пустой квадратик)
// число большее 0 И имеет проход через нижнюю строку => активная клетка, препятствие (само число)
// число большее 0 НО НЕ имеет проход через нижнюю строку => неактивная клетка, препятствие (*)
// все остальное => препятствие (закрашенный квадратик)

// printField([
//     [-1, null, null, null, null, null, null, null, -1],
//     [-1, null, -1, 2, 3, 4, 4, 5, -1],
//     [-1, null, -1, 6, 3, -1, 1, 3, -1],
//     [-1, null, -1, 5, 5, -1, 6, 5, -1],
//     [-1, null, -1, 3, 1, -1, 2, 2, -1],
//     [-1, null, -1, 4, 2, -1, 4, 2, -1],
//     [-1, null, 6, 5, 6, -1, 1, 3, -1],
//     [-1, 3, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1]
// ]);

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
//     [-1, null, null, null, null, null, null, null, -1],
//     [-1, null, -1, null, 3, 4, 4, 5, -1],
//     [-1, null, -1, 6, 3, -1, 1, 3, -1],
//     [-1, null, -1, 5, 5, -1, 6, 5, -1],
//     [-1, null, -1, 3, 1, -1, 2, 2, -1],
//     [-1, null, -1, 4, 2, -1, 4, 2, -1],
//     [-1, null, 6, 5, 6, -1, 1, 3, -1],
//     [-1, 3, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1]
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
//     [-1, null, null, null, null, null, null, null, -1],
//     [-1, null, -1, null, 3, 4, 4, 5, -1],
//     [-1, null, -1, 6, 3, -1, 1, 3, -1],
//     [-1, null, null, 5, 5, -1, 6, 5, -1],
//     [-1, null, -1, 3, 1, -1, 2, 2, -1],
//     [-1, null, -1, 4, 2, -1, 4, 2, -1],
//     [-1, null, 6, 5, 6, -1, 1, 3, -1],
//     [-1, 3, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1, -1, -1, -1]
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

// [
//     [null, -1, null],
//     [1, 2, null],
//     [3, -1, 5],
//     ]

// *■5
// 12□
// □■□

// -----------------------------------------------------------------------------------

// [
//     [null, -1, null],
//     [1, 2, "wtf"],
//     [3, -1, 5],
//     ]

// *■*
// 1*■
// □■□