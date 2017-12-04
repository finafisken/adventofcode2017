const { input } = require('./input');
const phrases = input.split('\n');

const containsDuplicate = array => {
  return array.some((item, i) => {
    const toCheck = [...array];
    toCheck.splice(i);
    return toCheck.includes(item);
  });
};

const validPhrases = phrases.filter((phrase, idx) => {
  const words = phrase.split(' ');
  return !containsDuplicate(words);
});


console.log(JSON.stringify(validPhrases, null, 2));
console.log(validPhrases.length);

