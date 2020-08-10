const data = require('./data');

const { random, ascending, descending } = data;

function swap(arr, i ,j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function bubbleSort(arr) {
    let counterOuter = 0;
    let counterInner = 0;
    let counterSwap = 0;
    let swapped;
    do {
        counterOuter++;
        swapped = false;
        for(let i = 0; i < arr.length; i++) {
            counterInner++;
            if(arr[i] && arr[i+1] && arr[i] > arr[i+1]) {
                counterSwap++;
                swap(arr, i, i + 1);
                swapped = true;
            }
        }
    } while(swapped)
    console.log('Outer:', counterOuter, 'Inner:', counterInner, 'Swap:',counterSwap);
    return arr;
}

console.log(bubbleSort(random))
console.log(bubbleSort(ascending))
console.log(bubbleSort(descending))
  