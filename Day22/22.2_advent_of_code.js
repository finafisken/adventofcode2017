const { input } = require('./input');

const startGrid = input.split('\n').map(row => row.split(''));

const turnDir = left => ({
  n: left ? 'w' : 'e',
  s: left ? 'e' : 'w',
  e: left ? 'n' : 's',
  w: left ? 's' : 'n'
});

const rev = {
  n: 's',
  s: 'n',
  e: 'w',
  w: 'e'
};

const newPos = ({ x, y }) => ({
  n: { x, y: y - 1 },
  s: { x, y: y + 1 },
  e: { x: x + 1, y },
  w: { x: x - 1, y }
});

const extendGrid = grid => {
  const newGrid = grid.map(row => ['.', ...row, '.']);
  return [
    new Array(newGrid[0].length).fill('.'),
    ...newGrid,
    new Array(newGrid[0].length).fill('.')
  ];
};

const doStep = (grid, pos, dir) => {
  let nGrid = [...grid];
  let nDir = dir;
  let symb;
  switch (grid[pos.y][pos.x]) {
    case '.':
      symb = 'W';
      nDir = turnDir(true)[dir];
      break;
    case '#':
      symb = 'F';
      nDir = turnDir(false)[dir];
      break;
    case 'W':
      nodesInfected++;
      symb = '#';
      break;
    case 'F':
      symb = '.';
      nDir = rev[dir];
      break;
    default:
      console.log('woops');
  }
  grid[pos.y][pos.x] = symb;
  let nPos = newPos(pos)[nDir];
  if (nPos.x < 0 || nPos.y < 0) {
    nGrid = extendGrid(grid);
    // update positions to account for grid extension
    const nx = nPos.x < 0 ? 0 : pos.x + 1;
    const ny = nPos.y < 0 ? 0 : pos.y + 1;
    nPos = { x: nx, y: ny };
  } else if (nPos.x >= grid.length || nPos.y >= grid.length) {
    const nx = nPos.x >= grid.length ? grid.length + 1 : pos.x + 1;
    const ny = nPos.y >= grid.length ? grid.length + 1 : pos.y + 1;
    nPos = { x: nx, y: ny };
    nGrid = extendGrid(grid);
  }
  return { nGrid, nPos, nDir };
};

let i = 0;
let grid = [...startGrid];
let dir = 'n';
let pos = {
  x: Math.floor(grid.length / 2),
  y: Math.floor(grid.length / 2)
};
let nodesInfected = 0;

while (i < 10000000) {
  const { nGrid, nPos, nDir } = doStep(grid, pos, dir);
  grid = nGrid;
  dir = nDir;
  pos = nPos;
  i++;
}

console.log(nodesInfected);
