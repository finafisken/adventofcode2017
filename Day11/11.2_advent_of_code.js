const { input } = require('./input');
const moves = input.split(',');

const moveSet = (x, y, z) => ({
  // cube coordinates
  // https://www.redblobgames.com/grids/hexagons/
  n: { x, y: y+1, z: z-1 },
  s: { x, y: y-1, z: z+1 },
  ne: { x: x+1, y, z: z-1},
  nw: { x: x-1, y: y+1, z},
  se: { x: x+1, y: y-1, z },
  sw: { x: x-1, y, z: z+1 },
});

const move = (x, y, z, dir) => moveSet(x, y, z)[dir];
const calcDistance = ({x, y, z}) => (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;

let position = { x: 0, y: 0, z:0 };
let maxDistance = 0;

moves.forEach(direction => {
  const { x, y, z } = position;
  position = move(x, y, z, direction);
  maxDistance = Math.max(maxDistance, calcDistance(position));
});

console.log(maxDistance);
