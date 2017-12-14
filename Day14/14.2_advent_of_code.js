const { input } = require('./input');
const { hash } = require('./knothash');

const hexToBin = hex => parseInt(hex, 16).toString(2).padStart(4, '0');

const grid = Array(128)
  .fill(input)
  .map((row, i) => {
    const str = `${row}-${i}`;
    return hash(str)
      .map(hex => `${hexToBin(hex[0])}${hexToBin(hex[1])}`)
      .join('')
      .split('');
  });

let regions = 0;

const checkForRegion = (rowIdx, idx) => {
  if (rowIdx === 127 && idx === 127) {
    return;
  }

  const row = grid[rowIdx];
  const prevRow = rowIdx === 0 ? Array(128).fill('0') : grid[rowIdx-1];
  const val = row[idx];
  const prevVal = idx === 0 ? '0' : row[idx-1];

  if(val === '1') {
    if(prevVal === '1' || prevRow[idx] === '1') {
      // connected
    } else {
      regions++;
    }
  }

  if (idx === 127) {
    return checkForRegion(++rowIdx, 0);
  } else {
    return checkForRegion(rowIdx, ++idx);
  }
}

checkForRegion(0,0);
console.log(regions);
