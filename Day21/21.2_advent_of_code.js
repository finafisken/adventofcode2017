const { input } = require('./input');
const startPattern = [ ['.', '#', '.'], ['.', '.', '#'], ['#','#','#'] ];

const compress = mtx => mtx.map(row => row.join('')).join('/');
const decompress = str => str.split('/').map(r => r.split(''));

const rules = {};
input.split('\n').forEach(row => {
  rules[row.split(' => ')[0]] = row.split(' => ')[1];
});

const flip = mtx => {
  return mtx[0].map((column, index) => (
    mtx.map(row => row[index])
  ));
}

const rotate = (mtx, rots) => {
  let rmtx = [...mtx];
  let i = 1;
  while (i <= rots) {
    rmtx = flip(rmtx.reverse());
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

const split = (mtx, blockSize) => {
  var blocks = [];
  for(var i=0; i<mtx.length; i += blockSize)
      for(var j=0; j<mtx.length; j += blockSize) {
          var str = '';
          for(var k=0; k<blockSize; k++)
              str += mtx[i+k].slice(j,j+blockSize).join('') + '/';
          blocks.push(str.substr(0,str.length-1));
      }
  return blocks;
}

const merge = arr => {
  var g = [];
  var blockSize = Math.sqrt(arr.length);
  var strlen = arr[0].match(/\//g).length+1;
  for(var i=0; i<arr.length; i+=blockSize)
      for(var j=0; j<strlen; j++) {
          var str = '';
          for(var k=0; k<blockSize; k++)
              str += arr[i+k].split('/')[j];
          g.push(str);
      }
  return g.map(r => r.split(''));
}

let iter = 1;
let pattern = startPattern;
while (iter <= 18) {
  const blockSize = pattern.length % 2 === 0 ? 2 : 3;
  const blockStrs = split(pattern, blockSize);
  for (let i = 0; i < blockStrs.length; i++){
    const block = blockStrs[i];
    const perms = getPerms(decompress(block));
    perms.forEach(perm => {
      if(rules[perm]){
        blockStrs[i] = rules[perm];
      }
    });
  }
  pattern = merge(blockStrs);
  iter++;
}

const result = compress(pattern).match(/#/g).length;
console.log(result);