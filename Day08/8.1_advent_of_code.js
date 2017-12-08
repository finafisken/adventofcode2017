const { input } = require('./input');
const inputArr = input.split('\n');

const unique = arr => arr.filter((v, i, self) => self.indexOf(v) === i);

const getName = inst => inst.split(' ')[0];
const getAction = inst => ({ type: inst.split(' ')[1], amount: inst.split(' ')[2] });
const getCondition = inst => ({ register: inst.split(' ')[4], compare: inst.split(' ')[5], val: inst.split(' ')[6] });

const registerNames = unique(inputArr.map(x => getName(x)));
const registers = registerNames.map(name => ({ name, val: 0 }));

const instructions = inputArr.map((inst, idx, self) => {
  return {
    register: getName(inst),
    action: getAction(inst),
    condition: getCondition(inst),
  }
});

const evalCondition = (reg, operator, val) => {
  const idx = registers.findIndex(r => r.name === reg)
  const cond = `${registers[idx].val} ${operator} ${val}`;
  return eval(cond); 
}

instructions.forEach(inst => {
  const { register, compare, val } = inst.condition;
  const cond = evalCondition(register, compare, val);
  if (cond) {
    const sign = inst.action.type === 'inc' ? '+' : '-';
    const idx = registers.findIndex(r => r.name === inst.register);
    registers[idx].val = evalCondition(inst.register, sign, inst.action.amount);
  }
})

console.log(Math.max(...registers.map(x => x.val)));