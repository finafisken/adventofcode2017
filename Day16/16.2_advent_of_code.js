const { input } = require('./input');
let programs = 'abcdefghijklmnop'.split('');

const moves = input.split(',').map(move => ({
  type: move.substring(0, 1),
  targets: move.substring(1).split('/'),
}));

const spin = x => programs = programs.splice(-x).concat(programs);
const exchange = (a,b) => {
  const valA = programs[a];
  const valB = programs[b]; 
  programs[a] = valB;
  programs[b] = valA;
};
const partner = (a,b) => exchange(programs.indexOf(a), programs.indexOf(b));

// identify when it repeats
const patterns = [];
do {
  patterns.push([...programs]);
  moves.forEach(({ type, targets }) => {
    switch (type) {
      case 's':
        spin(parseInt(targets[0]));
        break;
      case 'x':
        exchange(parseInt(targets[0]), parseInt(targets[1]));
        break;
      case 'p':
        partner(targets[0], targets[1]);
        break;
      default: 
        console.log('woops');
        break;
    }
  });
} while (programs.join('') !== 'abcdefghijklmnop');

// use repetition to avoid 1000000000 loops
const result = patterns[1000000000 % (patterns.length)];

console.log(result.join(''));