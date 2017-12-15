const stepA = val => (val * 16807) % 2147483647;
const stepB = val => (val * 48271) % 2147483647;

const d2b = val => val.toString(2).padStart(16, '0');

let pairs = 0;
let i = 0;
let valA = 722;
let valB = 354;

const nextStep = (a, b) => {
  valA = stepA(a);
  valB = stepB(b);
  if(d2b(valA).substr(-16) === d2b(valB).substr(-16)) pairs++;
}

// zzzz
while (i <= 40000000){
  nextStep(valA, valB);
  i++;
}

console.log(pairs);

