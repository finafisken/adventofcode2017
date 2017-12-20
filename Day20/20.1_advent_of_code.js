const { input } = require('./input');

const points = input.split('\n').map(row => {
  const data = row.match(/-?\d+/g).map(Number);
  return {
    pos: [data[0], data[1], data[2]],
    vel: [data[3], data[4], data[5]],
    acc: [data[6], data[7], data[8]],
  }
});

const step = ({pos, vel, acc}) => {
  let nVel = vel.map((v, i) => v+acc[i]);
  let nPos = pos.map((p, i) => p+nVel[i]);
  return { pos: nPos, vel: nVel, acc };
};
const manhattanDist = point => {
  const [x, y, z] = point.pos;
  return Math.abs(x)+Math.abs(y)+Math.abs(z);
};
const closestToZero = points => {
  const mhdp = points.map(point => manhattanDist(point));
  return mhdp.findIndex(dist => dist === Math.min(...mhdp));
};

const iters = 1000;
let i = 0;

let result = [...points];
while (i < iters) {
  // console.log(result[0]);
  console.log('idx closest to zero: ', closestToZero(result));
  result = result.map(point => step(point));
  i++;
}

// console.log(events);