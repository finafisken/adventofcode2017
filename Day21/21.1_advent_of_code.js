// const { input } = require('./input');
const input = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;
const startPattern = [ ['.', '#', '.'], ['.', '.', '#'], ['#','#','#'] ];

const compress = mtx => mtx.map(row => row.join('')).join('/');
const decompress = str => str.split('/').map(r => r.split(''));

const rules = input.split('\n').map(row => ({
  in: row.split(' => ')[0],
  out: row.split(' => ')[1],
}));

const flip = mtx => {
  return mtx[0].map((column, index) => (
    mtx.map(row => row[index])
  ));
}

const rotate = (mtx, rots) => {
  let rmtx = [...mtx];
  let i = 1;
  while (i <= rots) {
    if (i === 2) {
      rmtx = mtx.map(row => row.reverse()).reverse();
    } else if (i === 3) {
      rmtx = flip(mtx).reverse();
    } else {
      rmtx = flip(rmtx.reverse());
    }
    i++;
  }
  return rmtx;
}

const printMtx = mtx => {
  mtx.forEach(row => console.log(row));
  console.log('size', mtx[0].length);
}

const getPerms = mtx => {
  const flipped = flip(mtx);
  return [
    mtx,
    rotate(mtx, 1),
    rotate(mtx, 2),
    rotate(mtx, 3),
    flipped,
    rotate(flipped, 1),
    rotate(flipped, 2),
    rotate(flipped, 3),
  ].map(compress);
}

const injectLb = (str, after) => {
  const regexp = new RegExp(`(.{${after}})`, 'g');
  const rep = str.replace(regexp,'$1/');
  return rep.substring(0, rep.length - 1);
}

let iter = 0;
let pattern = compress(startPattern);
while (iter <= 2) {
  const size = pattern.indexOf('/');
  let nrOfBlocks;
  let blockSize;
  if (size % 2 === 0) {
    blockSize = 2;
    nrOfBlocks = size / 2;
  } else if (size % 3 === 0) {
    blockSize = 3;
    nrOfBlocks = size / 3;
  }
  const raw = pattern.replace(/\//g, '');
  for (let i = 0; i < nrOfBlocks; i++){
    // this part is broken
    const rawBlock = raw.substring(i*blockSize*blockSize, (i+1) * blockSize * blockSize);
    // #..#    #.|.#
    // .... => ..|..
    // ....    --+--
    // #..#    ..|..
    //         #.|.#
    // ---
    const block = injectLb(rawBlock, blockSize);
    const perms = getPerms(decompress(block));
    const ins = rules.map(rule => rule.in);
    const test = perms.map(perm => ins.indexOf(perm));
    const ruleIdx = test.filter(idx => idx !== -1).join('');
    pattern = `${rules[ruleIdx].out.replace(/\//g, '')}/`.repeat(nrOfBlocks);

  }
  iter++;
}

console.log(printMtx(decompress(pattern)));