const steps = 348;
const list = [0];
let pos = 0;

const loop = pos => pos % list.length;

for (let val = 1; val <= 2017; val++) {
  pos = loop((pos + steps)) + 1
  list.splice(pos, 0, val);
}

console.log(list[list.indexOf(2017)+1]);
