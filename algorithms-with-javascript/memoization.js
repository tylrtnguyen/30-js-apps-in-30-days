/* 
  Time complexity: O(2n)
  Space complexity: O(n)
*/
const uniqSort = function(arr) {
  // Short in ascending order
  const sortedArray = arr.sort((a, b) => a - b)
  return [... new Set(sortedArray)]
}


const times10 = (n) => n*10;

const cache = {};

const memoTimes10 = (n) => {
  if(n in cache){
    console.log('Fetching from cache:', n)
    return cache[n];
  }
  else {
    console.log('Calculating result');
    const result = n*10;
    cache[n] = result;
    return result;
  }
}


// Using closure to make the cache local

const memoizedClosureTimes10 = () => {
  let cache = {};
  return (n) => {
    if(n in cache) {
      return cache[n];
    }
    else {
      let result = times10(n);
      cache[n] = result;
      return result;
    }
  }
}

// const memoClosureTimes10 = memoizedClosureTimes10();
// console.log(`~~~~~~ TASK 3 ~~~~~~~`);
// console.log('Task 3 calculating value', memoClosureTimes10(10));
// console.log('Task 3 fetching value:', memoClosureTimes10(10));


// Make the function generic
const memoize = (cb) => {
  let cache = {};
   return (...args) => {
    if(args[0] in cache) {
      return cache[args[0]];
    }
    else {
      let result = cb(...args);
      cache[args[0]] = result;
      return result;
    }
  }
}

const memoizedTimes10 = memoize(times10);
console.log(`~~~~~~ TASK 4 ~~~~~~~`);
console.log('Task 3 calculating value', memoizedTimes10(9));
console.log('Task 3 fetching value:', memoizedTimes10(9));
