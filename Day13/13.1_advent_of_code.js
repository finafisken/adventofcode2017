const { input } = require('./input');

const firewall = input.split('\n').map(row => ({ 
  idx: parseInt(row.split(': ')[0]),
  range: parseInt(row.split(': ')[1])
}));

const isScannerAtZero = (pos, range) => pos % ((range-1) * 2) === 0

let severity = 0;

firewall.forEach(({ idx, range }) => {
  if(isScannerAtZero(idx, range)) {
    severity += idx * range;
  }
});

console.log(severity);