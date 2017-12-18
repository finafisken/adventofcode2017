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

const getVal = val => Number.isInteger(parseInt(val)) ? parseInt(val) : parseInt(registers[val]);
const registers = {};
const sounds = [];
const fn = {
  snd: (reg) => sounds.push({ register: reg, sound: registers[reg]}),
  set: (reg, val) => registers[reg] = getVal(val),
  add: (reg, val) => registers[reg] = registers.hasOwnProperty(reg) ? registers[reg] + getVal(val) : getVal(val),
  mul: (reg, val) => registers[reg] = registers.hasOwnProperty(reg) ? registers[reg] * getVal(val) : 0,
  mod: (reg, val) => registers[reg] = registers.hasOwnProperty(reg) ? registers[reg] % getVal(val) : 0,
  rcv: (reg, val) => val > 0 && sounds.length > 0 && sounds[sounds.length - 1],
  jgz: (reg, val, cIdx) => (cIdx + val) < instructions.length && (cIdx + val) >= 0 && (cIdx + val),
}

doStep = i => {
  if (i === instructions.length - 1) return;
  const cInst = instructions[i];
  const { operation, register, modifier } = cInst;
  if (operation === 'rcv' && registers[register] > 0) return sounds[sounds.length-1];
  switch (operation) {
    case 'snd':
      fn[operation](register);
      break;
    case 'jgz':
      return registers[register] ? doStep(fn[operation](register, getVal(modifier), i)) : doStep(++i);
    default:
      fn[operation](register, modifier);
      break;
  }
  return doStep(++i);
}

console.log(doStep(0));
