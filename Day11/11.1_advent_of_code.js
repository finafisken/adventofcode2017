const { input } = require('./input');
const moves = input.split(',');

const moveSet = (x, y) => ({
  // odd-q vertical layout
  // https://www.redblobgames.com/grids/hexagons/
  n: { x, y: y-1 },
  s: { x, y: y+1 },
  ne: { x: x+1, y},
  nw: { x: x-1, y},
  se: { x: x+1, y: y+1 },
  sw: { x: x-1, y: y+1 },
});

const move = (dir, x, y) => moveSet(x,y)[dir];

let position = { x: 0, y: 0 };
moves.forEach(direction => {
  const { x, y } = position;
  position = move(direction, x, y);
});

const calcDistance = ({x, y}) => {
  let curX = Math.abs(x);
  let curY = Math.abs(y);
  let steps = 0;
  while (curX !== 0 || curY !== 0) {
    curX--;
    curY--;
    steps++;
  }
  return steps + Math.max(curX, curY);
  // return Math.sqrt(Math.pow(, 2) + Math.pow(Math.abs(y), 2));
};
console.log(position);
console.log(calcDistance(position));
// console.log(JSON.stringify(moves, null, 2));