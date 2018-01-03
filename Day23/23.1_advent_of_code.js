const { input } = require('./input');
const instructions = input.split('\n').map(row =>
  ({
    operation: row.split(' ')[0],
    register: row.split(' ')[1],
    modifier: row.split(' ')[2]
  })
);
const registers = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0
};

const getVal = val => Number.isInteger(parseInt(val)) ? parseInt(val) : parseInt(registers[val]);
const fn = {
  set: (reg, val) => registers[reg] = getVal(val),
  sub: (reg, val) => registers[reg] = registers[reg] - getVal(val),
  mul: (reg, val) => registers[reg] = registers[reg] * getVal(val),
}

let count = 0;
let i = 0;
while (i < instructions.length) {
  const cInst = instructions[i];
  const { operation, register, modifier } = cInst;
  if (operation === 'mul') count++;
  switch (operation) {
    case 'jnz':
      getVal(register) !== 0 ? i += getVal(modifier) : i++;
      break;
    default:
      fn[operation](register, modifier);
      i++;
      break;
  }
}
console.log(count);
