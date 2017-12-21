const { input } = require('./input');

const points = input.split('\n').map((row, index) => {
  const data = row.match(/-?\d+/g).map(Number);
  return {
    index,
    pos: [data[0], data[1], data[2]],
    vel: [data[3], data[4], data[5]],
    acc: [data[6], data[7], data[8]],
    deleted: false,
  }
});

const step = ({ index, pos, vel, acc, deleted}) => {
  let nVel = vel.map((v, i) => v+acc[i]);
  let nPos = pos.map((p, i) => p+nVel[i]);
  return { index, pos: nPos, vel: nVel, acc, deleted };
};

const detectCollisions = active => {
  const positions = active.map(p => p.pos.toString());
  positions.forEach((pos, i) => {
    const first = positions.indexOf(pos);
    const last = positions.lastIndexOf(pos);
    if(first !== last){
      // collision!
      result[active[first].index].deleted = true;
      result[active[last].index].deleted = true;
    }
  });
}

const iters = 1000;
let iter = 0;

let result = [...points];
while (iter < iters) {
  const active = result.filter(p => p.deleted === false);
  detectCollisions(active);
  result = result.map(point => point.deleted ? point : step(point));
  console.log(active.length);
  iter++;
}
// 757 too high