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

const validate = (x, y) => x < grid.length && y < grid.length && x >= 0 && y >= 0 ? grid[x][y] : '0';

const floodFill = (x, y) => {
  // https://en.wikipedia.org/wiki/Flood_fill
  if (validate(x,y) === '0') return;
  grid[x][y] = '0';
  floodFill(x-1, y);
  floodFill(x+1, y);
  floodFill(x, y-1);
  floodFill(x, y+1);
}

for (let x=0; x < grid.length; x++){
  for (let y=0; y < grid.length; y++){
    if (grid[x][y] === '1') {
      regions++;
      floodFill(x,y);
    }
  }
}

console.log(regions);
