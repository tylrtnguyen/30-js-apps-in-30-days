function joinElements(array, joinString){
	let result = '';
	for(let i=0; i < array.length; i++) {
		result += array[i];
		if(i < array.length - 1){
			result += joinString;
		}
	}
	return result;
}

console.log(joinElements(['s', 'cr','t cod', ' :) :)'], 'e'))
