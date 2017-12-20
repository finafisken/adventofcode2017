const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const grid = input.split('\n').map(row => row.split(''));
const findStartCol = grid[0].indexOf('|');

const move = ([r, c]) => ({
  up: [r - 1, c],
  down: [r + 1, c],
  left: [r, c - 1],
  right: [r, c + 1], 
});

const opposite = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

const getDir = ([r, c]) => {
  const possibleDirs = move([r,c]);
  for (pDir in possibleDirs) {
    const posCord = possibleDirs[pDir];
    if(pDir !== opposite[dir] && grid[posCord[0]][posCord[1]] !== ' '){
      return pDir;
    }
  }
}

const letters = [];
let dir = 'down';
let steps = 0;
let done = false;
let r = 0;
let c = findStartCol;
while (!done) {
  steps++;
  const symb = grid[r][c];
  if (symb === '|' || symb === '-' || /[A-Z]/.test(symb)) {
    // this symbol is non ambiguous, use same dir as last time
    if(/[A-Z]/.test(symb)) {
      letters.push(symb);
      console.log(symb);
      // we have reached the end of the maze
      const co = move([r,c])[dir]
      if (grid[co[0]][co[1]] === ' ') done = true;
    }
  } else if (symb === '+') {
    // this symbol is ambiguous, check for new direction
    dir = getDir([r, c]);
  }
  [r, c] = move([r,c])[dir];
}

console.log(letters.join(''));
console.log(steps);