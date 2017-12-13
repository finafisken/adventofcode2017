const { input } = require('./input');

const firewall = input.split('\n').map(row => ({ 
  idx: parseInt(row.split(': ')[0]),
  range: parseInt(row.split(': ')[1])
}));

const isScannerAtZero = (pos, range) => pos % ((range-1) * 2) === 0

let delay = 0;
let caught = true;
const gotCaught = delay => firewall.some(({idx, range}) => isScannerAtZero((idx + delay), range));

while (caught) {
  delay++;
  caught = gotCaught(delay);
}

console.log(delay);