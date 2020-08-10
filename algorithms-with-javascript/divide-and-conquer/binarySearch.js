function binarySearch(list, item) {
	let min = 0;
	let max = list.length - 1;
	let middle;
	
	while(min <= max) {
		middle = Math.floor((min + max)/2);
		if(list[middle] === item) {
			return middle;
		}
		else {
			if(list[middle] < item) {
				min = middle + 1;
			}
			else {
				max = middle - 1;
			}
		}
	}
	return -1;
}

console.log(binarySearch([2,6,7,18,90,103], 90));
