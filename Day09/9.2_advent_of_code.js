const { input } = require('./input');
let stream = input.replace(/!./g, ''); // remove ignore

const garbage = stream.match(/<[^>]+>/g);
const garbageCharCount = garbage.map(g => g.length - 2).reduce((a,b) => a+b);

console.log(garbageCharCount);