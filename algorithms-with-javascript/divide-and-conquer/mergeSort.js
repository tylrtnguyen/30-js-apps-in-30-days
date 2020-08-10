const data = require('./data');

const { random, ascending, descending } = data;

function mergeSort(arr) {
    if(arr.length === 1) {
        return arr;
    }
    const middle = Math.floor(arr.length/2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    return merge(sortedLeft, sortedRight);
}

function merge(Lsorted, Rsorted) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while(indexLeft < Lsorted.length && indexRight < Rsorted.length) {
        if(Lsorted[indexLeft] < Rsorted[indexRight]) {
            result.push(Lsorted[indexLeft]);
            indexLeft++;
        }
        else {
            result.push(Rsorted[indexRight]);
            indexRight++;
        }
    }
    return result.concat(Lsorted.slice(indexLeft)).concat(Rsorted.slice(indexRight));
}

console.log(mergeSort(random))
console.log(mergeSort(ascending))
console.log(mergeSort(descending))


