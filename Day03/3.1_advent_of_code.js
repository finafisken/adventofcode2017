// 347991

const findRing = (val) => {
  let prevRingMax = 1;
  let ringMax = 9;
  let ring = 0;
  let ringBase = 1;
  while (val > ringMax) {
    ring++;
    ringBase += 2;
    prevRingMax = ringMax;
    ringMax = Math.pow(ringBase, 2);
  }
  
  return { ring, ringBase, ringMin: prevRingMax + 1, ringMax };
}

const getPosInRing = (target, ringData) => {
  const ringStartCoord = { x: ringData.ring - 1 , y: 2 - ringData.ring }
  const maxCoord = ((ringData.ringBase - 1)/2);
  // moveBase is the coords the x or y can take depending on side
  // fill moveBase with coords, ex ring base 5 => [-2, -1, 0, 1, 2];
  const moveBase = Array.apply(null, Array(ringData.ringBase)).map((v, i) => i - maxCoord);
  const possibleCoords = {
    right: { x: maxCoord, y: moveBase.slice(1) },
    top: { x: [...moveBase].reverse().slice(1), y: maxCoord },
    left: { x: -maxCoord, y: [...moveBase].reverse().slice(1) },
    bottom: { x: moveBase.slice(1), y: -maxCoord }
  };
  const sideInfo = findSide(target, ringData.ringMax, ringData.ringBase);
  const sideCoords = possibleCoords[sideInfo.side];
  let val, i;
  // Iterate over possible cords until we reach our target, 
  // the order of the arrays in possibleCoords makes sure we 
  // iterate in the correct direction
  for (val = sideInfo.sideMin, i = 0; val <= target; val++, i++) {
    if (val === target) {
      return sideCoords.x instanceof Array ? { x: sideCoords.x[i-1], y: sideCoords.y } : { x: sideCoords.x, y: sideCoords.y[i-1] };
    }
  }
}

const findSide = (val, ringMax, ringBase) => {
  let sideMin = ringMax;
  let sideMax;
  for(let n = 1; n <= 4; n++) {
    const sides = ['bottom', 'left', 'top', 'right'];
    sideMax = sideMin;
    sideMin = ringMax - (ringBase - 1) * n;
    if(val >= sideMin && val < sideMax) {
      return { side: sides[n-1], sideMax, sideMin };
    }
  };
}

const val = 347991;
const ringData = findRing(val);
const coord = getPosInRing(val, ringData);
const shortestPath = Math.abs(coord.x) + Math.abs(coord.y);
console.log(coord);
console.log(shortestPath);
// x: -185, y: 295
// => 480