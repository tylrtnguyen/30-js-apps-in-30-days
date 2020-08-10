function joinElements(letterArray, joinString) {
	function recurse(index, resultSoFar) {
		resultSoFar += letterArray[index];
		if(index === letterArray.length - 1){
			return resultSoFar;
		}
		else {
			return recurse(index + 1, resultSoFar + joinString);
		}
	}
	return recurse(0, '');
}

console.log(joinElements(['s', 'cr', 't cod', ' :) :)'], 'e'));
