const { input } = require('./input');
const { hash } = require('./knothash');

const hexToBin = hex => parseInt(hex, 16).toString(2).padStart(4, '0');

const grid = Array(128)
  .fill(input)
  .map((row, i) => {
    const str = `${row}-${i}`;
    return hash(str).map(hexToBin).join('').split('');
  });

const sum = grid.reduce((p, c) => p + c.filter(x => x === '1').length, 0);

console.log(sum);