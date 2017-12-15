const stepA = val => {
  const num = (val * 16807) % 2147483647;
  return num % 4 ? stepA(num) : num;
}
const stepB = val => {
  const num = (val * 48271) % 2147483647;
  return num % 8 ? stepB(num) : num;
}

const d2b = val => val.toString(2).padStart(16, '0');
const match = (a, b) => d2b(a).substr(-16) === d2b(b).substr(-16);

let pairs = 0;
let i = 0;
let valA = 722;
let valB = 354;

// zzzz
while (i <= 5000000){
  valA = stepA(valA);
  valB = stepB(valB);
  if (match(valA, valB)) pairs++;
  i++;
}

console.log(pairs);
