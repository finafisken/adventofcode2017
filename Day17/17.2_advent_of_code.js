const steps = 348;

// seems like 0 will always be first
// so we can avoid creating the whole list
// we are only interested in the value after 0

let pos = 0;
let len = 1;
let target;

const loop = pos => pos % len;

for (let val = 1; val <= 50000000; val++) {
  pos = loop((pos + steps)) + 1;
  if(pos === 1) target = val;
  len++;
}

console.log(target);
