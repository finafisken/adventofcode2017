const { input } = require('./input');
let stream = input.replace(/!./g, '') // remove ignore
  .replace(/<[^>]+>|<>/g, '') // remove garbage
  .replace(/,/g, ''); // remove commas

const readNext = (stream, level, score) => {
  const char = stream[0];
  if (level === 0 && score > 0) {
    return score;
  };
  if(char === '{') {
    level++;
    score += level;
  } else {
    level--;
  }
  return readNext(stream.substring(1), level, score);
}

const score = readNext(stream, 0, 0);

console.log(score);