const { input } = require("./input");
const instructions = input.split("\n").map(row =>
  Object.assign(
    {},
    {
      operation: row.split(" ")[0],
      register: row.split(" ")[1]
    },
    row.split(" ")[2] ? { modifier: row.split(" ")[2] } : {}
  )
);

const getVal = val => Number.isInteger(parseInt(val)) ? parseInt(val) : parseInt(registers[val] || 0);
const registers = {};
const fn = {
  snd: (reg, val) => {
    ++sends;
    ++count;
  },
  set: (reg, val) => registers[reg] = getVal(val),
  add: (reg, val) => registers[reg] = registers.hasOwnProperty(reg) ? registers[reg] + getVal(val) : getVal(val),
  mul: (reg, val) => registers[reg] = registers.hasOwnProperty(reg) ? registers[reg] * getVal(val) : 0,
  mod: (reg, val) => registers[reg] = registers.hasOwnProperty(reg) ? registers[reg] % getVal(val) : 0,
  rcv: (reg, val) => --count,
  jgz: (reg, val, cIdx) => reg > 0 ? ((cIdx + val) < instructions.length && (cIdx + val) >= 0 && (cIdx + val)) : cIdx + 1,
}

let count = 0;
let sends = 0;
const doStep = i => {
  if (i === instructions.length - 1 || count < 0 || i === false) return sends;
  const cInst = instructions[i];
  const { operation, register, modifier } = cInst;
  console.log(i, count, instructions[i].operation, register, registers[register], instructions[i].modifier);
  switch (operation) {
    case 'jgz':
      return doStep(fn[operation](getVal(register), getVal(modifier), i));
    default:
      fn[operation](register, modifier);
      break;
  }
  return doStep(++i);
}

console.log(doStep(0));
// console.log(instructions);

// 254 too low
// 255 too low