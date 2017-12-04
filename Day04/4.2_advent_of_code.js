const { input } = require('./input');
const phrases = input.split('\n');

const isAnagram = (word1, word2) => {
  const base = word1.split('');
  const toCheck = word2.split('');
  if(base.length === toCheck.length) {
    return base.every(letter => {
      // for each letter in base there is an equal amount
      // of the same latter in toCheck
      const amountInBase = base.filter(l => l === letter).length;
      const amountInToCheck = toCheck.filter(l => l === letter).length;
      return amountInBase === amountInToCheck;
    })
  }
  return false;
};

const arrayHasAnagram = array => {
  const toCheck = [...array];
  while(toCheck.length > 0) {
    const target = toCheck.pop();
    if(toCheck.some(word => isAnagram(target, word))){
      return true;
    }
  }
  return false;
};

const validPhrases = phrases.filter(phrase => {
  const words = phrase.split(' ');
  return !arrayHasAnagram(words);
});

console.log(JSON.stringify(validPhrases, null, 2));
console.log(validPhrases.length);

