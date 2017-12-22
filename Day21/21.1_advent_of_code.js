const { input } = require('./input');
// const testMtx = [ ['.', '#', '.'], ['.', '.', '#'], ['#','#','#'] ];
const testMtx = [ ['1', '2', '3'], ['4', '5', '6'], ['7','8','9'] ];

const rules = input.split('\n').map(row => ({
  in: row.split(' => ')[0].split('/').map(r => r.split('')),
  out: row.split(' => ')[1].split('/'),
}));

const flip = matrix => {
  return matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ));
}

const rotate = (matrix, rots) => {
  let mtx = matrix;
  let i = 1;
  while (i <= rots) {
    rmtx = mtx.reverse();
    mtx = flip(rmtx);
    i++;
  }
  return mtx;
}

const printMtx = mtx =>  {
  mtx.forEach(row => console.log(row));
  console.log('size', mtx[0].length);
}

const flipped = flip(testMtx);
console.log('o')
printMtx(testMtx);
printMtx(rotate(testMtx, 1));
printMtx(rotate(testMtx, 2));
printMtx(rotate(testMtx, 3));
console.log('f')
printMtx(flipped);
printMtx(rotate(flipped, 1));
printMtx(rotate(flipped, 2));
printMtx(rotate(flipped, 3));
// printMtx(flip(testMtx));